/** Global definitions for development **/

/**
 * Extension for the String interface
 */
declare interface String {
    truncate(n: number): string;
    isNullOrWhitespace(): boolean;
}

// for style loader
declare module "*.css" {
    const styles: any;
    export = styles;
}

declare module "*.svg" {
    const content: any;
    export default content;
}

declare module "*.png" {
    const content: any;
    export default content;
}

declare module "*.json" {
    const content: any;
    export default content;
}

// Omit type https://github.com/Microsoft/TypeScript/issues/12215
type Diff<T extends string, U extends string> = ({ [P in T]: P } &
    { [P in U]: never } & { [x: string]: never })[T];
type Omit<T, K extends keyof T> = { [P in Diff<keyof T, K>]: T[P] };

type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>;
