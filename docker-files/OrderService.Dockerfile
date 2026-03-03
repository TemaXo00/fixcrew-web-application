FROM node:25-alpine

WORKDIR /app

ARG ORDER_SERVICE_PATH

COPY ${ORDER_SERVICE_PATH}/package*.json ./
RUN npm ci

COPY ${ORDER_SERVICE_PATH}/ .

EXPOSE 3000
CMD sh -c "npm run start:dev"