import Mkspiffs from '../dist';  // Adjust the import path if necessary

const mkspiffs = new Mkspiffs();  // Initialize with the default path to mkspiffs executable

// Example of packing files into a spiff with custom options
mkspiffs.pack('examples/sourceDir', 'examples/output.spiff', {
    blockSize: 4096,
    pageSize: 256,
    spiffSize: 0x20000  // Note: Hex values should be written as decimal in TypeScript
}, (err: Error | null, output: string | null) => {
    if (err) {
        console.error('Error packing files:', err);
    } else {
        console.log('Pack output:', output);
    }
});
