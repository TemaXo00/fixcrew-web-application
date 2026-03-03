FROM node:25-alpine

WORKDIR /app

ARG MAIL_SERVICE_PATH

COPY ${MAIL_SERVICE_PATH}/package*.json ./
RUN npm ci

COPY ${MAIL_SERVICE_PATH}/ .

EXPOSE 3000
CMD sh -c "npm run start:dev"