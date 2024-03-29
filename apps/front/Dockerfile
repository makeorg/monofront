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
COPY ["apps/front/package*.json", "./apps/front/"]
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

RUN ["yarn", "workspaces", "focus", "@make.org/front"]

############
# Dev
############
FROM base AS app-dev

COPY . ./

RUN ["yarn", "workspaces", "focus", "@make.org/front"]
CMD ["yarn", "workspace", "@make.org/front", "dev"]

EXPOSE 3000

############
# Dev
############
FROM base AS app-dev-mock

COPY . ./

RUN ["yarn", "workspaces", "focus", "@make.org/front"]
CMD ["yarn", "workspace", "@make.org/front", "dev:mock"]

EXPOSE 3000

############
# SSR
############
FROM base AS app-ssr

WORKDIR /home/app

COPY . ./

RUN ["yarn", "workspaces", "focus", "@make.org/front"]
RUN ["yarn", "workspace", "@make.org/front",  "build"]
CMD ["yarn", "workspace", "@make.org/front", "server:dev"]

EXPOSE 3000

############
# BUILD
############
FROM base AS base-production

WORKDIR /usr/app

COPY . ./

RUN ["yarn", "workspaces", "focus", "@make.org/front"]
RUN ["yarn", "workspace", "@make.org/front",  "build"]

RUN ["rm", "-rf", "node_modules"]
RUN ["yarn", "workspaces", "focus", "@make.org/front", "--production"]


FROM node:18.17-alpine as app-production

ENV PORT 8000

RUN apk --no-cache add curl

WORKDIR /usr/app/
COPY --from=base-production /usr/app/apps/front/dist ./dist
COPY --from=base-production /usr/app/apps/front/ecosystem.config.js ./ecosystem.config.js
COPY --from=base-production /usr/app/apps/front/bin ./bin
COPY --from=base-production /usr/app/apps/front/i18n ./i18n
COPY --from=base-production /usr/app/apps/front/server/staticData ./server/staticData
COPY --from=base-production /usr/app/apps/front/server/convention ./server/convention
COPY --from=base-production /usr/app/node_modules ./node_modules

EXPOSE 8000

CMD [ "node_modules/.bin/pm2-runtime", "start", "ecosystem.config.js", "--only", "app-production" ]

HEALTHCHECK --interval=20s CMD curl --fail http://localhost:8000 || exit 1