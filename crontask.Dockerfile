FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

EXPOSE 3000

ENTRYPOINT ['node', 'cron-job.js']

COPY . .
