# stage 01 - build
FROM node:12.22.1-alpine as builder

WORKDIR /build

COPY package.json ./
COPY yarn.lock ./
COPY webpack.config.js ./
COPY user_modules ./user_modules/

## build frontend apps
RUN yarn install
RUN npm run build

## keep only runtime dependencies
RUN yarn install --production



# stage 02 - run
FROM ric-web:latest

COPY --from=builder /build/node_modules /node_modules
COPY --from=builder /build/user_modules /user_modules

CMD ["/ric-web"]