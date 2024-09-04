import { exec } from 'child_process';
import * as path from 'path';
import * as os from 'os';

interface PackOptions {
    blockSize?: number;
    pageSize?: number;
    spiffSize?: number;
}

class Mkspiffs {
    private mkspiffPath: string;

    constructor() {
        this.mkspiffPath = this.getMkspiffPath();
    }

    /**
     * Determines the path to the appropriate mkspiffs binary based on the platform.
     * @returns {string} The full path to the mkspiffs executable.
     */
    private getMkspiffPath(): string {
        const platform = os.platform();
        const arch = os.arch();

        let binaryPath = path.join(__dirname, '..', 'bin', 'generic', 'mkspiffs');

        if (platform === 'win32') {
            binaryPath = path.join(__dirname, '..', 'bin', 'win32', 'mkspiffs.exe');
        } else if (platform === 'darwin') {
            binaryPath = path.join(__dirname, '..', 'bin', 'osx', 'mkspiffs');
        } else if (platform === 'linux') {
            if (arch === 'x64') {
                binaryPath = path.join(__dirname, '..', 'bin', 'linux64', 'mkspiffs');
            } else if (arch === 'ia32') {
                binaryPath = path.join(__dirname, '..', 'bin', 'linux32', 'mkspiffs');
            } else if (arch === 'arm') {
                binaryPath = path.join(__dirname, '..', 'bin', 'linux-armhf', 'mkspiffs');
            }
        }

        if (!binaryPath) {
            throw new Error(`Unsupported platform or architecture: ${platform} ${arch}`);
        }

        return binaryPath;
    }

    /**
     * Executes a command using mkspiffs.
     * @param {string[]} args - The arguments to pass to the command.
     * @param {(error: Error | null, stdout: string | null) => void} callback - Callback function to handle the command output.
     */
    private execute(args: string[], callback: (error: Error | null, stdout: string | null) => void): void {
        const fullCommand = `"${this.mkspiffPath}" ${args.join(' ')}`;
        exec(fullCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing ${fullCommand}:`, error);
                callback(error, null);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                callback(new Error(stderr), null);
                return;
            }
            callback(null, stdout);
        });
    }

    /**
     * Packs a directory into a spiff file with custom options.
     * @param {string} sourceDir - The directory to pack.
     * @param {string} outputFile - The output .spiff file.
     * @param {PackOptions} [options={}] - Custom options for block size, page size, and spiff size.
     * @param {(error: Error | null, stdout: string | null) => void} callback - Callback function to handle the command output.
     */
    pack(sourceDir: string, outputFile: string, options: PackOptions = {}, callback: (error: Error | null, stdout: string | null) => void): void {
        const args: string[] = ['-c', sourceDir];

        if (options.blockSize) args.push('-b', options.blockSize.toString());
        if (options.pageSize) args.push('-p', options.pageSize.toString());
        if (options.spiffSize) args.push('-s', options.spiffSize.toString());

        args.push(outputFile);

        this.execute(args, callback);
    }

    /**
     * Unpacks a spiffs file into a specified directory.
     * @param {string} spiffFile - The .spiff file to unpack.
     * @param {string} outputDir - The directory where files will be unpacked.
     * @param {(error: Error | null, stdout: string | null) => void} callback - Callback function to handle the command output.
     */
    unpack(spiffFile: string, outputDir: string, callback: (error: Error | null, stdout: string | null) => void): void {
        const args: string[] = ['-u', spiffFile, '-d', outputDir];

        this.execute(args, callback);
    }
}

export default Mkspiffs;
