    FROM node:10-alpine

    RUN mkdir /app
    WORKDIR /app

    COPY package.json /app
    ENV HTTP_PROXY "http://proxy.tcs.com:8080"
    ENV HTTPS_PROXY "http://proxy.tcs.com:8080"
    RUN yarn

    COPY . .
    CMD ["node", "src/index.js"]