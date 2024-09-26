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
COPY ["apps/assembly-ui/package*.json", "./apps/assembly-ui/"]
COPY ["package/api/package*.json", "./package/api/"]
COPY ["package/components/package*.json", "./package/components/"]
COPY ["package/types/package*.json", "./package/types/"]
COPY ["package/assets/package*.json", "./package/assets/"]
COPY ["package/utils/package*.json", "./package/utils/"]
COPY ["package/tracking/package*.json", "./package/tracking/"]
COPY ["package/ui/package*.json", "./package/ui/"]
COPY ["package/designsystem/package*.json", "./package/designsystem/"]
COPY ["package/store/package*.json", "./package/store/"]
COPY ["package/logger/package*.json", "./package/logger/"]
COPY ["apimock/package*.json", "./apimock/"]
COPY [".yarn", "./.yarn"]

RUN ["corepack", "enable", "yarn"]
RUN ["corepack", "prepare"]

RUN ["yarn", "workspaces", "focus", "@make.org/assembly-ui"]

############
# Dev
############
FROM base AS app-dev

COPY . ./

RUN ["yarn", "workspaces", "focus", "@make.org/assembly-ui"]
CMD ["yarn", "workspace", "@make.org/assembly-ui", "dev"]

EXPOSE 3000

############
# Dev
############
FROM base AS app-dev-mock

COPY . ./

RUN ["yarn", "workspaces", "focus", "@make.org/assembly-ui"]
CMD ["yarn", "workspace", "@make.org/assembly-ui", "dev:mock"]

EXPOSE 3000

############
# SSR
############
FROM base AS app-ssr

WORKDIR /home/app

COPY . ./

RUN ["yarn", "workspaces", "focus", "@make.org/assembly-ui"]
RUN ["yarn", "workspace", "@make.org/assembly-ui",  "build"]
CMD ["yarn", "workspace", "@make.org/assembly-ui", "server:dev"]

EXPOSE 3000

############
# BUILD
############
FROM base AS base-production

WORKDIR /usr/app

COPY . ./

RUN ["yarn", "workspaces", "focus", "@make.org/assembly-ui"]
RUN ["yarn", "workspace", "@make.org/assembly-ui",  "build"]

RUN ["rm", "-rf", "node_modules"]
RUN ["yarn", "workspaces", "focus", "@make.org/assembly-ui", "--production"]


FROM node:18.17-alpine AS app-production

ARG PROJECT_VERSION="{}"
ENV PORT 8000

RUN apk --no-cache add curl

WORKDIR /usr/app/
COPY --from=base-production /usr/app/apps/assembly-ui/dist ./dist
COPY --from=base-production /usr/app/apps/assembly-ui/ecosystem.config.js ./ecosystem.config.js
COPY --from=base-production /usr/app/apps/assembly-ui/bin ./bin
COPY --from=base-production /usr/app/apps/assembly-ui/i18n ./i18n
COPY --from=base-production /usr/app/node_modules ./node_modules

EXPOSE 8000

RUN echo ${PROJECT_VERSION} > "/usr/app/version"
RUN ["ln", "-sf", "/usr/app/version", "/usr/app/dist/client/version"]
CMD [ "node_modules/.bin/pm2-runtime", "start", "ecosystem.config.js", "--only", "app-production" ]

HEALTHCHECK --interval=20s CMD curl --fail http://localhost:8000/version || exit 1
