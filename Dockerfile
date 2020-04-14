FROM node:12-alpine

ARG NODE_ENV="production"

ENV PORT=80

RUN apk add --update
RUN apk add unzip
RUN apk add git

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
COPY package.json /tmp/package.json
COPY package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install --production
RUN mkdir -p /quote-app-api && cp -a /tmp/node_modules /quote-app-api

# From here we load our application's code in, therefore the previous docker
# "layer" that has been cached, will be used if possible
WORKDIR /quote-app-api
COPY . /quote-app-api

EXPOSE  80

ENTRYPOINT [ "/bin/sh", "-c", "npm run start:env" ]
