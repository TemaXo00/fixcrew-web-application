# Веб-приложение FixCrew

![img.png](docs/assets/img.png)

## Ссылки

### Языки

- [Русский (Russian)](README.md)
- [Английский (English)](docs/eng/README.md) - **В процессе разработки**

### Документация

- [Api](docs/ru/Api.md) - Структура API
- [Ui](docs/ru/Ui.md) - Структура веб-интерфейса
- [Contributors](docs/ru/Contributors.md) - Участники проекта
- [Credits](docs/ru/Credits.md) - Использованые технологии
- [Env](docs/ru/Env.md) - Настройка переменных окружения (.env)

## Технологический стек

### Сервер

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/Rabbitmq-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)

### Клиент

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

### Инфраструктура

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Grafana](https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## Быстрый запуск

### Структура проекта

```text
.
├── client                  # Клиентские приложения
├── server                  # Серверные приложения
├── config                  # Конфигурации приложений метрик
├── docker-compose.yml      # Входная точка Docker
├── docker-files            # Конфигурации Dockerfile для приложений
├── .dockerignore           # Игнорируемые Docker файлы
├── .gitignore              # Игнорируемые Git файлы
└── .env.example            # Пример переменных окружения
```

### Launch application
Для обеспечения полного функционала приложения требуется склонировать репозиторий:

```bash
git clone git@gitea:TemaXo00/FixCrew.git
```

После этого необходимо перейти в директорию проекта и описать переменные окружения по [этой инструкции](docs/ru/Env.md). Для быстрого старта разрешается использование настроек по умолчанию:

```bash
cd fixcrew-web-application
cp .env.example.env
# Если необходимо изменить переменные окружения, можно использовать любой редактор текста, пример:
nano .env
```

После запускается стек контейнеров Docker:

```bash
docker compose up --build
```

### Исправление проблем

#### Порты
Пример ошибки:

```bash
Error response from daemon: failed to set up container networking: driver failed programming external connectivity on endpoint fixcrew-ui-main (): failed to bind host port [::]:5173/tcp: address already in use
```

Исправление:
```bash
# Проверка занятости портов
# Linux/MacOS
sudo netstat -tulnp | grep :port
# Windows
netstat -aon| find «port»
```

После того, как были выявления приложения, занимающие порты, можно выполнить следующие действия:
1. Изменить порт в env
2. Отключить приложение, которое занимает порт

#### Один или несколько сервисов не работает
```bash
# Выясняем, какое приложение перестало работать
docker compose ps -a
# Проверяем логи
docker compose logs "name of service"
# Пытаемся перезапустить
docker compose restart "name of service"
```

Когда была найдена ошибка, можно сообщить об этом на [странице "Задачи"](http://gitea.temaxo.com/TemaXo00/FixCrew/issues/new) или создать исправление в новой ветке, и отправить Pull Request