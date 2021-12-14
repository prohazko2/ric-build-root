# ric-build-root

Minimal webpack configuration for Rightech IoT user modules development

- With [example module](https://github.com/prohazko2/ric-user-module)

## Build & run

```sh
> git submodule update --init --recursive
> yarn install
> yarn build
> docker-compose up
```

## Development

```sh
> docker-compose up
> yarn watch
```

You only need to restart `docker-compose up` when you:
- update `user_modules/*/index.js` and referenced files
- install new `node_modules` required from `user_modules/*/index.js`

You only need to restart `yarn watch` when you:
- update `webpack.config.js`
- feel something wrong
