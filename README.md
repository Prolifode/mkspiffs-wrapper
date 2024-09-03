# mkspiffs-wrapper

`mkspiffs-wrapper` is a Node.js wrapper for `mkspiffs`, a tool used to create and manage SPIFFS filesystems. This package allows you to pack and unpack SPIFFS files from within a Node.js environment.

## Installation

To install the package, use npm:

```bash
npm install mkspiffs-wrapper
```
Usage
Importing the Package
In your TypeScript file, import the Mkspiffs class:

```typescript
import Mkspiffs from 'mkspiffs-wrapper';
```
Creating an Instance
Create an instance of Mkspiffs:

```typescript
const mkspiffs = new Mkspiffs();
```

Packing Files
To pack files into a SPIFFS file, use the pack method:

```typescript
mkspiffs.pack('path/to/sourceDir', 'path/to/output.spiff', {
blockSize: 4096,
pageSize: 256,
spiffSize: 0x20000  // Size in bytes
}, (err: Error | null, output: string | null) => {
    if (err) {
        console.error('Error packing files:', err);
    } else {
        console.log('Pack output:', output);
    }
});
```
Unpacking Files
To unpack a SPIFFS file, use the unpack method:

```typescript
mkspiffs.unpack('path/to/input.spiff', 'path/to/outputDir', (err: Error | null, output: string | null) => {
    if (err) {
        console.error('Error unpacking files:', err);
    } else {
        console.log('Unpack output:', output);
    }
});
```

### TypeScript Support  
This package is written in TypeScript, and type definitions are included. You can use it directly in TypeScript projects for better type safety and autocompletion.

### Examples 
See the examples directory for usage examples in TypeScript.

### Contributing
If you'd like to contribute to this project, please fork the repository and create a pull request with your changes.

### License
This project is licensed under the MIT License. See the LICENSE file for details.

### Acknowledgments
Special thanks to the authors of mkspiffs for their tool and to the TypeScript community for their support.

