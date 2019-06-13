// [ -d "build/" ] && rm -r build/ || :
/* eslint-disable no-console */
const fs = require("fs");
const spawn = require("child_process").spawn;
const platform = require("os").platform();

const rm = (dir) => {
    if (fs.existsSync(dir)) {
        console.log(`  $ removing ${dir}`);
        if (/^win/.test(platform)) {
            spawn("cmd", ["/c", `rd /s /q ${dir}`], { stdio: "inherit" }).on("exit", status => {
                if (status !== 0) {
                    process.exit(status);
                }
            });
        } else {
            spawn("sh -c", ["rm -rf build/ node_modules/"], { stdio: "inherit" }).on("exit", status => {
                if (status !== 0) {
                    process.exit(status);
                }
            });
        }
    }
};

rm("build");
rm("node_modules");
