const fs = require('fs');
const cli = require('./lib/cli');
const packageJson = require(process.cwd() + "/package.json");

console.log(`Starting Docker for ${packageJson.name}`);

fs.copyFile('scripts/lib/DockerFile', 'build/DockerFile', (err) => {
    if (err){
        throw err;
    }
    console.log('Copied DockerFile');
});

cli('docker', 'build dist/');


