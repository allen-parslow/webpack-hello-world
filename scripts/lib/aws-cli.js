/* eslint-disable no-console */
const _ = require("lodash");
const spawn = require("cross-spawn");

const executCommand = (cmd, argumentText) => {
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

const toAwsParams = (obj) => {
    let parameters = "";
    const keys = _.keys(obj);

    if (keys.length > 0) {
        parameters = "--parameters";
        _.forEach(keys, (key) => {
            const value = obj[key];
            parameters = `${parameters} ParameterKey=${key},ParameterValue=${value}`;
        });
    }
    return parameters;
};

const awsCli = {
    version: () => {
        executCommand("aws", "--version");
    },
    cloudformation: {
        creatStack: (name, options) => {
            const parametersText = toAwsParams(options.parameters || {});
            executCommand("aws", `cloudformation create-stack --stack-name ${name} --template-body file://${options.template}  ${parametersText}`);
        }
    }
};

module.exports = awsCli;