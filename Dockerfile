# Base image
FROM node:16-alpine AS base
WORKDIR /home/app

ENV PATH /home/app/node_modules/.bin:$PATH
ENV PATH /home/app/apps/front/node_modules/.bin:$PATH
ENV PATH /home/app/apps/widget/node_modules/.bin:$PATH

RUN apk --no-cache add git
RUN npm install -g lerna

COPY ["package*.json", "yarn.lock", "./"]
COPY ["apps/front/package*.json", "yarn.lock", "./apps/front/"]
COPY ["apps/widget/package*.json", "yarn.lock", "./apps/widget/"]
COPY ["api/package*.json", "yarn.lock", "./api/"]
COPY ["components/package*.json", "yarn.lock", "./components/"]
COPY ["types/package*.json", "yarn.lock", "./types/"]
COPY ["assets/package*.json", "yarn.lock", "./assets/"]
COPY ["utils/package*.json", "yarn.lock", "./utils/"]
COPY ["ui/package*.json", "yarn.lock", "./ui/"]
COPY ["store/package*.json", "yarn.lock", "./store/"]
COPY lerna.json ./

RUN lerna bootstrap

COPY . ./

CMD ["lerna", "run", "--scope=@make.org/front", "dev", "--stream"]

EXPOSE 3000
