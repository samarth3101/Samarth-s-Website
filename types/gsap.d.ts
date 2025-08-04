declare module 'gsap' {
  interface TweenTarget {
    [key: string]: any;
  }
}

declare module 'gsap/ScrollTrigger' {
  const ScrollTrigger: any;
  export { ScrollTrigger };
}
