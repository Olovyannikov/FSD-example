/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import 'react';

declare module 'react' {
    interface CSSProperties {
        [varName: `--${string}`]: string | number | undefined;
    }
}
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}
