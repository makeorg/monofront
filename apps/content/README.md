# @make.org/content 

## Description

Content API management application.

The application is build on [Nest](https://nestjs.com/) framework with [Prisma ORM](https://www.prisma.io/)

## Before starting

Requirements :
Please refers to [*getting started* section](../../README.md#getting-started)


## Useful docker commands
Please refers to <a href="https://docs.docker.com/engine/reference/commandline/docker/" target="_blank">Docker CLI (open in a new tab)</a> and <a href="https://docs.docker.com/compose/reference/" target="_blank">Docker Compose CLI (open in a new tab)</a> commands.

## Running dev instance

Add a .env file (copy [.env.dist](./env.dist) to .env)

Start :

```bash
$ docker-compose -f docker-compose.dev.yaml --profile=content-dev up -d
```

Apply cockroach database migrations :

```bash
$ docker-compose -f docker-compose.dev.yaml exec content_dev yarn workspace @make.org/content prisma migrate deploy
```

Generate fixtures :

```bash
$ docker-compose -f docker-compose.dev.yaml exec content_dev yarn workspace @make.org/content prisma db seed 
```

And go to http://localhost:3001/api


## Running unit tests


Run all tests
```bash
$ docker-compose -f docker-compose.dev.yaml exec content_dev yarn workspace @make.org/content test 
```

## Environment variables

see [.env.dist](./.env.dist)


## Updating packages
[Lerna Update Wizard](https://github.com/Anifacted/lerna-update-wizard) is installed to manage packages across workspaces.

```bash
$ yarn lernaupdate
