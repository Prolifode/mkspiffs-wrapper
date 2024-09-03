const Mkspiffs = require('../lib/mkspiffs');  // Adjust the path if necessary

const mkspiffs = new Mkspiffs();  // Initialize with the default path to mkspiffs.exe

// Example of packing files into a spiff with custom options
mkspiffs.pack('examples/sourceDir', 'examples/output.spiff', {
    blockSize: 4096,
    pageSize: 256,
    spiffSize: '0x20000'
}, (err, output) => {
    if (err) {
        console.error('Error packing files:', err);
    } else {
        console.log('Pack output:', output);
    }
});
