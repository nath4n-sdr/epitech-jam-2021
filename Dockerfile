FROM node:alpine AS base

ENV APP_DIRECTORY="/usr/src/app"

ENV PATH="${PATH}:${APP_DIRECTORY}/node_modules/.bin/"

WORKDIR ${APP_DIRECTORY}

COPY package.json tsconfig.json yarn.lock ./


FROM base AS build

RUN yarn install --pure-lockfile

COPY . .

RUN yarn build


FROM base

COPY --from=build ${APP_DIRECTORY}/build/ ./build/

RUN yarn install --production --pure-lockfile

RUN yarn cache clean --all

CMD yarn start
