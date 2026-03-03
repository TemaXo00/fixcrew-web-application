FROM node:25-alpine

WORKDIR /app

ARG BLOG_SERVICE_PATH

COPY ${BLOG_SERVICE_PATH}/package*.json ./
RUN npm ci

COPY ${BLOG_SERVICE_PATH}/ .

EXPOSE 3000
CMD sh -c "npm run start:dev"