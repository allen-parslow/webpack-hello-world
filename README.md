# Hello World using webpack

## Run 

```
npm start
```

## Building with Docker

```
gulp build
sudo docker build -t httpd-hello-word .
sudo docker run -p 8080:80 httpd-hello-word
```

TO DO: combine docker with npm?