import { useEffect, useState } from "react";

export function useTypewriter(lines: string[], typingSpeed = 50, lineDelay = 700) {
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    let output: string[] = [];
    let cancelled = false;

    function typeLine() {
      if (cancelled) return;
      if (currentLine >= lines.length) {
        setDone(true);
        return;
      }

      if (!output[currentLine]) output[currentLine] = "";

      const line = lines[currentLine];
      if (currentChar < line.length) {
        output[currentLine] += line[currentChar];
        setDisplayedText([...output]);
        currentChar++;
        setTimeout(typeLine, typingSpeed);
      } else {
        currentLine++;
        currentChar = 0;
        setTimeout(typeLine, lineDelay);
      }
    }

    typeLine();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line
  }, []);

  return { displayedText, done };
}
