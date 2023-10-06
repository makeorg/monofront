############
# Base
############
FROM node:18.17-alpine AS base
WORKDIR /home/app

ENV CHOKIDAR_USEPOLLING true

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk --no-cache add git

COPY ["package*.json", "yarn.lock", ".yarnrc.yml", "./"]
COPY ["apps/assembly/package*.json", "./apps/assembly/"]
COPY ["package/api/package*.json", "./package/api/"]
COPY ["package/components/package*.json", "./package/components/"]
COPY ["package/types/package*.json", "./package/types/"]
COPY ["package/assets/package*.json", "./package/assets/"]
COPY ["package/utils/package*.json", "./package/utils/"]
COPY ["package/ui/package*.json", "./package/ui/"]
COPY ["package/designsystem/package*.json", "./package/designsystem/"]
COPY ["package/store/package*.json", "./package/store/"]
COPY ["package/logger/package*.json", "./package/logger/"]
COPY ["apimock/package*.json", "./apimock/"]
COPY [".yarn", "./.yarn"]

RUN ["corepack", "enable", "yarn"]
RUN ["corepack", "prepare"]

RUN ["yarn", "workspaces", "focus", "@make.org/assembly"]

############
# Dev
############
FROM base AS app-dev

COPY . ./

RUN ["yarn", "workspaces", "focus", "@make.org/assembly"]
CMD ["yarn", "workspace", "@make.org/assembly", "dev"]

EXPOSE 3000
