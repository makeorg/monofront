############
# Base
############
FROM node:16.9-alpine AS base
WORKDIR /home/app

ENV CHOKIDAR_USEPOLLING true

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk --no-cache add git

COPY ["package*.json", "yarn.lock", ".yarnrc.yml", "./"]
COPY ["apps/content/package*.json", "./apps/content/"]
COPY [".yarn", "./.yarn"]

RUN ["corepack", "enable", "yarn"]
RUN ["corepack", "prepare"]

RUN ["yarn", "workspaces", "focus", "@make.org/content"]

############
# Dev
############
FROM base AS app-dev

COPY . ./

RUN ["yarn", "workspaces", "focus", "@make.org/content"]
CMD ["yarn", "workspace", "@make.org/content", "start:dev"]

EXPOSE 3000

############
# BUILD
############
FROM base AS base-production

WORKDIR /usr/app

COPY . ./

RUN ["yarn", "workspaces", "focus", "@make.org/content"]
RUN ["yarn", "workspace", "@make.org/content",  "prisma", "generate"]
RUN ["yarn", "workspace", "@make.org/content",  "build"]

RUN ["mv", "node_modules/.prisma/client", "./client"]
RUN ["rm", "-rf", "node_modules"]
RUN ["yarn", "workspaces", "focus", "@make.org/content", "--production"]
RUN ["cp", "-r", "./client", "node_modules/.prisma/"]

FROM node:16.9-alpine as app-production

ENV PORT 8000

RUN apk --no-cache add curl

WORKDIR /usr/app/
COPY --from=base-production /usr/app/apps/content/dist ./dist
COPY --from=base-production /usr/app/apps/content/package.json ./package.json
COPY --from=base-production /usr/app/apps/content/ecosystem.config.cjs ./ecosystem.config.cjs
COPY --from=base-production /usr/app/node_modules ./node_modules


EXPOSE 8000

CMD [ "node_modules/.bin/pm2-runtime", "start", "ecosystem.config.cjs", "--only", "production" ]

HEALTHCHECK --interval=20s CMD curl --fail http://localhost:8000 || exit 1