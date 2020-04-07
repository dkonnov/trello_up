# Trello Up

<img src="http://dkonnov.ru/github/trello-up.gif">

Это простое web-приложение, которое позволяет организовать службу подачи заявок в очень простом и понятном интерфейсе, которые попадают на доску в Trello, где команда поддержки сможет сними работать.
При этом, специалист, подавший заявку, видит ход ее исполнения, комментарии, а также специалиста, который работает над ее испролнением.

#### Это может быть заявка на техническую поддержку, а может быть просто заказ канцелярии.

#### Если вам нужна простая заявочная система, необходимо просто и быстро организовать работу с заявками, то Trello Up ваш выбор.

Удобство данного подхода дает Вам следующее:

- у пользователей есть свой личный кабинет по задачам. Простой и функциональный.
- у исполнителей все поданные задачи на одной канбан доске.
- если задача принята по телефону, то вы можете выбрать заявителя из списка текущих пользователей, а заявитель сможет наблюдать за ней в своем личном кабинете (если ранее там регистрировался).

Trello Up является исключительно клиентским приложением и не хранит на стороне клиента и самого приложения ни какой информаци о заявках.

### [Попробовать](http://trello-up.ru/)

# Changelog

## [0.8] - 2020-04

### Added

- Функция "Закрыть задачу" (задача помещается в архив)
- Отображение архивных задач (отсортированы, заблокирован функционал комментирования архивных задач)
- Добавлен раздел поддержки
- Добавлен раздел с возможностями
- Авторизация по коротким ссылкам

### Improved

- Код приведен в соответсвие с Airbnb JavaScript Style Guide
- Создание выпадающего списка при подключении доски (для того, чтобы пользователь сам не настраивал этот момент)
- В том случае, если пользователь при подключении доски не ввел имя и описание, то они добавляются. Имя из данных доски, описание на стандартное.
- При подключении доски теперь нужно вводить ссылку на доску, а не ID доски (думаю так будет удобней)
- При подключении доски проверка на уникальность подключения

### Fixed

- исправлены ошибки оформления
- исправлена ошибка отображения стадий при переключении страниц с задачами
- удаление единственной доски
- исправлены ошибки оформления

## [0.7] - 2020-03

### Added

- Возможность подключения нескольких досок и управления ими
- Переход по короткой ссылке к конкретной доске
- Поддержка сессии пользователя
- Добавлен начальный экран
- Проверка на доступность доски при подключении
- Проверка на наличие Custom Filed при продключении
- Проверка на наличие Custom Filed при использовании

### Improved

- Теперь связь с Trello создается только при добавлении первой задачи пользователем на доске

### Fixed

- Исправлено отображение логотипа при скролле
- Исравлены переходы по маршрутам "Назад"
- Исправлены мелкие проблемы с интерфейсом

## [0.6] - 2020-02

### Added

- Возможность выбора фона
- Возможность добавление комментария пользователем, который поставил задачу
- Бейдж со сроком исполнения
- Отображене файлов, которые были прикреплены к карточке в Trello
- Передалан роутинг с целью внедрения нового функционала

## [0.5] - 2020-01

### Added

- Регистрация пользователя
- Авторизация пользователя
- Восстановление пароля пользователя
- Смена пароля пользователя
- Привязка пользователя к Trello через Castom Fields
- Раздел с личным кабинетом
- Вывод комментариев исполнителей на карточки задач

### Changed

- Улучшен вывод информации в правой колонке с задачами
- Благодаря внутреннему хранилищу улучшена скорость работы приложения
