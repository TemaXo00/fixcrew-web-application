# FixCrew

![Logo](../assets/img.png)

## Links

### Languages

- [Russian (Русский)](../../README.md)
- [English (Английский)](./README.md) - **Develops now**

### Documentation

- [Api](Api.md) - Backend Structure
- [Ui](Ui.md) - Frontend Structure
- [Contributors](Contributors.md) - Contributors of Project
- [Credits](Credits.md) - Used technologies
- [Env](Env.md) - environment values definitions

## Quick Start

```bash
git clone https://github.com/TemaXo00/fixcrew-web-application.git
cd fixcrew-web-application
cp .env.example .env
docker compose up --build
```

## Tech Stack

### API

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/Rabbitmq-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)

### UI

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

### Infrastructure

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Grafana](https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## Getting Started

### Project structure

```text
.
├── api                     # Backend folder
├── config                  # Configs for metric apps
├── docker-compose.yml      # Docker entrypoint
├── docker-files            # Dockerfiles for Apps
├── .dockerignore           # Docker ignored files/folders
├── docs                    # Documentation
├── .env.example            # Environment variables example
├── .gitignore              # Git ignored files/folders
├── README.md               # Main documentation file
└── ui                      # Frontend folder

```

### Launch application
To provide full application working, you must clone this repo:

```bash
git clone https://github.com/TemaXo00/fixcrew-web-application.git
```

After it, you must enter directory and setup environment variables by [this guide](Env.md). For basic launch, you can use example variables:

```bash
cd fixcrew-web-application
cp .env.example.env
# If you want to change env, you can use any text editor, example:
nano .env
```

Now you can start application by using Docker:

```bash
docker compose up --build
```

### Troubleshooting

#### Ports
Error example:

```bash
Error response from daemon: failed to set up container networking: driver failed programming external connectivity on endpoint fixcrew-ui-main (): failed to bind host port [::]:5173/tcp: address already in use
```

Fix:
```bash
# Check port usage
# Linux/MacOS
sudo netstat -tulnp | grep :port
# Windows
netstat -aon| find «port»
```

When you find out what blocking port, you can try:
1. Change port of app by env
2. Disable application, which block port

#### One or more services not working
```bash
# Find out what containers exited
docker ps -a
# Check out logs
docker compose logs "name of service"
# Try to restart
docker compose restart "name of service"
```

When you find out, that app have errors, you can message about it in [Issues page](https://github.com/TemaXo00/fixcrew-web-application/issues) or create fix and create pull request with fix