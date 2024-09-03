declare module 'mkspiffs-wrapper' {
    interface MkspiffsOptions {
        // Define the options that mkspiffs-wrapper expects
        sourceDir: string;
        blockSize: number;
        pageSize: number;
        size: number;
        output: string;
    }

    export function createSpiffs(options: MkspiffsOptions): Promise<void>;
    // Add other exported functions or classes if necessary
}
