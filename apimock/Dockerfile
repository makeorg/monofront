############
# Base
############
FROM node:18.17-alpine AS base
WORKDIR /home/app

ENV PATH /home/app/node_modules/.bin:$PATH

COPY ["package*.json", "yarn.lock", ".yarnrc.yml", "./"]
COPY ["apimock/package*.json", "./apimock/"]
COPY [".yarn", "./.yarn"]

RUN ["corepack", "enable", "yarn"]
RUN ["corepack", "prepare"]

RUN ["yarn", "workspaces", "focus", "@make.org/apimock"]

COPY . ./

############
# API MOCK
############
FROM base AS api-mock
WORKDIR /home/app

CMD ["yarn", "workspace", "@make.org/apimock", "start"]

EXPOSE 9000

