const { exec } = require('child_process');
const path = require('path');
const os = require('os');

class Mkspiffs {
    constructor() {
        this.mkspiffPath = this.getMkspiffPath();
    }

    /**
     * Determines the path to the appropriate mkspiffs binary based on the platform.
     * @returns {string} The full path to the mkspiffs executable.
     */
    getMkspiffPath() {
        const platform = os.platform();
        const arch = os.arch();

        let binaryPath = '';

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
     * @param {function} callback - Callback function to handle the command output.
     */
    execute(args = [], callback) {
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
     * @param {object} options - Custom options for block size, page size, and spiff size.
     * @param {function} callback - Callback function to handle the command output.
     */
    pack(sourceDir, outputFile, options = {}, callback) {
        const args = ['-c', sourceDir];

        if (options.blockSize) args.push('-b', options.blockSize);
        if (options.pageSize) args.push('-p', options.pageSize);
        if (options.spiffSize) args.push('-s', options.spiffSize);

        args.push(outputFile);

        this.execute(args, callback);
    }

    /**
     * Unpacks a spiffs file into a specified directory.
     * @param {string} spiffFile - The .spiff file to unpack.
     * @param {string} outputDir - The directory where files will be unpacked.
     * @param {function} callback - Callback function to handle the command output.
     */
    unpack(spiffFile, outputDir, callback) {
        const args = ['-u', spiffFile, '-d', outputDir];

        this.execute(args, callback);
    }
}

module.exports = Mkspiffs;
