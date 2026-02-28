FROM node:25.6.1-slim

WORKDIR /app

ARG UI_MAIN_PATH

COPY ${UI_MAIN_PATH}/package*.json ./
RUN npm ci

COPY ${UI_MAIN_PATH}/ .

EXPOSE 5173
CMD sh -c "npm run dev -- --host"