FROM node:16.8.0-bullseye AS build

WORKDIR /practice

COPY package.json package-lock.json tsconfig.json /practice/

RUN npm install

COPY src src

RUN npx tsc

FROM node:16.8.0-bullseye AS deploy

WORKDIR /practice

COPY --from=build /practice/dist /practice/dist

CMD [ "node", "dist/index.js" ]
