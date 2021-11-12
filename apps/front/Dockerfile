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
COPY ["apps/front/package*.json", "./apps/front/"]
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
FROM base AS app-dev

CMD ["./node_modules/.bin/lerna", "run", "--scope=@make.org/front", "dev", "--stream"]

EXPOSE 3000

############
# SSR
############
FROM base AS app-ssr

WORKDIR /home/app

ENV PATH /home/app/node_modules/.bin:$PATH

RUN ["./node_modules/.bin/lerna", "run", "--scope=@make.org/front",  "build", "--stream"]
CMD ["./node_modules/.bin/lerna", "run", "--scope=@make.org/front", "server:dev", "--stream"]

EXPOSE 3000

############
# TEST
############
FROM cypress/browsers:node16.5.0-chrome94-ff93 AS app-test

WORKDIR /home/app

RUN npm install -g lerna@4.0.0

COPY ["package*.json", "yarn.lock", "./"]
COPY ["apps/front/package*.json", "./apps/front/"]
COPY ["api/package*.json", "./api/"]
COPY ["components/package*.json", "./components/"]
COPY ["types/package*.json", "./types/"]
COPY ["assets/package*.json", "./assets/"]
COPY ["utils/package*.json", "./utils/"]
COPY ["ui/package*.json", "./ui/"]
COPY ["store/package*.json", "./store/"]
COPY lerna.json ./

RUN ["lerna", "bootstrap"]

COPY . ./

ENV PATH /home/app/node_modules/.bin:$PATH
ENV NODE_ENV test

RUN ["./node_modules/.bin/lerna", "run", "--scope=@make.org/front",  "build", "--stream"]
CMD ["./node_modules/.bin/lerna", "run", "--scope=@make.org/front", "test:cypress:open", "--stream"]

EXPOSE 9009

############
# BUILD
############
FROM keymetrics/pm2:16-alpine AS base-production

WORKDIR /usr/app

# git commands are necessary to build /version
RUN apk --no-cache add git

COPY ["package*.json", "yarn.lock", "./"]
COPY ["apps/front/package*.json", "./apps/front/"]
COPY ["api/package*.json", "./api/"]
COPY ["components/package*.json", "./components/"]
COPY ["types/package*.json", "./types/"]
COPY ["assets/package*.json", "./assets/"]
COPY ["utils/package*.json", "./utils/"]
COPY ["ui/package*.json", "./ui/"]
COPY ["store/package*.json", "./store/"]
RUN yarn install --no-progress --frozen-lockfile

COPY . ./
RUN yarn workspace @make.org/front build

# keep only production modules and autoclean
RUN yarn install --no-progress --frozen-lockfile --check-files --production
RUN yarn autoclean --force


FROM keymetrics/pm2:16-alpine as app-production

ENV PORT 8000

RUN apk --no-cache add curl

WORKDIR /usr/app/
COPY --from=base-production /usr/app/apps/front/dist ./dist
COPY --from=base-production /usr/app/apps/front/ecosystem.config.js ./ecosystem.config.js
COPY --from=base-production /usr/app/apps/front/bin ./bin
COPY --from=base-production /usr/app/apps/front/i18n ./i18n
COPY --from=base-production /usr/app/apps/front/server/staticData ./server/staticData

COPY --from=base-production /usr/app/node_modules ./node_modules

EXPOSE 8000

CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--only", "app-production" ]

HEALTHCHECK --interval=20s CMD curl --fail http://localhost:8000 || exit 1