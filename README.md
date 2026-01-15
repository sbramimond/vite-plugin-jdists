# vite-plugin-jdists

## Introduction
[![NPM version](https://img.shields.io/npm/v/vite-plugin-jdists.svg?style=flat-square)](https://npmjs.com/package/vite-plugin-jdists)

A vite plugin for [jdists](https://github.com/zswang/jdists).

## Install

```bash

npm i -D vite-plugin-jdists

## Usage
```js vite.config.js
import { defineConfig, type PluginOption } from 'vite';

import viteJdistsPlugin from 'vite-plugin-jdists'

export default defineConfig({
    ...
    plugins: [
        viteJdistsPlugin({
            include: ['**/*.tsx', '**/*.ts'], // 修正路径模式
            exclude: ['node_modules/**', 'dist/**'],
            remove: ['prod'],
            trigger: ['release']
        }) as PluginOption
    ]
    ...
})

```
