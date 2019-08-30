# Trello Up
 
<img src="http://dkonnov.ru/github/trello_up.png">

Это простое приложение, которое позволяет организовать службу подачи заявок в очень простом и понятном интерфейсе, которые затем попадают на доску в Trello, где команда поддержки сможет сними работать.
При этом, специалист, подавший заявку, видит ход ее исполнения.
Если не нужна сложня заявочная система, необходимо просто и быстро организовать работу с заявками на поддержу, то Trello Up ваш выбор.

Trello Up является исключительно клиентским приложением и не хранит на стороне клиента и самого приложения ни какой информации.

### Демо dkonnov.ru/github/trello_up

### Установка (черновик)
1. Скачайте готовый билд Trello Up или создайте его самостоятельно
2. Внесите соответствующие изменения в файл trello-config.js
3. В приложении принято, что самой доской Trello пользуется команда, а Trello Up клиенты создающие задачи. 
Как же завести клиентов в систему, не создавая им учетных записей в Trello. Для этого приложению необходим компонент Trello Castom Fields. После установки его в Trello  в качестве дополнения создайте список. Элементы списка и будут являтся пользователями, создающими заявки. 
Удобство данного подхода дает следующее: 
- вам не надо создавать пользователей в самом Trello
- вам сразу видно кто подал задачу без дополнительных комментариев
- если задача принята по телефону и из списка выбран пользователь, подавший задачу, то эта задача будет отражена у него в Trello Up
- вы имеете возможность подсчета статистики по пользователям, подающим задачи.
