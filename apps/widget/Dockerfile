############
# Base
############
FROM node:16.9-alpine AS base
WORKDIR /home/app

ENV PATH /home/app/node_modules/.bin:$PATH
ENV CHOKIDAR_USEPOLLING true

RUN apk --no-cache add git
RUN npm install -g lerna@4.0.0

COPY ["package*.json", "yarn.lock", "./"]
COPY ["apps/widget/package*.json", "./apps/widget/"]
COPY ["api/package*.json", "./api/"]
COPY ["components/package*.json", "./components/"]
COPY ["types/package*.json", "./types/"]
COPY ["assets/package*.json", "./assets/"]
COPY ["utils/package*.json", "./utils/"]
COPY ["ui/package*.json", "./ui/"]
COPY ["store/package*.json", "./store/"]
COPY ["apimock/package*.json", "./apimock/"]
COPY lerna.json ./

RUN ["lerna", "bootstrap"]

COPY . ./

############
# Dev
############
FROM base AS widget-dev

CMD ["./node_modules/.bin/lerna", "run", "--scope=@make.org/widget", "dev", "--stream"]

EXPOSE 3000

############
# SSR
############
FROM base AS widget-ssr

WORKDIR /home/app

ENV PATH /home/app/node_modules/.bin:$PATH

RUN ["./node_modules/.bin/lerna", "run", "--scope=@make.org/widget",  "build", "--stream"]
CMD ["./node_modules/.bin/lerna", "run", "--scope=@make.org/widget", "server:dev", "--stream"]

EXPOSE 3000


############
# TEST
############
FROM cypress/browsers:node16.5.0-chrome94-ff93 AS widget-test

WORKDIR /home/app

ENV PATH /home/app/node_modules/.bin:$PATH

RUN apk --no-cache add git
RUN npm install -g lerna@4.0.0

COPY ["package*.json", "yarn.lock", "./"]
COPY ["apps/widget/package*.json", "./apps/widget/"]
COPY ["api/package*.json", "./api/"]
COPY ["components/package*.json", "./components/"]
COPY ["types/package*.json", "./types/"]
COPY ["assets/package*.json", "./assets/"]
COPY ["utils/package*.json", "./utils/"]
COPY ["ui/package*.json", "./ui/"]
COPY ["store/package*.json", "./store/"]
COPY ["apimock/package*.json", "./apimock/"]
COPY lerna.json ./

RUN ["lerna", "bootstrap"]

COPY . ./

ENV NODE_ENV ci

RUN ["./node_modules/.bin/lerna", "run", "--scope=@make.org/widget",  "build", "--stream"]
RUN ["./node_modules/.bin/lerna", "run", "--scope=@make.org/apimock", "start", "--stream"]
RUN [ "pm2-runtime", "start", "ecosystem.config.js", "--only", "widget-test" ]
CMD ["./node_modules/.bin/lerna", "run", "--scope=@make.org/widget", "cypress:front:run", "--stream"]

EXPOSE 9009


############
# BUILD
############
FROM keymetrics/pm2:16-alpine AS base-production

WORKDIR /usr/app

# git commands are necessary to build /version
RUN apk --no-cache add git

COPY ["package*.json", "yarn.lock", "./"]
COPY ["apps/widget/package*.json", "./apps/widget/"]
COPY ["api/package*.json", "./api/"]
COPY ["components/package*.json", "./components/"]
COPY ["types/package*.json", "./types/"]
COPY ["assets/package*.json", "./assets/"]
COPY ["utils/package*.json", "./utils/"]
COPY ["ui/package*.json", "./ui/"]
COPY ["store/package*.json", "./store/"]
RUN yarn install --no-progress --frozen-lockfile

COPY . ./
RUN yarn workspace @make.org/widget build

# keep only production modules and autoclean
RUN yarn install --no-progress --frozen-lockfile --check-files --production
RUN yarn autoclean --force


FROM keymetrics/pm2:16-alpine as widget-production

ENV PORT 8000

RUN apk --no-cache add curl

WORKDIR /usr/app/
COPY --from=base-production /usr/app/apps/widget/dist ./dist
COPY --from=base-production /usr/app/apps/widget/ecosystem.config.js ./ecosystem.config.js
COPY --from=base-production /usr/app/apps/widget/bin ./bin
COPY --from=base-production /usr/app/apps/widget/i18n ./i18n

COPY --from=base-production /usr/app/node_modules ./node_modules

EXPOSE 8000

CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--only", "widget-production" ]

HEALTHCHECK --interval=20s CMD curl --fail http://localhost:8000 || exit 1