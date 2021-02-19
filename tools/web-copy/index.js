// eslint-disable-next-line @typescript-eslint/no-var-requires
const shelljs = require('shelljs');

const handleResultOutput = (result) => {
    if (result.code !== 0) {
        if (result.stderr !== '') {
            console.warn(result.stderr);
        }
        return process.exit(result.code);
    }
    if (result.stdout !== '') {
        console.log(result.stdout);
    }
};

const buildDir = './build/src/presentation/web/build';
const srcDir = './src/presentation/web/build';
const destDir = './build/src/presentation/web/';

console.log(`Copy web app from ${srcDir} to ${destDir}`);

let result = shelljs.mkdir('-p', buildDir);
handleResultOutput(result);

result = shelljs.cp('-R', srcDir, destDir);
handleResultOutput(result);
