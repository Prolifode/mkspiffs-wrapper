// types/index.d.ts

declare module 'mkspiffs-wrapper' {
    export function createSpiffs(
        config: {
            input: string;
            output: string;
            blockSize?: number;
            pageSize?: number;
            size?: number;
        }
    ): Promise<void>;
}
