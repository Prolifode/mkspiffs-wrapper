"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path = __importStar(require("path"));
const os = __importStar(require("os"));
class Mkspiffs {
    mkspiffPath;
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
        }
        else if (platform === 'darwin') {
            binaryPath = path.join(__dirname, '..', 'bin', 'osx', 'mkspiffs');
        }
        else if (platform === 'linux') {
            if (arch === 'x64') {
                binaryPath = path.join(__dirname, '..', 'bin', 'linux64', 'mkspiffs');
            }
            else if (arch === 'ia32') {
                binaryPath = path.join(__dirname, '..', 'bin', 'linux32', 'mkspiffs');
            }
            else if (arch === 'arm') {
                binaryPath = path.join(__dirname, '..', 'bin', 'linux-armhf', 'mkspiffs');
            }
            else if (arch === 'arm64') {
                binaryPath = path.join(__dirname, '..', 'bin', 'generic', 'mkspiffs');
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
    execute(args, callback) {
        const fullCommand = `"${this.mkspiffPath}" ${args.join(' ')}`;
        (0, child_process_1.exec)(fullCommand, (error, stdout, stderr) => {
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
    pack(sourceDir, outputFile, options = {}, callback) {
        const args = ['-c', sourceDir];
        if (options.blockSize)
            args.push('-b', options.blockSize.toString());
        if (options.pageSize)
            args.push('-p', options.pageSize.toString());
        if (options.spiffSize)
            args.push('-s', options.spiffSize.toString());
        args.push(outputFile);
        this.execute(args, callback);
    }
    /**
     * Unpacks a spiffs file into a specified directory.
     * @param {string} spiffFile - The .spiff file to unpack.
     * @param {string} outputDir - The directory where files will be unpacked.
     * @param {(error: Error | null, stdout: string | null) => void} callback - Callback function to handle the command output.
     */
    unpack(spiffFile, outputDir, callback) {
        const args = ['-u', spiffFile, '-d', outputDir];
        this.execute(args, callback);
    }
}
exports.default = Mkspiffs;
