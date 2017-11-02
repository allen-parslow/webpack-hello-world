# Hello World using webpack

## Run 

```
npm start
```

## Building with Docker

```
npm run docker
```

## Running with AWS

```
npm run create-aws
aws codebuild start-build --project-name webpack-hello-world (wait about 3 minutes)
```

TODO hook CodeBuild to CodeDeploy
TODO create CodePipeline

NOTE: The cloudformation template does not create IAM policies
TODO: Provide a template to create IAM policies, groups, and roles

TODO configure the following with parameters:
NOTE: Requires a EC2 role named: role/deploy
NOTE: Requires a security group named: my-ip
NOTE: Requires a key-pair named: us-east-1
NOTE: Currently only creates env on us-east-1

## Useful commands (but unused in this project)

Login for ecr publish (with https fix):

```
eval $(aws ecr get-login --region us-east-1 | sed 's|https://||') 
```

Cleanup images

```
docker rm -f $(docker ps -aq)
docker images | awk '{print $3}' | xargs docker rmi
```