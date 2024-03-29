# Make.org front end monorepo

This project gathers shared pakages and apps for make.org front end products.

## Summary

1. [Technical Stack](#technical_stack)
2. [Core concepts](#core_concepts)
3. [Getting started](#getting_started)
4. [Shared Packages](#shared_packages)
5. [Apps](#apps)
6. [Contributing](#contributing)
7. [Tooling](#tooling)
8. [TODO](#todo)

## <a name="technical_stack"></a>Technical Stack

The folowing technologies are used to build and test this repository :

- <a href="https://github.com/microsoft/TypeScript/" target="_blank">Typescript (open in a new tab)</a>
- <a href="https://github.com/facebook/react/" target="_blank">React (open in a new tab)</a>
- <a href="https://styled-components.com/" target="_blank">Styled Components (open in a new tab)</a>
- <a href="https://jestjs.io/" target="_blank">Jest (open in a new tab)</a>
- <a href="https://www.cypress.io/" target="_blank">Cypress (open in a new tab)</a>
- <a href="https://pm2.keymetrics.io/" target="_blank">PM2 (open in a new tab)</a>

## <a name="core_concepts"></a>Core concepts

The main purpose of this repository is to optimize behaviours between various apps.

To ensure this we adopted a monorepository architecture with yarn workspace :

- Front office [applications](./apps)
- Global packages shared between front office apps

These packages are defined in the root [package.json](./package.json).

During development, to avoid untimely version switching between node versions, we use <a href="https://www.docker.com/" target="_blank">Docker (open in a new tab)</a> and <a href="https://docs.docker.com/compose/install/" target="_blank">Docker Compose (open in a new tab)</a>.
For further informations, refers to [docker-compose dev configuration](./docker-compose.dev.yaml) and Dockerfiles of each [apps'](./apps).

## <a name="getting_started"></a>Getting started

- Enable <a href="https://yarnpkg.com/getting-started/install" target="_blank">Yarn with corepack (open in a new tab)</a>

```bash
corepack enable yarn
corepack prepare
```

- Clone repo from [gitlab](https://gitlab.com/makeorg/platform/monofront)
- Add `127.0.0.1       local.makeorg.tech` to hosts file in `/etc/hosts`
- Run `yarn install` to install dependencies.
- Install <a href="https://docs.docker.com/get-docker/" target="_blank">Docker (open in a new tab)</a> and <a href="https://docs.docker.com/compose/install/" target="_blank">Docker Compose (open in a new tab)</a>.
- Refers to each [apps'](./apps) README file to build and run.

## <a name="shared_packages"></a>Shared Packages

The purpose of the shared packages is to gather parts of the codebase used to build various apps.
They are splitted in 8 packages :

- [API](./package/api/README.md) : Layers with stategies and splitted services by endpoints.
- [ApiMock](./apimock/README.md) : Mocked API based on [Core API](https://gitlab.com/makeorg/platform/core-api). Mainly used for functional testing purposes.
- [Assets](./package/assets/REAME.md) : Fonts, images, stylesheets and various assets used to build Make.org web interfaces.
- [Components](./package/components/REAME.md) : Components with style and business logic used in Make.org apps.
- [Store](./package/store/REAME.md) : Actions, reducers and management for React Context in Make.org apps.
- [Types](./package/types/REAME.md) : Types and data models for Make.org objects.
- [UI](./package/ui/README.md) : Styles and ui elements without business logic.
- [Utils](./package/utils/README.md) : Useful methods, constants, middlewares and hooks to handle i/o tranformation.
- [Design System](./package/designsystem/README.md) : design system package.


## <a name="apps"></a>Apps

For further informations, please refers to each README.md :

- [Front](./apps/front/README.md)
- [Widget](./apps/widget/README.md)
- [Assembly-ui](./apps/assembly-ui/README.md)

## <a name="contributing"></a>Contributing

Refers to [CONTRIBUTING.md](./CONTRIBUTING.md)

## <a name="tooling"></a>Tooling

### Unit testing

To launch test :

```bash
$ yarn jest
```

To enable watch mode:

```bash
$ yarn jest --watch
```

> then touch the o key to re-launch test only on files changed

### Linter

To launch linter :

```bash
$ yarn eslint ./
```

### Detect duplications

To launch jscpd :

```bash
$ yarn jscpd
```

### Prepush

Before push the following command will be executed `yarn prepush`
Following commands are runned on prepush :


See: [.husky/pre-prush](.husky/pre-push)

### Convert SVG to React Component

Refers to @make.org/ui [README.md](./package/ui/README.md).

### Create a new Package

- Create the new folder in package directory
- Add a package.json with relevant name and dependencies in the new folder
- Add a tsconfig.json with relevant references in the new folder
- Update global package.json file with new package (under "workspaces")
- Update global tsconfig.json file with new package (under "paths")
- Update local package.json and tsconfig.json where needed (usually at least in front and widget),
  with the new package as "dependencies" for package.json and "references" for tsconfig.json
- Update front and widget Dockerfile with the new package
- Run yarn install
- Update and run docker-compose for app-ssr (clean containers and images first), to try to have a full updated build.
  If everything is good, there should be no error

## <a name="todo"></a>TODO

- [ ] Add an a11y section
- [ ] Add Packages README.md
- [ ] Add CONTRIBUTING.md
- [ ] Handle source in widget state and isWidget conditional
- [ ] Adjust eslint config
- [ ] Clean `any` types
- [ ] Increase cypress testing coverage
- [ ] Increase unit testing coverage
- [ ] Add lighthouse acceptance testing suite
