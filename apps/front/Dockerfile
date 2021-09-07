############
# Base
############
FROM node:16-alpine AS base
WORKDIR /home/app

ENV PATH /home/app/node_modules/.bin:$PATH
#ENV PATH /home/app/apps/front/node_modules/.bin:$PATH
#ENV PATH /home/app/apps/widget/node_modules/.bin:$PATH
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
COPY lerna.json ./

RUN ["lerna", "bootstrap"]

COPY . ./

############
# Dev
############
FROM base AS app-dev

WORKDIR /home/app

ENV PATH /home/app/node_modules/.bin:$PATH
#ENV PATH /home/app/apps/front/node_modules/.bin:$PATH
#ENV PATH /home/app/apps/widget/node_modules/.bin:$PATH
ENV CHOKIDAR_USEPOLLING true

CMD ["./node_modules/.bin/lerna", "run", "--scope=@make.org/front", "dev", "--stream"]

EXPOSE 3000

############
# TEST
############
FROM base AS app-test

WORKDIR /home/app

ENV PATH /home/app/node_modules/.bin:$PATH
ENV CHOKIDAR_USEPOLLING true
ENV NODE_ENV test

RUN ["./node_modules/.bin/lerna", "run", "--scope=@make.org/front",  "build", "--stream"]
CMD ["./node_modules/.bin/lerna", "run", "--scope=@make.org/front", "test:cypress:open", "--stream"]

EXPOSE 9009
