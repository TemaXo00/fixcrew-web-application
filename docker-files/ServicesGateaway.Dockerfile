FROM node:25-alpine

WORKDIR /app

ARG GATEWAY_PATH

COPY ${GATEWAY_PATH}/package*.json ./
RUN npm ci

COPY ${GATEWAY_PATH}/ .

EXPOSE 3000
CMD sh -c "npm run start:dev"