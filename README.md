# Trello Up
 
<img src="http://dkonnov.ru/github/trello_up.png">

Это простое web-приложение, которое позволяет организовать службу подачи заявок в очень простом и понятном интерфейсе, которые  попадают на доску в Trello, где команда поддержки сможет сними работать.
При этом, специалист, подавший заявку, видит ход ее исполнения, комментарии, а также специалиста, который работает над ее испролнением.

#### Это может быть заявка на техническую поддержку, а может быть просто заказ канцелярии. 

#### Если вам нужна простая заявочная система, необходимо просто и быстро организовать работу с заявками, то Trello Up ваш выбор.

Удобство данного подхода дает Вам следующее: 
- не требуется создавать пользователей в самом Trello. Доступ к доске имеют только исполнители.
- вам сразу видно кто подал задачу
- если задача принята по телефону, то вы можете выбрать заявителя из списка текущих пользователей, а заявитель сможет наблюдать за ней  в интерфейсе приложения.

Trello Up является исключительно клиентским приложением и не хранит на стороне клиента и самого приложения ни какой информаци о заявках.

### [Демо](http://dkonnov.ru/github/trello_up)

### Установка
1. Скачайте готовый билд Trello Up или создайте его самостоятельно
2. Внесите соответствующие изменения в файл trello-config.js
3. В приложении принято, что самой доской Trello пользуется команда, а Trello Up клиенты создающие задачи. 
4. Для того, что на новых карточках появились имена пользователей, которые подали заявку, необходимо добавить компонент Trello Castom Fields. 
Зайдя в приложение пользователи могут регистрироваться, заполнять данные о себе (Имя, телефон, местоположение)
