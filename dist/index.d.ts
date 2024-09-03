interface PackOptions {
    blockSize?: number;
    pageSize?: number;
    spiffSize?: number;
}
declare class Mkspiffs {
    private mkspiffPath;
    constructor();
    /**
     * Determines the path to the appropriate mkspiffs binary based on the platform.
     * @returns {string} The full path to the mkspiffs executable.
     */
    private getMkspiffPath;
    /**
     * Executes a command using mkspiffs.
     * @param {string[]} args - The arguments to pass to the command.
     * @param {(error: Error | null, stdout: string | null) => void} callback - Callback function to handle the command output.
     */
    private execute;
    /**
     * Packs a directory into a spiff file with custom options.
     * @param {string} sourceDir - The directory to pack.
     * @param {string} outputFile - The output .spiff file.
     * @param {PackOptions} [options={}] - Custom options for block size, page size, and spiff size.
     * @param {(error: Error | null, stdout: string | null) => void} callback - Callback function to handle the command output.
     */
    pack(sourceDir: string, outputFile: string, options: PackOptions | undefined, callback: (error: Error | null, stdout: string | null) => void): void;
    /**
     * Unpacks a spiffs file into a specified directory.
     * @param {string} spiffFile - The .spiff file to unpack.
     * @param {string} outputDir - The directory where files will be unpacked.
     * @param {(error: Error | null, stdout: string | null) => void} callback - Callback function to handle the command output.
     */
    unpack(spiffFile: string, outputDir: string, callback: (error: Error | null, stdout: string | null) => void): void;
}
export default Mkspiffs;
