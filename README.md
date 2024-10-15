## Dashboard

---

### [Установка](###установка)

1.  #### [Cкачивание репозитория](####скачивание-репозитория)
2.  #### [Инициализация Базы Данных](#инициализация-базы-данных)
3.  #### [Инициализация Сервера](#инициализация-сервера)
4.  #### [Настройка Сервера](#настройка-сервера)
5.  #### [Инициализация Клиента](#инициализация-клиента)
6.  #### [Настройка Клиента](#настройка-клиента)

### [Запуск](#запуск)

1.  #### [Запуск приложения](#запуск-приложения)
2.  #### [API документация](#api-документация)

---

### Установка

#### Скачивание репозитория

Скачать данный репозиторий можно либо .zip архивом:

- Нажать на кнопку [<> Code] и выбрать [Download ZIP].
- Распаковать архив в удобную папку.

Либо клонировать с помощью git, так как репозиторий публичный:

- Для этого нужно иметь установленный на ПК [Git](https://git-scm.com/downloads).
- Нажать Win + R, ввести cmd и нажать Enter (для Windows); CTRL + ALT + T (для Linux); CMD + Пробел, ввести Терминал и нажать Enter (для macOS).
- Ввести в командной строке `git clone https://github.com/PushToTalkMe/dashboard-fullstack.git`.
- По умолчанию репозиторий будет скачан в папку пользователя, с которого командная оболочка была открыта.

#### Инициализация Базы Данных

Если PostgreSQL не установлен и не запущен, а psql не добавлен в "Переменные среды" (в случае установки на Windows), необходимо выполнить следующее:

1. Загрузить [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) и установить подходящую к текущей операционной системе версию.
2. Запомнить логин и пароль, понадобится в дальнейшем.
3. В случае установки PostgreSQL на ОС Windows, для простоты работы с интерактивным терминалом psql и упрощенной инициализации Базы Данных (БД) с помощью скрипта, необходимо добавить psql в "Переменные среды", для этого нужно:
   - Найти путь к каталогу psql, по умолчанию C:\Program Files\PostgreSQL\<версия>\bin, и скопировать его.
   - Открыть настройки системных переменных:
     - Нажать Win + R, чтобы открыть окно "Выполнить".
     - Ввести sysdm.cpl и нажать Enter.
     - В открывшемся окне выбрать вкладку "Дополнительно".
     - Нажать на кнопку "Переменные среды".
   - Изменить переменные среды
     - В разделе "Системные переменные" найти переменную Path и выбрать её нажатием.
     - Далее нажать на кнопку "Изменить".
     - В открывшемся окне нажать на "Создать" и вставить путь к каталогу bin, который был скопирован на первом шаге (например, C:\Program Files\PostgreSQL\17\bin).
     - Нажать "ОК" во всех окнах, чтобы сохранить изменения.
   - Для проверки, что переменная добавлена правильно, необходимо открыть командную строку:
     - Нажать Win + R, ввести cmd и нажать Enter.
     - В открывшейся командной строке ввести: `psql --version`.

Теперь для инициализации Базы данных необходимо открыть терминал, перейти в скачанный репозиторий и исполнить скрипт. Для этого:

1. Нажать Win + R, ввести cmd и нажать Enter (для Windows); CTRL + ALT + T (для Linux); CMD + Пробел, ввести Терминал и нажать Enter (для macOS).
2. Выполнить команды (последняя команда подходит для случая, если настройки PostgreSQL были оставлены по умолчанию, без изменения адреса и порта для соединения):
   ```bash
   cd dashboard-fullstack
   psql -U <Имя пользователя> -f init-db.sql
   ```
3. Далее потребуется ввести пароль и в случае успешного соединения будет отображена следующая информация:
   ```sql
   CREATE DATABASE
   You are now connected to database "dashboard" as user "Имя пользователя".
    SET
    CREATE TABLE
    CREATE TABLE
    CREATE FUNCTION
    insert_publishers
    (1 row)
    CREATE FUNCTION
    insert_boardgames
    (1 row)
    CREATE FUNCTION
    CREATE TRIGGER
    CREATE TRIGGER
   ```

На этом инициализация БД завершена. По умолчанию PostgreSQL будет работать в фоновом режиме и отдельная инструкция для её запуска не требуется, она уже готова к работе.

#### Инициализация Сервера

Для инициализации сервера и клиента, а также их локального запуска, необходимо иметь установленный пакетный менеджер `npm`, а также платформу для работы с языком JavaScript `Node.js`.

Для скачивания и дальнейшей установки необходимо перейти на [официальный сайт](https://nodejs.org/en/download/prebuilt-installer), выбрать последнюю стабильную версию `Node.js` (имеет пометку LTS) и подходящую ОС. Пакетный менеджер `npm` установится автоматически вместе с `Node.js`.

Для проверки правильности установки в терминале можно ввести команду:

```bash
node -v # если все сделано правильно, то результат будет номер версии `vxx.xx.x`
npm -v # если все сделано правильно, то результат будет номер версии `xx.x.x`
```

После установки необходимо открыть терминал, перейти в папку `server` из скачанного репозитория с помощью команды `cd путь/до_папки/dashboard-fullstack/server` и выполнить команду `npm i` для скачивания всех необходимых зависимостей для работы сервера.

#### Настройка Сервера

В папке `server` можно создать файл `.env` для добавления переменных окружения. Их можно использовать в любом месте сервера, но основное их предназначение - это хранения в переменных информации, которую не желательно делать публичной, например, пароли, логины, окрытые порты, адреса и т.п.

На сервере указаны значения по умолчанию, но если необходимо их поменять, то в `.env` можно указать переменные окружения из списка ниже:

```
DB - название базы данных. По умолчанию - dashboard;
DB_DIALECT - название базовой библиотеки коннекторов, используемой Sequelize. По умолчанию - postgres;
DB_HOST - адрес, на котором работает PostgreSQL. По умолчанию - localhost;
DB_PORT - порт, который прослушивает PostgreSQL. По умолчанию - 5432;
DB_USERNAME - имя пользователя PostgreSQL. По умолчанию - 'postgres';
DB_PASSWORD - пароль пользователя PostgreSQL. По умолчанию - 'postgres';
```

Пример записи в `.env`:

```
DB_PORT=5435
```

#### Инициализация Клиента

Инициализации клиента происходит аналогично инициализации сервера, а именно необходимо иметь установленный пакетный менеджер `npm`, а также платформу для работы с языком JavaScript `Node.js`. Если они ещё не установлены, то необходимо обратиться к инструкции по установке в пункте [Инициализация Сервера](#инициализация-сервера).

После установки необходимо открыть терминал, перейти в папку `client` из скачанного репозитория с помощью команды `cd путь/до_папки/dashboard-fullstack/client` и выполнить команду `npm i` для скачивания всех необходимых зависимостей для работы клиента.

#### Настройка Клиента

В папке `client` изначально находится файл `.env`. В нем указан порт, на котором должно запускаться клиентское приложение. Его можно поменять на любой свободный.

---

### Запуск

#### Запуск приложения

Для запуска приложения должны быть выполнены предыдущие пункты по Инициализации и Настройке [БД](#инициализация-базы-данных), [Сервера](#инициализация-сервера) и [Клиента](#инициализация-клиента).

Для запуска сервера необходимо открыть терминал, перейти в папку `server` из скачанного репозитория с помощью команды `cd путь/до_папки/dashboard-fullstack/server` и выполнить команду `npm run start`.

В случае успешного запуска сервера, терминал отобразит следующее:

```bash
$ npm run start

> server@1.0.0 start
> node app.js

Executing (default): SELECT 1+1 AS result
Успешное соединение с базой данных
Сервер запущен на http://localhost:3000
```

Для запуска клиентского приложения необходимо открыть терминал, перейти в папку `client` из скачанного репозитория с помощью команды `cd путь/до_папки/dashboard-fullstack/client` и выполнить команду `npm run start`.

В случае успешного запуска клиента, терминал отобразит следующее:

```bash
Compiled successfully!

You can now view client in the browser.

  Local:            http://localhost:3001
  On Your Network:  http://xxx.xxx.xxx.xxx:3001

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

#### API документация

Сервер позволяет выполнять стандартные CRUD операции.

Базовый URL:

```
http://localhost:3000/api
```

Ответы имеют формат JSON.

Все CRUD операции:

1. Создание

   - publishers

     - Endpoint: POST /publishers
     - Описание: Создание издателя
     - Request Body:

       ```json
       {
         "name": "STRING", // Обязательно
         "foundation_date": "DATE", // Обязательно
         "tin": "NUMERIC(12, 0)", // Обязательно
         "rating": "NUMBER" // Обязательно
       }
       ```

     - Response:

       ```json
       {
         "id": "NUMBER", // Уникальный идентификатор
         "name": "STRING",
         "foundation_date": "DATE",
         "tin": "STRING",
         "rating": "NUMBER",
         "created_at": "TIMESTAMPZ",
         "updated_at": "TIMESTAMPZ"
       }
       ```

     - Status Codes:
       - 201
       - 400

   - boardgames

     - Endpoint: POST /boardgames
     - Описание: Создание настольной игры
     - Request Body:

       ```json
       {
         "title": "STRING", // Обязательно
         "release_date": "DATE", // Обязательно
         "price": "NUMERIC(12, 0)", // Обязательно
         "publishers_id": "NUMBER" // Обязательно
       }
       ```

     - Response:

       ```json
       {
         "id": "NUMBER", // Уникальный идентификатор
         "title": "STRING",
         "release_date": "DATE",
         "price": "STRING",
         "publishers_id": "NUMBER",
         "created_at": "TIMESTAMPZ",
         "updated_at": "TIMESTAMPZ"
       }
       ```

     - Status Codes:
       - 201
       - 400

2. Чтение

   - publishers

     - Endpoint: GET /publishers?limit=&offset=
     - Query:

       ```
       limit=NUMBER
       offset=NUMBER
       ```

     - Описание: Получить издателей
     - Response:

       ```json
       {
         "total": "STRING",
         "publishers": [
           {
             "id": "NUMBER", // Уникальный идентификатор
             "name": "STRING",
             "foundation_date": "DATE",
             "tin": "STRING",
             "rating": "NUMBER",
             "created_at": "TIMESTAMPZ",
             "updated_at": "TIMESTAMPZ"
           }
         ]
       }
       ```

     - Status Codes:
       - 200
       - 400

   - publishers

     - Endpoint: GET /publisherIds
     - Описание: Получить все ID издателей
     - Response:

       ```
       NUMBER[]
       ```

     - Status Codes:
       - 200
       - 400

   - boardgames

     - Endpoint: GET /boardgames?limit=&offset=
     - Query:

       ```
       limit=NUMBER
       offset=NUMBER
       ```

     - Описание: Получить настольные игры
     - Response:

       ```json
       {
         "total": "STRING",
         "boardgames": [
           {
             "id": "NUMBER", // Уникальный идентификатор
             "title": "STRING",
             "release_date": "DATE",
             "price": "STRING",
             "publishers_id": "NUMBER",
             "created_at": "TIMESTAMPZ",
             "updated_at": "TIMESTAMPZ"
           }
         ]
       }
       ```

     - Status Codes:
       - 200
       - 400

   - boardgames

     - Endpoint: GET /boardgames/:id
     - Params:

       ```
       id=NUMBER
       ```

     - Описание: Получить настольную игру по ID
     - Response:

       ```json
       {
         "total": "STRING",
         "boardgame": [
           {
             "id": "NUMBER", // Уникальный идентификатор
             "title": "STRING",
             "release_date": "DATE",
             "price": "STRING",
             "publishers_id": "NUMBER",
             "created_at": "TIMESTAMPZ",
             "updated_at": "TIMESTAMPZ"
           }
         ]
       }
       ```

     - Status Codes:
       - 200
       - 400
       - 404

3. Обновление

   - publishers

     - Endpoint: PUT /publishers/:id
     - Params:

       ```
       id=NUMBER
       ```

     - Описание: Обновление издателя по ID
     - Request Body:

       ```json
       {
         "name": "STRING", // Необязательно
         "foundation_date": "DATE", // Необязательно
         "tin": "NUMERIC(12, 0)", // Необязательно
         "rating": "NUMBER" // Необязательно
       }
       ```

     - Response:

       ```json
       {
         "id": "NUMBER", // Уникальный идентификатор
         "name": "STRING",
         "foundation_date": "DATE",
         "tin": "STRING",
         "rating": "NUMBER",
         "created_at": "TIMESTAMPZ",
         "updated_at": "TIMESTAMPZ"
       }
       ```

     - Status Codes:
       - 200
       - 400
       - 404

   - boardgames

     - Endpoint: PUT /boardgames/:id
     - Params:

       ```
       id=NUMBER
       ```

     - Описание: Обновление настольной игры по ID
     - Request Body:

       ```json
       {
         "title": "STRING", // Необязательно
         "release_date": "DATE", // Необязательно
         "price": "NUMERIC(12, 0)", // Необязательно
         "publishers_id": "NUMBER" // Необязательно
       }
       ```

     - Response:

       ```json
       {
         "id": "NUMBER", // Уникальный идентификатор
         "title": "STRING",
         "release_date": "DATE",
         "price": "STRING",
         "publishers_id": "NUMBER",
         "created_at": "TIMESTAMPZ",
         "updated_at": "TIMESTAMPZ"
       }
       ```

     - Status Codes:
       - 200
       - 400
       - 404

4. Удаление

   - publishers

     - Endpoint: DELETE /publishers/:id
     - Params:

       ```
       id=NUMBER
       ```

     - Описание: Удаление издателя по ID
     - Status Codes:
       - 204
       - 400

   - boardgames

     - Endpoint: DELETE /boardgames/:id
     - Params:

       ```
       id=NUMBER
       ```

     - Описание: Удаление настольной игры по ID
     - Status Codes:
       - 204
       - 400

---
