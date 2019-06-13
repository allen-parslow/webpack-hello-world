/* eslint-disable no-console */
const _ = require("lodash");
const packageJson = require(process.cwd() + "/package.json");
const awsConfig = require(process.cwd() + "/.aws-config");
const awsCli = require("./lib/aws-cli");

awsCli.validatePackageJson(packageJson);

console.log(`Creating aws environment for "${packageJson.name}@${packageJson.version}" for "${packageJson.repository.url}"`);

awsCli.validateConfig(awsConfig, ["s3bucket", "securityGroup"]);

awsCli.version();

awsCli.cloudformation.creatStack(packageJson.name, {
    template: "aws/codedeploy-formation.yml",
    parameters: {
        "GitRepoUrl": packageJson.repository.url,
        "S3CodeBucketName": awsConfig.s3bucket,
        "ProjectKeyName": "virg"
    }
});