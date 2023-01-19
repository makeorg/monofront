############
# Base
############
FROM node:16.9-alpine AS base
WORKDIR /home/app

ENV CHOKIDAR_USEPOLLING true

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache git

COPY ["package*.json", "yarn.lock", ".yarnrc.yml", "./"]
COPY ["apps/widget/package*.json", "./apps/widget/"]
COPY ["package/api/package*.json", "./package/api/"]
COPY ["package/components/package*.json", "./package/components/"]
COPY ["package/types/package*.json", "./package/types/"]
COPY ["package/assets/package*.json", "./package/assets/"]
COPY ["package/utils/package*.json", "./package/utils/"]
COPY ["package/ui/package*.json", "./package/ui/"]
COPY ["package/designsystem/package*.json", "./package/designsystem/"]
COPY ["package/store/package*.json", "./package/store/"]
COPY ["apimock/package*.json", "./apimock/"]
COPY [".yarn", "./.yarn"]

RUN ["corepack", "enable", "yarn"]
RUN ["corepack", "prepare"]

RUN ["yarn", "workspaces", "focus", "@make.org/widget"]

############
# Dev
############
FROM base AS widget-dev

COPY . ./

RUN ["yarn", "workspaces", "focus", "@make.org/widget"]
CMD ["yarn", "workspace", "@make.org/widget", "dev"]

EXPOSE 3000

############
# SSR
############
FROM base AS widget-ssr

WORKDIR /home/app

COPY . ./

RUN ["yarn", "workspaces", "focus", "@make.org/widget"]
RUN ["yarn", "workspace", "@make.org/widget",  "build"]
CMD ["yarn", "workspace", "@make.org/widget", "server:dev"]

EXPOSE 3000


###################
# BUILD PRODUCTION
###################
FROM base AS base-production

WORKDIR /usr/app

COPY . ./

RUN ["yarn", "workspaces", "focus", "@make.org/widget"]
RUN ["yarn", "workspace", "@make.org/widget",  "build"]

RUN ["rm", "-rf", "node_modules"]
RUN ["yarn", "workspaces", "focus", "@make.org/widget", "--production"]


FROM node:16.9-alpine as widget-production

ENV PORT 8000

RUN apk --no-cache add curl

WORKDIR /usr/app/
COPY --from=base-production /usr/app/apps/widget/dist ./dist
COPY --from=base-production /usr/app/apps/widget/ecosystem.config.js ./ecosystem.config.js
COPY --from=base-production /usr/app/apps/widget/bin ./bin
COPY --from=base-production /usr/app/apps/widget/i18n ./i18n
COPY --from=base-production /usr/app/apps/widget/demo-iframe.html ./demo-iframe.html
COPY --from=base-production /usr/app/node_modules ./node_modules

EXPOSE 8000

CMD [ "node_modules/.bin/pm2-runtime", "start", "ecosystem.config.js", "--only", "widget-production" ]

HEALTHCHECK --interval=20s CMD curl --fail http://localhost:8000 || exit 1