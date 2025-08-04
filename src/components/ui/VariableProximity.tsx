import { forwardRef, useMemo, useRef, useEffect, MutableRefObject, RefObject, HTMLAttributes } from "react";
import { motion } from "framer-motion";
// import "./VariableProximity.css";
import '../../styles/VariableProximity.css';

type Callback = () => void;

function useAnimationFrame(callback: Callback) {
    useEffect(() => {
        let frameId: number;
        const loop = () => {
            callback();
            frameId = requestAnimationFrame(loop);
        };
        frameId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(frameId);
    }, [callback]);
}

function useMousePositionRef(containerRef: RefObject<HTMLDivElement | null>) {

    const positionRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const updatePosition = (x: number, y: number) => {
            if (containerRef?.current) {
                const rect = containerRef.current.getBoundingClientRect();
                positionRef.current = { x: x - rect.left, y: y - rect.top };
            } else {
                positionRef.current = { x, y };
            }
        };

        const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);
        const handleTouchMove = (ev: TouchEvent) => {
            const touch = ev.touches[0];
            updatePosition(touch.clientX, touch.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [containerRef]);

    return positionRef;
}

interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
    label: string | React.ReactNode;
    fromFontVariationSettings: string;
    toFontVariationSettings: string;
    containerRef: RefObject<HTMLDivElement | null>;
    radius?: number;
    falloff?: "linear" | "exponential" | "gaussian";
    className?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
}



const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
    const {
        label,
        fromFontVariationSettings,
        toFontVariationSettings,
        containerRef,
        radius = 50,
        falloff = "linear",
        className = "",
        onClick,
        style,
        ...restProps
    } = props;

    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const interpolatedSettingsRef = useRef<string[]>([]);
    const mousePositionRef = useMousePositionRef(containerRef);
    const lastPositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

    const parsedSettings = useMemo(() => {
        // Add safety checks for the font variation settings
        if (!fromFontVariationSettings || !toFontVariationSettings) {
            return [];
        }

        const parseSettings = (settingsStr: string) => {
            try {
                return new Map(
                    settingsStr.split(",")
                        .map(s => s.trim())
                        .filter(s => s.includes(" ")) // Only process valid entries
                        .map(s => {
                            const [name, value] = s.split(" ");
                            return [name.replace(/['"]/g, ""), parseFloat(value)];
                        })
                        .filter((tuple): tuple is [string, number] =>
                            typeof tuple[0] === "string" &&
                            tuple[0].length > 0 &&
                            typeof tuple[1] === "number" &&
                            !isNaN(tuple[1])
                        ) // Filter out invalid entries
                        .filter(tuple => tuple.length === 2) as [string, number][] // Ensure tuples have exactly two elements
                );
            } catch (error) {
                console.warn("Error parsing font variation settings:", error);
                return new Map();
            }
        };

        const fromSettings = parseSettings(fromFontVariationSettings);
        const toSettings = parseSettings(toFontVariationSettings);

        return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
            axis,
            fromValue,
            toValue: toSettings.get(axis) ?? fromValue,
        }));
    }, [fromFontVariationSettings, toFontVariationSettings]);

    const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
        Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    const calculateFalloff = (distance: number) => {
        const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
        switch (falloff) {
            case "exponential": return norm ** 2;
            case "gaussian": return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
            case "linear":
            default: return norm;
        }
    };

    useAnimationFrame(() => {
        if (!containerRef?.current) return;
        const { x, y } = mousePositionRef.current;
        if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
            return;
        }
        lastPositionRef.current = { x, y };
        const containerRect = containerRef.current.getBoundingClientRect();

        letterRefs.current.forEach((letterRef, index) => {
            if (!letterRef) return;

            const rect = letterRef.getBoundingClientRect();
            const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
            const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

            const distance = calculateDistance(
                mousePositionRef.current.x,
                mousePositionRef.current.y,
                letterCenterX,
                letterCenterY
            );

            if (distance >= radius) {
                letterRef.style.fontVariationSettings = fromFontVariationSettings;
                return;
            }

            const falloffValue = calculateFalloff(distance);
            const newSettings = parsedSettings
                .map(({ axis, fromValue, toValue }) => {
                    const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
                    return `'${axis}' ${interpolatedValue}`;
                })
                .join(", ");

            interpolatedSettingsRef.current[index] = newSettings;
            letterRef.style.fontVariationSettings = newSettings;
        });
    });

    if (!label) return null;

    if (typeof label !== "string") {
        // If JSX is passed instead of plain text
        return (
            <span
                ref={ref}
                className={`${className} variable-proximity`}
                onClick={onClick}
                style={{ display: "inline", ...style }}
                {...restProps}
            >
                {label}
            </span>
        );
    }
    const words = label.split(" ");

    let letterIndex = 0;

    return (
        <span
            ref={ref}
            className={`${className} variable-proximity`}
            onClick={onClick}
            style={{ display: "inline", ...style }}
            {...restProps}
        >
            {words.map((word, wordIndex) => (
                <span
                    key={wordIndex}
                    style={{ display: "inline-block", whiteSpace: "nowrap" }}
                >
                    {word.split("").map((letter) => {
                        const currentLetterIndex = letterIndex++;
                        return (
                            <motion.span
                                key={currentLetterIndex}
                                ref={(el) => { letterRefs.current[currentLetterIndex] = el; }}
                                style={{
                                    display: "inline-block",
                                    fontVariationSettings:
                                        interpolatedSettingsRef.current[currentLetterIndex] || fromFontVariationSettings,
                                }}
                                aria-hidden="true"
                            >
                                {letter}
                            </motion.span>
                        );
                    })}
                    {wordIndex < words.length - 1 && (
                        <span style={{ display: "inline-block" }}>&nbsp;</span>
                    )}
                </span>
            ))}
            <span className="sr-only">{label}</span>
        </span>
    );
});

VariableProximity.displayName = "VariableProximity";
export default VariableProximity;