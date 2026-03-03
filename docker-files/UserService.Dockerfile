FROM node:25-alpine

WORKDIR /app

ARG USER_SERVICE_PATH

COPY ${USER_SERVICE_PATH}/package*.json ./
RUN npm ci

COPY ${USER_SERVICE_PATH}/ .

EXPOSE 3000
CMD sh -c "npm run start:dev"