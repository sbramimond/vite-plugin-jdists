# vite-plugin-jdists

## Introduction
[![NPM version](https://img.shields.io/npm/v/vite-plugin-jdists.svg?style=flat-square)](https://npmjs.com/package/vite-plugin-jdists)

A vite plugin for [jdists](https://github.com/zswang/jdists).

日常开发我们在代码中使用开发调试的一些代码，上线前需要手动删除保证不污染生产环境。比如密码或者调试代码，如果忘记这些操作，那么就会导致线上环境出现bug。为了解决这个问题，jdists 插件可以自动删除这些代码。

## Features

``` javascript

// 案例1：只在开发环境起作用的代码， 在生产环境会被自动删除

/* <dev> */
    let password = '123456';
    console.log('dev');
/* </dev> */

// 只在生产环境起作用的代码， 在开发环境会被自动删除

/* <prod> */
    let password = '777777';
    console.log('prod');
/* </prod> */


// 案例1：开发环境运行时使用的代码

let password = '123456';

/* <dev> */
    let password = '777777';
    console.log('prod');
/* </dev> */

```

这样做比判断process.env.NODE_ENV更方便，也更安全。build时，jdists会自动删除所有`<dev>`代码，只保留一份代码在运行时不会暴露任何给用户。


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
