FROM node:25.6.1-slim

WORKDIR /app

ARG UI_ADMIN_PATH

COPY ${UI_ADMIN_PATH}/package*.json ./
RUN npm ci

COPY ${UI_ADMIN_PATH}/ .

EXPOSE 5173
CMD sh -c "npm run dev -- --host"