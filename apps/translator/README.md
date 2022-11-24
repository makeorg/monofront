# @make.org/translator 
## Before starting
:guardsman: Access to make.org tech env are restricted through VPN. Check this with make.org tech team before launching these commands.

:ok_hand: Check `local.makeorg.tech` is setted in hosts


Requirements :
Please refers to [*getting started* section](../../README.md#getting-started)

## Useful docker commands
Please refers to <a href="https://docs.docker.com/engine/reference/commandline/docker/" target="_blank">Docker CLI (open in a new tab)</a> and <a href="https://docs.docker.com/compose/reference/" target="_blank">Docker Compose CLI (open in a new tab)</a> commands.


## Running local

Configure .env file :
```bash
$ cp apps/translator/.env.dist apps/translator/.env
```

Start app in dev mode :

```bash
$ yarn workspace @make.org/translator dev
```

## Check types
```bash
$ yarn workspace @make.org/translator check
```

## Running dev instances

Dev mode :

```bash
$ docker-compose -f docker-compose.dev.yaml --profile=translator-dev up -d
```

Prod mode :
> After changes, you must rebuild your app in docker container :
```bash
$ docker-compose -f docker-compose.dev.yaml --profile=translator-prod up -d
```

## Environment variables for production

```bash
# .env file

# PORT
PORT=3000

# Deepl provider
PROVIDER_DEEPL_AUTH_KEY=
PROVIDER_DEEPL_URL=https://api-free.deepl.com/v2 # use https://api.deepl.com/v2 for non free

# Oauth endpoint
AUTHENTIFICATION_ENDPOINT=https://api.preprod.makeorg.tech/user/current 
```

## Updating packages
[Lerna Update Wizard](https://github.com/Anifacted/lerna-update-wizard) is installed to manage packages across workspaces.

```bash
$ yarn lernaupdate
```



