############
# Base
############
FROM node:16-alpine AS base
WORKDIR /home/app

ENV PATH /home/app/node_modules/.bin:$PATH

RUN npm install -g lerna@4.0.0

COPY ["package*.json", "yarn.lock", "./"]
COPY ["apimock/package*.json", "./apimock/"]
COPY lerna.json ./

RUN ["lerna", "bootstrap"]

COPY . ./

############
# API MOCK
############
FROM base AS api-mock
WORKDIR /home/app

CMD ["./node_modules/.bin/lerna", "run", "--scope=@make.org/apimock", "start", "--stream"]

EXPOSE 9000

