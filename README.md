# Trello Up

<img src="http://dkonnov.ru/github/trello-up.gif">

Это простое web-приложение, которое позволяет организовать службу подачи заявок в очень простом и понятном интерфейсе, которые попадают на доску в Trello, где команда поддержки сможет сними работать.
При этом, специалист, подавший заявку, видит ход ее исполнения, комментарии, а также специалиста, который работает над ее испролнением.

#### Это может быть заявка на техническую поддержку, а может быть просто заказ канцелярии.

#### Если вам нужна простая заявочная система, необходимо просто и быстро организовать работу с заявками, то Trello Up ваш выбор.

Удобство данного подхода дает Вам следующее:

- не требуется создавать пользователей в самом Trello. Доступ к доске имеют только исполнители.
- вам сразу видно кто подал задачу
- если задача принята по телефону, то вы можете выбрать заявителя из списка текущих пользователей, а заявитель сможет наблюдать за ней в интерфейсе приложения.

Trello Up является исключительно клиентским приложением и не хранит на стороне клиента и самого приложения ни какой информаци о заявках.

### [Демо](http://trello-up.ru/)

### Установка

1. Скачайте готовый билд Trello Up или создайте его самостоятельно
2. Внесите соответствующие изменения в файл trello-config.js
3. В приложении принято, что самой доской Trello пользуется команда, а Trello Up клиенты создающие задачи.
4. Для того, что на новых карточках появились имена пользователей, которые подали заявку, необходимо добавить компонент Trello Castom Fields.
   Зайдя в приложение пользователи могут регистрироваться, заполнять данные о себе (Имя, телефон, местоположение)

# Changelog

## [0.8] - 2020-04

### Added

- Добавлен раздел поддержки
- Добавлен раздел с возможностями
- Авторизация по коротким ссылкам

### Improved

- Код приведен в соответсвие с Airbnb JavaScript Style Guide

### Fixed

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
