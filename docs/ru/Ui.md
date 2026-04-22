# Содержание

- [Основной сайт](#основной-сайт-fixcrew-main)

  - [Структура проекта](#структура-проекта)
  - [Основные маршруты](#основные-маршруты)
  - [Стилизация](#стилизация)
  - [Переиспользуемые компоненты](#переиспользуемые-компоненты)
  - [Особенности реализации](#особенности-реализации)

- [Панель администратора](#панель-администратора-fixcrew-admin)

  - [Структура проекта](#структура-проекта-1)
  - [Основные маршруты](#основные-маршруты-1)
  - [Стилизация](#стилизация-1)
  - [Переиспользуемые компоненты](#переиспользуемые-компоненты-1)
  - [Особенности реализации](#особенности-реализации-1)

# Основной сайт (FixCrew Main)

## Структура проекта

```text
# client/fixcrew-main
.
├── index.html                               # Основная страница
├── package.json                             # Зависимости проекта
├── public                                   # Статические данные
├── src                                      # Основная папка проекта
│   ├── api                                  # Работа с API
│   ├── App.vue                              # Точка входа в приложение
│   ├── assets                               # Данные приложения
│   │   ├── fonts                            # Используемые шрифты
│   │   ├── geojson                          # GeoJSON для карты
│   │   ├── images                           # Изображения
│   │   └── main.css                         # Конфигурация TailwindCSS
│   ├── components                           # Компоненты
│   │   ├── infoPage                         # Компоненты страницы услуг
│   │   ├── mainPage                         # Компоненты основной страницы
│   │   ├── notFound                         # Компоненты страницы "Не найдено"
│   │   └── universalComp                    # Переиспользуемые компоненты
│   ├── interfaces                           # Интерфейсы
│   ├── main.ts                              # Точка входа в приложение
│   ├── mocks                                # Mock-значения
│   ├── pages                                # Страницы
│   ├── router                               # Конфигурация маршрутизации
│   ├── stores                               # Pinia хранилища
│   └── __tests__                            # Тестирование
├── vite.config.ts                           # Настройки сборщика Vite
└── vitest.config.ts                         # Настройки тестирования Vitest
```

## Основные маршруты

- **/** - Главная страница (компонент _MainPage_)
- **/booking** - страница формы заказа (компонент _BookingPage_)
- **/service/:slug** - страница услуги (компонент _InfoPage_, динамический параметр slug, зависит от описанных сервисов в Info Service на сервере)
- **любой неверный маршрут** - страница 404 (компонент _NotFoundPage_)

## Стилизация

```css
/* src/assets/main.css */
@import "tailwindcss";
/* Конфигурация темы */
@theme {
    --color-muted: #2B9AB0;                              /* Приглушенный цвет */
    --color-main: #00B4D8;                               /* Основной цвет */

    --font-sans: 'Inter', sans-serif;                    /* Основной шрифт */
    --font-highlite: 'sans-serif', 'Inter', 'text-2xl';  /* Шрифт для выделения */
    --font-bakbak: 'Bakbak', sans-serif;                 /* Кастомный шрифт BakbakOne */
}

/*Импорт стороннего шрифта*/
@font-face {
    font-family: 'Bakbak';
    src: url('./fonts/BakbakOne-Regular.ttf');
}
```

## Переиспользуемые компоненты

```text
.
├── AreasCard.vue                 # Карточки доступных регионов
├── Button.vue                    # Кнопка
├── ErrorCode.vue                 # Ошибка со статус-кодом
├── ErrorShort.vue                # Упрощенные формат ошибки
├── FileImage.vue                 # Картинка из API
├── InputContent.vue              # Текстовое поле
├── ScrollToTop.vue               # Кнопка пролистывания в начало страницы
├── ServiceCard.vue               # Карточка услуги
├── ServiceList.vue               # Список услуг
├── Slider.vue                    # Слайдер
└── SpinnerLoader.vue             # Колесо загрузки
```

## Особенности реализации

- **Валидация** - валидация данных происходит внутри компонентов при помощи регулярных выражений
- **Карта** - сторонняя библиотека Leaflet с отображением через OpenStreetMap

# Панель администратора (FixCrew Admin)

## Структура проекта
```text
.
├── index.html                             # Основная страница
├── package.json                           # Зависимости проекта
├── public                                 # Статические элементы
├── src                                    # Директория проекта
│   ├── api                                # Слой API
│   │   ├── file                           # Работа с маршрутами file-service
│   │   ├── info                           # Работа с маршрутами info-service
│   │   ├── order                          # Работа с маршрутами order-service
│   │   └── user                           # Работа с маршрутами user-service
│   ├── App.vue                            # Основной файл приложения
│   ├── assets                             # Данные приложения
│   │   ├── fonts                          # Шрифты
│   │   ├── images                         # Изображения
│   │   └── main.css                       # Точка входа tailwindcss
│   ├── components                         # Компоненты
│   │   ├── catalog                        # Каталог
│   │   ├── dashboard                      # Основная панель
│   │   ├── layout-auth                    # Шаблон авторизации
│   │   ├── layout-main                    # Основной шаблон
│   │   ├── layout-not-found               # Шаблон страницы 404
│   │   ├── regions                        # Регионы
│   │   ├── shared                         # Переиспользуемые компоненты
│   │   └── tokens                         # Токены
│   ├── layouts                            # Шаблоны
│   ├── main.ts                            # Точка входа в приложение
│   ├── pages                              # Страницы
│   │   ├── authorization                  # Страницы авторизации
│   │   ├── dashboard                      # Страницы панели управления
│   │   └── NotFound.vue                   # Страница 404 ошибки
│   ├── router                             # Конфигурация Vue Router
│   ├── stores                             # Хранилища Pinia
│   ├── types                              # Типы для работы с API
│   └── utils                              # Утилиты
│       └── validation                     # Валидация данных
├── vite.config.ts                         # Конфигурация Vite
└── vitest.config.ts                       # Конфигурация Vitest
```

## Основные маршруты

### Панель управления

- **/** - Основная страница
- **/regions** - Конфигурация регионов
- **/catalog** - Настройка каталога (типы, категории, сервисы)
- **/tokens** - Обработка токенов (invite, password)

### Авторизация

- **/auth/login** - страница входа в аккаунт
- **/auth/register** - регистрация. Обязана передавать токен как Query-параметр
- **/auth/restore**  - форма для получения ссылки на восстановление пароля
- **/auth/restore/use** - восстановление пароля. Необходим токен в Query 

## Стилизация

```css
/* src/assets/main.css */
@import "tailwindcss";

/* Шрифт Roboto */
@font-face {
  font-family: "Roboto";
  src: url("./fonts/Roboto.ttf");
}

/* Шрифт Inter */
@font-face {
  font-family: "Inter";
  src: url("./fonts/Inter.ttf");
}

/* Шрифт BakbakOne */
@font-face {
  font-family: "BakbakOne";
  src: url("./fonts/BakbakOne.ttf");
}

/* Настройки темы */
@theme {
  /* Цвета приложения */
  --color-accent: #00B4D8;                /* Акцентный цвет */
  --color-muted-accent: #0077B6;          /* Акцентны приглушенный цвет */
  --color-container: #F3FCFF;             /* Цвет фона */
  --color-container-muted: #D9D9D9;       /* Приглушенный цвет фона */
  --color-dimmed: #626262;                /* Серый цвет */

  /* Шрифты */
  --font-primary: Inter, sans-serif;      /* Основной шрифт */
  --font-secondary: Roboto, sans-serif;   /* Второстепенный шрифь */
  --font-accent: BakbakOne, sans-serif;   /* Акцентный шрифт */

  /* Точки разрыва для адаптивной стилизации */
  --breakpoint-smaller: 320px;            
  --breakpoint-small: 480px;
  --breakpoint-medium: 768px;
  --breakpoint-large: 1200px;
  --breakpoint-xl: 1440px;
}

/* Подключение основным шрифтом Inter через body */
body {
  font-family: var(--font-primary), sans-serif;
}
```

## Переиспользуемые компоненты

```text
.
├── buttons                         # Кпноки
│   ├── AccentButton.vue
│   ├── DangerousButton.vue
│   └── OutlineButton.vue
├── errors                          # Стили отображения ошибок
│   ├── ErrorCode.vue
│   └── ErrorShort.vue
├── FileImage.vue                   # Компонент для отображения файла
├── inputs                          # Поля ввода данных
│   ├── FileInput.vue
│   ├── InputComponent.vue
│   ├── PasswordInput.vue
│   ├── SelectComponent.vue
│   └── TextareaComponent.vue
├── Pagination.vue                  # Компонент пагинации
├── SpinnerLoader.vue               # Колесо загрузки
└── Title.vue                       # Заголовок секции
```

## Особенности реализации

- Реализована валидация данных через кастомные библиотеки
- Dashboard использует компонент календаря из библиотеки @toast-ui
- Модульная архитектура. Каждая страница имеет описание логики в следующих директориях:

  - api
  - components
  - types
  - utils/validation