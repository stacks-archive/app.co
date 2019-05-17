# app.co - 20min build
FROM node:10.15.3-alpine as base
# FROM blockstack/node:latest as base
WORKDIR /usr/src
COPY package.json yarn.lock /usr/src/
RUN apk add --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing --update-cache \
  python \
  py-pip \
  make \
  g++ \
  vips-dev
RUN yarn install
COPY . .
RUN yarn build && \
  apk del \
    python \
    py-pip \
    make \
    g++ && \
  yarn --production

FROM node:alpine
# FROM blockstack/node:latest
WORKDIR /usr/src
ENV NODE_ENV="production"
COPY --from=base /usr/src .
EXPOSE 3000
CMD ["node", "./server"]
