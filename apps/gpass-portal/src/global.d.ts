/// <reference types="next" />

// CSS Module declarations
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Side-effect CSS imports
declare module '*.css?*' {
  const content: any;
  export default content;
}
