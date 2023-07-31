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
COPY ["package/logger/package*.json", "./package/logger/"]
COPY ["apps/translator/package*.json", "./apps/translator/"]
COPY [".yarn", "./.yarn"]

RUN ["corepack", "enable", "yarn"]
RUN ["corepack", "prepare"]

RUN ["yarn", "workspaces", "focus", "@make.org/translator"]

############
# Dev
############
FROM base AS app-dev

COPY . ./

RUN ["yarn", "workspaces", "focus", "@make.org/translator"]
CMD ["yarn", "workspace", "@make.org/translator", "dev"]

EXPOSE 3000

############
# BUILD
############
FROM base AS base-production

WORKDIR /usr/app

COPY . ./

RUN ["yarn", "workspaces", "focus", "@make.org/translator"]
RUN ["yarn", "workspace", "@make.org/translator",  "build"]

RUN ["rm", "-rf", "node_modules"]
RUN ["yarn", "workspaces", "focus", "@make.org/translator", "--production"]


FROM node:18.17-alpine as app-production

ENV PORT 8000

RUN apk --no-cache add curl

WORKDIR /usr/app/
COPY --from=base-production /usr/app/apps/translator/dist ./dist
COPY --from=base-production /usr/app/apps/translator/package.json ./dist/package.json
COPY --from=base-production /usr/app/apps/translator/ecosystem.config.cjs ./ecosystem.config.cjs
COPY --from=base-production /usr/app/node_modules ./node_modules


EXPOSE 8000

CMD [ "node_modules/.bin/pm2-runtime", "start", "ecosystem.config.cjs", "--only", "production" ]

HEALTHCHECK --interval=20s CMD curl --fail http://localhost:8000 || exit 1