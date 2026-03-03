FROM node:25-alpine

WORKDIR /app

ARG AUTH_SERVICE_PATH

COPY ${AUTH_SERVICE_PATH}/package*.json ./
RUN npm ci

COPY ${AUTH_SERVICE_PATH}/ .

EXPOSE 3000
CMD sh -c "npm run start:dev"