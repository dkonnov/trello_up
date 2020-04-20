// переводы
const messages = {
  en: {
    message: {
      createAccaut: 'Create accaunt',
      accaut: 'Accaunt',
      singIn: 'Sing In',
      back: 'Back',
      singOut: 'Sing Out',
      boards: 'Boards',
      background: 'Background',
      features: 'features',
      support: 'support',
      email: 'Email',
      emailLabel: 'You must enter the email address you used when create accaunt.',
      emailLabelInRegistration: 'You must enter an email address that is not in the system.',
      passwordLabel: 'Minimum 6 characters.',
      forgotPassword: 'Forgot password',
      hollowLabelBottom1: 'Accepting tasks is easier than ever!',
      hollowLabelBottom2:
        'Trello Up is a personal area for your customers integrated with Trello. Clients submit taks in their personal area, and your specialists work with them in Trello. At the same time, creating user accounts for Trello itself is not a hassle.',
      hollowLabel11: 'Clients personal area in 2 minutes',
      hollowLabel12:
        'In the personal area, the user will be able to see all submitted tasks and already completed.',
      hollowLabel21: 'Task cards',
      hollowLabel22:
        'On the task cards everything you need is displayed: deadline, stage, performer, files.',
      hollowLabel31: 'Short links',
      hollowLabel32:
        'Just send a short link to the connected board to the user or post it on your website.',
      hollowLabel41: 'A few Trello boards',
      hollowLabel42:
        'Create several boards depending on the areas of work in your organization and connect them.',
      hollowLabel51: 'Discuss with performers',
      hollowLabel52:
        'Discuss the task directly on the card with the task. Your discuss  will be precisely on this task and will not be mixed with other dialogs.',
      hollowLabel61: 'On all devices',
      hollowLabel62:
        'We tried to make our service open equally well on all devices! Both on large monitors and on small smartphones.',
      hollowTry1: 'Try without registration',
      hollowTry2: 'Still in doubt? Try a demo!',
      hollowReviewsTitle: 'What customers write about us',
      hollowReview: 'Review',
      hollowReview11: 'We managed to organize technical support as soon as possible',
      hollowReview12:
        'We are a small company, but we have enough clients for support. We implemented this solution quickly. The users didn’t even have any questions how to create ticket for support  and learn about their changes.',
      hollowReview13: 'Andrey Mikhailov',
      hollowReview21: 'We accept applications for stationery in our organization',
      hollowReview22:
        'Being distracted by every phone call or reviewing an application on paper is time consuming. It brings chaos to work! And then all the need is on one kanban board.',
      hollowReview23: 'Lisa Andreeva',
      hollowReview31: 'All you need and more!',
      hollowReview32:
        'This is not just a personal area for applications. Here is the whole power of the kanban from Trello. Users submit tasks and we can already set up the necessary automation on our board, schedule work on the calendar, etc. This is a really good combination.',
      hollowRevisew33: 'Mark Elizarov',
    },
  },
  ru: {
    message: {
      createAccaut: 'Регистрация',
      accaut: 'Аккаунт',
      singIn: 'Вход',
      back: 'Назад',
      singOut: 'Выход',
      boards: 'Доски',
      background: 'Фон',
      features: 'Возможности',
      support: 'Поддержка',
      email: 'Электронная почта',
      emailLabel:
        'Необходимо ввести адрес электронной почты, который вы использовали при регистрации.',
      emailLabelInRegistration:
        'Необходимо ввести адрес электронной почты, которого нет в системе.',
      passwordLabel: 'Минимум 6 символов.',
      forgotPassword: 'Забыл пароль',
      hollowLabelBottom1: 'Принимайте заявки проще, чем когда-либо! ',
      hollowLabelBottom2:
        'Trello Up это личный кабинет для ваших клиентов интегрированный с Trello. Клиенты подают заявки в своем личном кабинете, а ваши специалисты работают с ними в Trello. При этом создание учетных записей для пользователей в самом Trello не трубуется.',
      hollowLabel11: 'Личный кабинет клиента за 2 минуты',
      hollowLabel12:
        'В личном кабинете пользователь сможет видеть все поданные заявки и уже исполненные.',
      hollowLabel21: 'Карточки задач',
      hollowLabel22:
        'На карточках задач отображается все необходимое: срок, стадия, исполнитель, файлы.',
      hollowLabel31: 'Короткие ссылки',
      hollowLabel32:
        'Просто отправье короткую ссылку на подключенную доску пользовотелю или разместите ее у себя на сайте.',
      hollowLabel41: 'Несколько досок Trello',
      hollowLabel42:
        'Создайте несколько досок в зависимости от направлений работы в вашей организации и подключите их.',
      hollowLabel51: 'Переписка с исполнителями',
      hollowLabel52:
        'Обсуждайте задачу прям на карточке с задачей. Ваша переписка будет именно по этой задаче и не будет смешан с другими диалогами.',
      hollowLabel61: 'На всех устройствах',
      hollowLabel62:
        'Мы постарались сделать так, чтобы наш сервис открывался одинаково хорошо на всех устройствах! Как на больших мониторах, так и на маленьких смартфонах.',
      hollowTry1: 'Попробуйте без регистрации',
      hollowTry2: 'Все еще есть сомнения? Попробуйте демо кабинет!',
      hollowReviewsTitle: 'Что клиенты пишут о нас',
      hollowReview: 'Отзыв',
      hollowReview11: 'Нам удалось организовать техническую поддержку в кратчайшие сроки',
      hollowReview12:
        'Мы небольшая компания, но клиентов на поддержке у нас достаточно. Это решение мы внедрили быстро. У пользователей даже вопросов не возникло как оформлять заявки и узнавать об их изменении.',
      hollowReview13: 'Андрей Михайлов',
      hollowReview21: 'Принимаем заявки на канцтовары в нашей организации',
      hollowReview22:
        'Отвлекаться на каждый телефонный звонок или рассматривать заявку на бумаге отнимает много времени. Это приносит хаос в работу! А тут вся потребность на одной канбан доске.',
      hollowReview23: 'Лиза Андреева',
      hollowReview31: 'Все что нужно и даже больше!',
      hollowReview32:
        'Это не просто личный кабинет для заявок. Тут вся мощь канбана от Trello. Пользователи подают заявки, а мы уже можем настроить у себя на доске необходимую автоматизацию, запланировать работы в календаре и т.д. Это действительно удачное сочетание.',
      hollowReview33: 'Марк Елизаров',
    },
  },
};

// экспортируем переводы
export default messages;
