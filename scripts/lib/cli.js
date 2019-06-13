const spawn = require("cross-spawn");

const cli = (cmd, argumentText) => {
    const args = (argumentText || "").split(" ");

    console.log(`$ ${cmd} ${argumentText}`);

    const result = spawn.sync(cmd, args, {
        cwd: process.cwd(),
        stdio: "inherit"
    });

    if (result.signal) {
        if (result.signal === "SIGKILL") {
            console.log("ERROR: SIGKILL");
        } else if (result.signal === "SIGTERM") {
            console.log("ERROR: SIGTERM");
        } process.exit(1);
    }

    if (result.status !== 0) {
        process.exit(result.status);
    }

    console.log("");
};

module.exports = cli;