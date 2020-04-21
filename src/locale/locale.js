// переводы
const messages = {
  en: {
    message: {
      createAccaut: 'Create accaunt',
      accaut: {
        main: 'Accaunt',
        label1: 'You must enter your name so that the specialist knows how to contact you.',
        label2: 'In order to be able to contact you, enter your phone number.',
        label3: '',
      },
      singIn: 'Sing In',
      back: 'Back',
      save: 'Save',
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
      changePassword: 'Change password',
      hollow: {
        bottom1: 'Accepting tasks instant in Trello!',
        bottom2:
          'Trello Up is a personal area for your customers integrated with Trello.<br>Clients submit taks in their personal area, and your specialists work with them in Trello. At the same time, creating user accounts for Trello itself is not a hassle.',
        label11: 'Clients personal area in 2 minutes',
        label12:
          'In the personal area, the user will be able to see all submitted tasks and already completed.',
        label21: 'Task cards',
        label22:
          'On the task cards everything you need is displayed: deadline, stage, performer, files.',
        label31: 'Short links',
        label32:
          'Just send a short link to the connected board to the user or post it on your website.',
        label41: 'A few Trello boards',
        label42:
          'Create several boards depending on the areas of work in your organization and connect them.',
        label51: 'Discuss with performers',
        label52:
          'Discuss the task directly on the card with the task. Your discuss  will be precisely on this task and will not be mixed with other dialogs.',
        label61: 'On all devices',
        label62:
          'We tried to make our service open equally well on all devices! Both on large monitors and on small smartphones.',
        try1: 'Try without registration',
        try2: 'Still in doubt? Try a demo!',
        reviewsTitle: 'What customers write about us',
        review: 'Review',
        reviewBlock11: 'Easier than ever',
        reviewBlock12: 'Fast, easy and instant in Trello',
        reviewBlock21: 'Integration with Trello',
        reviewBlock22: 'Performer work at Trello using the Kanban concept. Efficiency on top!',
        review11: 'We managed to organize technical support as soon as possible',
        review12:
          'We are a small company, but we have enough clients for support. We implemented this solution quickly. The users didn’t even have any questions how to create ticket for support  and learn about their changes.',
        review13: 'Andrey Mikhailov',
        review21: 'We accept applications for stationery in our organization',
        review22:
          'Being distracted by every phone call or reviewing an application on paper is time consuming. It brings chaos to work! And then all the need is on one kanban board.',
        review23: 'Lisa Andreeva',
        review31: 'All you need and more!',
        review32:
          'This is not just a personal area for applications. Here is the whole power of the kanban from Trello. Users submit tasks and we can already set up the necessary automation on our board, schedule work on the calendar, etc. This is a really good combination.',
        revisew33: 'Mark Elizarov',
      },
    },
  },
  ru: {
    message: {
      createAccaut: 'Регистрация',
      accaut: {
        main: 'Аккаунт',
        label1: 'Необходимо ввести ваше имя, чтобы специалист знал как к вам обратиться.',
        label2: 'Для того чтобы с вами могли связаться, укажите свой номер телефона.',
      },
      singIn: 'Вход',
      back: 'Назад',
      save: 'Сохранить',
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
      changePassword: 'Сменить пароль',
      hollow: {
        bottom1: 'Принимайте заявки сразу в Trello!',
        bottom2:
          'Trello Up это личный кабинет для ваших клиентов интегрированный с Trello.<br>Клиенты подают заявки в своем личном кабинете, а ваши специалисты работают с ними в Trello. При этом создание учетных записей для пользователей в самом Trello не трубуется.',
        label11: 'Личный кабинет клиента за 2 минуты',
        label12:
          'В личном кабинете пользователь сможет видеть все поданные заявки и уже исполненные.',
        label21: 'Карточки задач',
        label22:
          'На карточках задач отображается все необходимое: срок, стадия, исполнитель, файлы.',
        label31: 'Короткие ссылки',
        label32:
          'Просто отправье короткую ссылку на подключенную доску пользовотелю или разместите ее у себя на сайте.',
        label41: 'Несколько досок Trello',
        label42:
          'Создайте несколько досок в зависимости от направлений работы в вашей организации и подключите их.',
        label51: 'Переписка с исполнителями',
        label52:
          'Обсуждайте задачу прям на карточке с задачей. Ваша переписка будет именно по этой задаче и не будет смешан с другими диалогами.',
        label61: 'На всех устройствах',
        label62:
          'Мы постарались сделать так, чтобы наш сервис открывался одинаково хорошо на всех устройствах! Как на больших мониторах, так и на маленьких смартфонах.',
        try1: 'Попробуйте без регистрации',
        try2: 'Все еще есть сомнения? Попробуйте демо кабинет!',
        reviewsTitle: 'Что клиенты пишут о нас',
        review: 'Отзыв',
        reviewBlock11: 'Проще чем когда-либо',
        reviewBlock12: 'Быстро, просто и сразу в Trello',
        reviewBlock21: 'Интеграция с Trello',
        reviewBlock22:
          'Исполнители работают в Trello используя концепкию Kanban. Эффективность на выстоте!',
        review11: 'Нам удалось организовать техническую поддержку в кратчайшие сроки',
        review12:
          'Мы небольшая компания, но клиентов на поддержке у нас достаточно. Это решение мы внедрили быстро. У пользователей даже вопросов не возникло как оформлять заявки и узнавать об их изменении.',
        review13: 'Андрей Михайлов',
        review21: 'Принимаем заявки на канцтовары в нашей организации',
        review22:
          'Отвлекаться на каждый телефонный звонок или рассматривать заявку на бумаге отнимает много времени. Это приносит хаос в работу! А тут вся потребность на одной канбан доске.',
        review23: 'Лиза Андреева',
        review31: 'Все что нужно и даже больше!',
        review32:
          'Это не просто личный кабинет для заявок. Тут вся мощь канбана от Trello. Пользователи подают заявки, а мы уже можем настроить у себя на доске необходимую автоматизацию, запланировать работы в календаре и т.д. Это действительно удачное сочетание.',
        review33: 'Марк Елизаров',
      },
    },
  },
};

// экспортируем переводы
export default messages;
