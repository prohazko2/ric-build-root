FROM node:12.22.1-alpine as builder

WORKDIR /build

COPY package.json ./
COPY package-lock.json ./
COPY webpack.config.js ./
COPY deepinstall.js ./
COPY user_modules ./user_modules/

RUN npm install
RUN npm run deepinstall

RUN npm run build

## keep only prod dependencies
## can skip this if you don't care about result image size
RUN rm -rf node_modules
RUN npm install --only prod
RUN npm run deepinstall -- --prod

FROM ric-web:latest

COPY --from=builder /build/node_modules /node_modules
COPY --from=builder /build/user_modules /user_modules

CMD ["/ric-web"]