# @make.org/ui 
## Before starting

Please refers to [*getting started* section](../../README.md#getting-started)

## Introduction

This package contains all UI elements used to build Make.org's interfaces.
It gathers styles and components without buisness logic.

## Convert SVG to React Component
To handle SVG with ease, we are using <a href="https://github.com/gregberge/svgr" target="_blank">SVGR (open in a new tab)</a> with <a href="https://react-svgr.com/docs/cli/" target="_blank">cli mode (open in a new tab)</a>.

To convert an SVG to a React Component :
- Create a new folder called `svgr` in [./Svg]('./Svg')
- Be at the root of the monofront repository
- Run the [script](./package.json#L44) with ```yarn workspace @make.org/ui svg```
- Import your React component in the [index file](./Svg/elements/index.tsx)
- Then use it in your code :tada: