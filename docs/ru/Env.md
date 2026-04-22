# Переменные окружения

Переменные окружения в проекте были разделены в зависимости от назначения и сервиса

## Пути сборки проекта

Используются для Dockerfile, чтобы описать где находится каждый сервис. **Не рекомендуется менять**. При замене, новый путь должен соответствовать реальному пути в структуре проекта и должен быть указан как volume в docker-compose.yml (главная директория приложения)

```text
# Build Paths
UI_MAIN_PATH=./client/fixcrew-main               # Client - Основной интерфейс
UI_ADMIN_PATH=./client/fixcrew-admin             # Client - Панель администратора
BLOG_SERVICE_PATH=./server/blog-service          # Server - Сервис блога
FILE_SERVICE_PATH=./server/file-service          # Server - Сервис хранения файлов
GATEWAY_SERVICE_PATH=./server/gateway-service    # Server - Точка входа серверной части
INFO_SERVICE_PATH=./server/info-service          # Server - Сервис информации
MAIL_SERVICE_PATH=./server/mail-service          # Server - Почтовый сервис
ORDER_SERVICE_PATH=./server/order-service        # Server - Сервис заказов
USER_SERVICE_PATH=./server/user-service          # Server - Сервис пользователей
```

## Порты приложений

Назначение портов для приложений на устройстве. **Можно заменять**, но стоит учитывать доступность на клиентском ПК

```text
# Apps ports
UI_MAIN_PORT=5173            # Основной интерфейс
UI_ADMIN_PORT=5174           # Панель администратора
GATEWAY_SERVICE_PORT=3000    # Точка входа серверной части
MINIO_API_PORT=9100          # Хранилище медиа MinIO, API
MINIO_UI_PORT=9101           # Хранилище медиа MinIO, интерфейс
GF_PORT=9103                 # Сбор метрик, Grafana
PROM_PORT=9104               # Сбор метрик, Prometheus
LOKI_PORT=9105               # Сбор метрик, Loki
```

## MinIO

Используется для хранения данных, в основном, фотографий. **Можно заменять под необходимые пользователю данные**

```text
# Minio
MINIO_USER=user                   # Логин
MINIO_PASSWORD=12345678           # Пароль
```

## Grafana

Сбор метрик приложения. Анализирует информацию из разных источников (Prometheus, Redis, базы данных Postgres). **Пользователь может определить свои данные**

```text
# Grafana
GF_ADMIN_USER=user               # Логин
GF_ADMIN_PASSWORD=password       # Пароль
```

## Redis

Используется для кеширования в приложении. Заменить можно **только если пользователь изменяет название контейнера в docker-compose.yml**

```text
REDIS_URL="redis://redis:6379"    # URL
```

## RabbitMQ

Брокер сообщений для общения микросервисов на NestJS между собой. **Заменять можно все параметры**

```text
# RabbitMQ
RABBIT_MQ_USER=user                # Логин
RABBIT_MQ_PASSWORD=password        # Пароль
MAIL_QUEUE=mail-service-queue      # Очередь почты
ORDER_QUEUE=order-service-queue    # Очередь заказов
INFO_QUEUE=info-service-queue      # Очередь информации
```

## Приложения

Настройка конфигураций реализованных сервисов. Заменять данные можно только в тех параметрах, **в которых нет переменных**

```text
# Apps
APPS_PROTOCOL="http"                                                                 # Протокол                                 
APPS_ENTRYPOINT="localhost"                                                          # Точка входа
GATEWAY_URL="${APPS_PROTOCOL}://${APPS_ENTRYPOINT}:${GATEWAY_SERVICE_PORT}..."
CORS_ALLOWED_ORIGINS="${APPS_PROTOCOL}://${APPS_ENTRYPOINT}:${UI_ADMIN_PORT}..."
MAIL_UI_LINK="${APPS_PROTOCOL}://${APPS_ENTRYPOINT}:${UI_ADMIN_PORT}"
COOKIE_DOMAIN="${APPS_ENTRYPOINT}"
MAIL_USER=user                                                                       # Логин SMTP
MAIL_PASSWORD=password                                                               # Пароль SMTP
JWT_SECRET=secret                                                                    # Секрет для JWT-токенов
JWT_ACCESS_TTL=15m                                                                   # Время жизни Access токена
JWT_REFRESH_TTL=30d                                                                  # Время жизни Refresh токена
```

## Базы данных

Имеют однотипную настройку, поэтому будет рассмотрен только один вариант. Изменять можно все, **кроме параметра URL**
```text
# Users DB
USER_DB_USER=user              # Логин пользователя БД User
USER_DB_PASSWORD=12345678      # Пароль пользователя БД User
USER_DB_NAME=users             # Название базы данных
USER_DB_URL="..."              # URL для доступа из API

```