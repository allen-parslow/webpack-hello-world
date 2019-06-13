/* eslint-disable no-console */
const _ = require("lodash");


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
    validatePackageJson: (packageJson) => {
        if (!packageJson.name) {
            console.error("package.json name not found");
            process.exit(1);
        }

        if (!packageJson.version) {
            console.error("package.json version not found");
            process.exit(1);
        }

        if (! _.get(packageJson, "repository.url")) {
            console.error("package.json repository.url not found");
            process.exit(1);
        }
    },
    validateConfig: (awsConfig, requiredAwsConfig) => {
        _.forEach(requiredAwsConfig, (required) => {
            const requireValue = awsConfig[required];
            if (!requireValue) {
                console.error(`.aws-config ${required} not found in ${JSON.stringify(awsConfig)}`);
                process.exit(1);
            } else {
                console.info(`  ${required}=${requireValue}`);
            }
        });
        console.log(" ");
    },
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