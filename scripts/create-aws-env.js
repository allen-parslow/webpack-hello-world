/* eslint-disable no-console */
const _ = require("lodash");
const packageJson = require(process.cwd() + "/package.json");
const awsConfig = require(process.cwd() + "/.aws-config");
const repoUrl = _.get(packageJson, "repository.url");
const awsCli = require("./lib/aws-cli");

if (!packageJson.name) {
    console.error("package.json name not found");
    process.exit(1);
}

if (!packageJson.version) {
    console.error("package.json version not found");
    process.exit(1);
}

if (!repoUrl) {
    console.error("package.json repository.url not found");
    process.exit(1);
}

console.log(`Creating aws environment for "${packageJson.name}@${packageJson.version}" for "${repoUrl}"`);

const requiredAwsConfig = ["s3bucket", "securityGroup"];
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


awsCli.version();

awsCli.cloudformation.creatStack(packageJson.name, {
    template: "aws/codedeploy-formation.yml",
    parameters: {
        "GitRepoUrl": repoUrl,
        "S3CodeBucketName": awsConfig.s3bucket,
        "ProjectKeyName": "virg"
    }
});