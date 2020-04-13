# app.co - 20min build
FROM node:12.15.0-alpine as base
# FROM blockstack/node:latest as base
WORKDIR /usr/src
COPY package.json yarn.lock /usr/src/
RUN apk update
RUN apk add --update --no-cache build-base \
  && apk add \
    --update-cache \
    python   \
    py-pip   \
    make   \
    g++   \
    vips-dev
RUN yarn install --network-timeout 1000000
COPY . .
RUN yarn build && \
  apk del \
    python \
    py-pip \
    make \
    g++

FROM node:12.15.0-alpine
# FROM blockstack/node:latest
WORKDIR /usr/src
ENV NODE_ENV="production"
COPY --from=base /usr/src .
EXPOSE 3000
CMD ["node", "--max-http-header-size", "16000", "./server"]
