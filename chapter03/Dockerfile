FROM node:16.8.0-bullseye AS build

WORKDIR /practice

COPY package.json package-lock.json tsconfig.json ./

RUN npm install

COPY src src
