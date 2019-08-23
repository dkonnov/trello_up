var userNameID = window.location.pathname.split('/')[2];
//var userNameID = window.location.pathname.split('/')[1];

var app = new Vue({
  el: '#app',
  data: {
    errorMessage: 'test',
    sendPassword: false,
    toRegistration: false,
    emailRegistrationOk: false,
    loginOk: false,
    passwordOk: false,
    password2Ok: false,
    nameRegistration: '',
    nameRegistrationOk: false,
    registrationOk: false,
    designForm: false,
    buttonLogin: true,
    mainnav: false,
    userName: '',
    mainCard: false,
    hollowCard: false,
    userInfoName: '',
    userInfoInstagram: '',
    userInfoSoc: '',
    avatar: false,
    deleteAvatarButton: false,
    userPageURL: '',
    buttonLogout: false,
    footer: false,
    addServiceFormOk: false,
    addServiceWindowName: '',
    addServiceFormName: '',
    userSeviceId: '',
    addServiceWindowButton: '',
    ifLogined: false
  },
  methods: {
    // Загрузка основной карточки
    loadMainCardInf: function(value){
      axios
      .get('my_entry.php?action=loadMainCard&userNameID=' + value)
      .then(response => {
        if (response.data.userInfoName) {
          // аватар 
          if (response.data.avatar){
            this.avatar = true;
            document.getElementById('avatarimg').src = 'img/avatars/' + response.data.avatar;
          }
          // фон
          document.getElementById("backgroundDiv").style.backgroundImage='url(\'img/backgrounds/'+response.data.background+'\')';
          // другие переменные
          this.mainCard = true; 
          this.hollowCard = false;
          this.mainCardName = response.data.userInfoName;         
          this.mainСardSpecialization = response.data.userInfoSpecialization;     
          this.mainCardAbout = response.data.userInfoAbout; 
          if (response.data.userLinkButtonAction === 'notShow'){this.linkButton = false;} else {this.linkButton = true;}
          this.linkButtonName = response.data.userLinkButtonName;
          this.linkButtonHref = response.data.userLinkButtonHref;
          this.footer = false;
        }
      });
      axios
      .get('my_entry.php?action=loadUserSocButtons&userNameID=' + value)
      .then(response => {
        this.userInfoSoc = response.data;
      });
      axios
      .get('my_entry.php?action=loadServices&userNameID=' + value)
      .then(response => {
        this.userServices = response.data;
      });
    },
    loadMainCard: function(){
      // this.mainCard = false; 
      var action = userNameID.split('=')[0];
      var value = userNameID.split('=')[1];
      // подтверждение аккаунта
      if (action == 'confirmed'){
        axios
          .get('my_entry.php?action=registration2&confirmed=' + value)
          .then(response => {
            if (response.data == 'confirmed'){
              this.errorMessage = 'Аккаунт подтвержден! Теперь вы можете выполнить вход и настроить его!';
              this.sendPassword = false;
              this.toRegistration = false;
              $("#modalWindow").modal('show');
            }
        });
        userNameID = '';
      }
      // var userNameID = 'dima'; <<< --- если нужно привязать к домену RU
      // если запрашивается страница пользователя, то выводим его настройки
      if ((userNameID || this.buttonLogout == true) && userNameID != 'my-entry'){
        if (!userNameID){
          axios
          .get('my_entry.php?action=getUserName')
          .then(response => {
            if (response.data){
              this.loadMainCardInf(response.data);
            }
          });
        };
        if (userNameID){
          this.loadMainCardInf(userNameID);
        }
      } 
      // если пользователь не задан, то выведем случайный фон и карточку приветствия
      else {
        axios
        .get('my_entry.php?action=getRandomBackground')
        .then(response => {
          document.getElementById("backgroundDiv").style.backgroundImage='url(\'img/backgrounds/'+response.data+'\')';
          this.hollowCard = true;
          this.mainCard = false; 
          this.footer = true;
        });
      }
    },
    // УСЛУГИ
    addServiceFormNameCheck: function(){
      if (this.addServiceFormName) {this.addServiceFormOk = true} else {this.addServiceFormOk = false}
    },
    showAddServiceForm: function(value){
      if (value){
        this.addServiceWindowName = "Услуга";
        this.addServiceWindowButton = "Сохранить";
        axios
          .get('my_entry.php?action=getService&id_service=' + value)
          .then(response => {
            this.addServiceFormName = response.data.name;
            this.addServiceFormDescription = response.data.description;
            this.addServiceFormPrice = response.data.price;
            this.userSeviceId = value;
            this.addServiceFormOk = true;
          });
      } else {
        this.addServiceWindowName = "Новая услуга";
        this.addServiceWindowButton = "Добавить";
        this.userSeviceId = '';
        this.addServiceFormOk = false;
        this.addServiceFormName = '';
        this.addServiceFormDescription = '';
        this.addServiceFormPrice = '';
      }
      $("#addServiceForm").modal('show');
    },
    addServiceFormSave: function(){
      axios
      .get('my_entry.php?action=addServiceFormSave&id_service=' + this.userSeviceId + '&name=' + this.addServiceFormName + '&description=' + this.addServiceFormDescription + '&price=' + this.addServiceFormPrice)
      .then(response => {
        $("#addServiceForm").modal('hide');
        this.loadMainCard();
        this.loadMainCard();
        this.addServiceFormName = '';
        this.addServiceFormDescription = '';
        this.addServiceFormPrice = '';
      });
    },
    deleteService: function(value){
      axios
      .get('my_entry.php?action=deleteService&id_service=' + value)
      .then(response => {
        if (response.data){
          this.errorMessage = 'Услуга удалена!';
          this.sendPassword = false;
          this.toRegistration = false;
          $("#modalWindow").modal('show');
          this.loadMainCard();
          this.loadMainCard();
        }
      });
    },
    // Сменить адрес страницы ОКНО
    changeLoginNameFormShow: function(){
      $("#changeLoginNameForm").modal('show');
    },
    changeLoginNameFormSave: function(){
      axios
      .get('my_entry.php?action=changeLoginNameFormSave&name=' + this.nameRegistration)
      .then(response => {
        $("#changeLoginNameForm").modal('hide');
        this.nameRegistration = '';
        this.errorMessage = 'Адрес вашей страницы изменен. Не забудьте поменять его в ваших социальных сетях и рекламных материалах!';
        this.sendPassword = false;
        this.toRegistration = false;
        $("#modalWindow").modal('show');
      });
    },
    // Предлжение о зоне RU
    showZoneRu: function(){
      this.errorMessage = 'Мы можем подобрать для вас адрес ИМЯ.RU и создать на нем вашу онлайн-визитку без логотипа My-Entry. Визитка будет выглядеть как ваш персональный сайт. Это повысит доверие к вам и увеличит конверсию. Стоимость услуги 1899р за год. Напишите нам на info@my-entry.ru и мы с вами свяжемся!';
      this.sendPassword = false;
      this.toRegistration = false;
      $("#modalWindow").modal('show');
    },
    // Форма основной кнопки связи
    showlinkButton: function(){
        axios
        .get('my_entry.php?action=showlinkButton')
        .then(response => {
          $('#sel').val(response.data.userLinkButtonAction);
        });
      $("#linkButton").modal('show');
    },
    showlinkButtonSave: function(){
      axios
      .get('my_entry.php?action=showlinkButtonSave&linkButtonAction=' + this.linkButtonAction + '&linkButtonName=' + this.linkButtonName)
      .then(response => {
        if (response.data){
          $("#linkButton").modal('hide');
          this.loadMainCard();
        }
      });
    },
    // Форма QR кода
    showQRCodeForm: function(){
      axios
      .get('my_entry.php?action=getUserName')
      .then(response => {
        if (response.data){
          document.getElementById('QRCodeImg').src = 'https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=http://my-entry.ru/' + response.data + '&chld=H&choe=UTF-8';
          this.userPageURL = 'http://my-entry.ru/' + response.data;
          $("#QRCode").modal('show');
        }
      });
    },
    // Форма "Аватар"
    showUserAvatar: function(){
      axios
      .get('my_entry.php?action=showUserAvatarGetSrc')
        .then(response => {
            if (response.data.avatar){
              document.getElementById('avatarimgform').src = 'img/avatars/' + response.data.avatar;
              this.deleteAvatarButton = true;
            } else {
              document.getElementById('avatarimgform').src = 'img/placeholder.jpg';
              this.deleteAvatarButton = false;
            }
            $("#userAvatar").modal('show');
        });
    },
    showUserAvatarIfLogined: function(){
      if (this.userName == userNameID){
        
        this.showUserAvatar();
      }
    },
    deleteAvatar: function(){
      axios
      .get('my_entry.php?action=deleteAvatar')
        .then(response => {
          document.getElementById('avatarimgform').src = 'img/placeholder.jpg';  
          document.getElementById('avatarimg').src = 'img/placeholder.jpg';
          this.avatar = false;
          this.deleteAvatarButton = false;
        });
    },
    // addAvatar
    addAvatar: function(){
      var formData = new FormData();
      var imagefile = document.querySelector('#userfile');
      formData.append("image", imagefile.files[0]);
      axios.post('my_entry.php?action=addAvatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        this.showUserAvatar();
        this.loadMainCard();
      });
        
    },
    // Форма "О себе"
    showUserInfo: function(){
      axios
      .get('my_entry.php?action=showUserInfo')
      .then(response => {
        this.userInfoName = response.data.userInfoName;
        this.userInfoSpecialization = response.data.userInfoSpecialization;
        this.userInfoAbout = response.data.userInfoAbout;
        $("#userInfo").modal('show');
      });
    },
    showUserInfoIfLogined: function(){
      if (this.userName == userNameID){
        this.showUserInfo();
      }
    },
    showUserInfoSave: function(){
      axios
      .get('my_entry.php?action=showUserInfoSave&userInfoName=' + this.userInfoName + '&userInfoSpecialization=' + this.userInfoSpecialization + '&userInfoAbout=' + this.userInfoAbout)
      .then(response => {
        $("#userInfo").modal('hide');
        this.loadMainCard();
      });
    },
    // Форма "Соцсети"
    showUserInfoSocial: function(){
      axios
      .get('my_entry.php?action=showUserInfoSocialForm')
      .then(response => {
        this.userInfoInstagram = response.data.userInfoInstagram;
        this.userInfoWhatsApp = response.data.userInfoWhatsApp;
        this.userInfoWhatsAppText = response.data.userInfoWhatsAppText;
        this.userInfoFacebook = response.data.userInfoFacebook;
        this.userInfoVK = response.data.userInfoVK;
        this.userInfoPhone = response.data.userInfoPhone;
        this.userInfoEMail = response.data.userInfoEMail;
        $("#userInfoSocial").modal('show'); 
      });
    },
    showUserInfoSocialSave: function(){
      axios
      .get('my_entry.php?action=showUserInfoSocialSave&userInfoInstagram=' + this.userInfoInstagram + '&userInfoWhatsApp=' + this.userInfoWhatsApp + '&userInfoEMail=' + this.userInfoEMail + '&userInfoPhone=' + this.userInfoPhone + '&userInfoWhatsAppText=' + this.userInfoWhatsAppText  + '&userInfoFacebook=' + this.userInfoFacebook  + '&userInfoVK=' + this.userInfoVK)
      .then(response => {
        $("#userInfoSocial").modal('hide');
        this.loadMainCard();
      });
    },
    // ФОН 
    changeBackground: function(fileName){
      document.getElementById("backgroundDiv").style.backgroundImage='url(\'img/backgrounds/'+fileName+'\')';
      axios
      .get('my_entry.php?action=changeBackground&backgroundfile=' + fileName)
      .then(response => {});
    },
    showDesignForm: function(){
      $("#designForm").modal('show');
      this.check();
    },
    // выход из учетно записи
    logout: function(){
      axios
      .get('my_entry.php?action=logout')
      .then(response => {
        this.buttonLogin = true;
        this.ifLogined = false;
        this.errorMessage = 'Надеемся вы скоро вернетесь!';
        this.sendPassword = false;
        this.toRegistration = false;
        $("#modalWindow").modal('show');
      }
      );
    },
    // ----- ФОРМЫ РЕГИСТРАЦИИ и АВТОРИЗАЦИИ -----
    // отправка забытого пароля
    sendPasswordF: function(){
      axios
      .get('my_entry.php?action=sendPassword&email=' + this.emailLogin)
      .then(response => {
          this.errorMessage = "На указанный вами адрес электронной почты отправлено письмо с новым паролем. Если оно не пришло проверьте папку 'Спам'"
          this.sendPassword = false;
          this.toRegistration = false;
          $("#modalWindow").modal('show');
      }
      );
    },
    // проверяет регистрационную форму, все ли галочки стоят
    checkRegistrationForm: function(){
      if (this.nameRegistrationOk == true && this.emailRegistrationOk == true && this.passwordOk == true && this.password2Ok == true){this.registrationOk = true;} else {this.registrationOk = false;}
    },
    // финальный этап регистрации
    registration: function(){
      axios
      .get('my_entry.php?action=registration&name=' + this.nameRegistration + '&email=' + this.emailRegistration + '&password=' + this.password)
      .then(response => {
          this.nameRegistration = '';
          this.emailRegistration = '';
          this.password = '';
          this.password2 = '';
          this.nameRegistrationOk = false;
          this.emailRegistrationOk = false;
          this.passwordOk = false;
          this.password2Ok = false;
          this.registrationOk = false;
          this.errorMessage = "Спасибо за регистрацию. На указанный вами адрес электронной почты отправлено письмо для подтверждения регистрации."
          this.sendPassword = false;
          this.toRegistration = false;
          $("#registrationForm").modal('hide');
          $("#modalWindow").modal('show');
        });
    },
    // проверяет требования к паролю (более 6 символов, кириллица, цифры, символы)
    passwordCheck: function(){
      if (/[0-9a-zA-Z!@#$%^&*]{6,}/.test(this.password)){this.passwordOk = true;} else {this.passwordOk = false;}
      if (this.password == this.password2){this.password2Ok = true;} else {this.password2Ok = false;}
      this.checkRegistrationForm();
    },
    // проверет равны ли пароли
    password2Check: function(){
      if (this.password == this.password2){this.password2Ok = true;} else {this.password2Ok = false;}
      this.checkRegistrationForm();
    },
    // проверяет есть ли уже такое имя
    nameRegistrationCheck: function(){
      if (/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/.test(this.nameRegistration)){
        axios
        .get('my_entry.php?action=nameRegistrationCheck&name=' + this.nameRegistration)
        .then(response => {
          if (response.data == true) {
            this.nameRegistrationOk = false;
          }
        });
        this.nameRegistrationOk = true;
      } else {
        this.nameRegistrationOk = false;
      }
      this.checkRegistrationForm();
    },
    // проверяет есть ли уже такой email
    emailRegistrationCheck: function(){
      if (checkEmail(this.emailRegistration))
      {
        axios
        .get('my_entry.php?action=emailRegistrationCheck&email=' + this.emailRegistration)
        .then(response => {
          if (response.data == true) {this.emailRegistrationOk = false;}
        });
        this.emailRegistrationOk = true;
      } else {this.emailRegistrationOk = false;}
      this.checkRegistrationForm();
    },
    // ЛОГИН
    emailLoginCheck: function () {
      if (checkEmail(this.emailLogin)) {this.loginOk = true;} else {this.loginOk = false;}
    },
    // показать форму авторизации
    showLoginForm: function () {
      $("#loginForm").modal('show');
    },
    showRegistrationForm: function () {$("#registrationForm").modal('show');},
    say: function (message) {
      axios
      .get('my_entry.php?action=authorization&email=' + this.emailLogin + '&password=' + this.password)
      .then(response => {
        if (response.data == false) {
          this.errorMessage = "Такой пользователь не обнаружен. Пожалуйста, проверьте вводимые данные и попробуйте снова. Если вы не зарегистрированы, то мы будем рады, если вы станете частью нашей системы.";
          this.sendPassword = false;
          this.toRegistration = true;
        } 
        if (response.data == 'restore') {
          this.errorMessage = "Пароль введен не верно. Если вы забыли пароль, то мы можем отправить его вам на электронную почту."
          this.sendPassword = true;
          this.toRegistration = false;
        }
        if (response.data == 'notconfirmed') {
          this.errorMessage = "Ваша учетная запись не подтверждена. Мы отправили на указанный при регистрации адрес электронной почты письмо для подтверждения аккаунта."
          this.sendPassword = false;
          this.toRegistration = false;
        }
        if (response.data == true) {
          $("#loginForm").modal('hide');
          this.errorMessage = "Привет! Рады видеть тебя!"
          axios
            .get('my_entry.php?action=getUserName')
            .then(response => {
            if (response.data) {this.userName = response.data;}
          });
          this.sendPassword = false;
          this.toRegistration = false;
          this.ifLogined = true;
          this.password = '';
          this.buttonLogout = true;
          this.buttonLogin = false;
          this.loadMainCard();
          // загрузим фон
          axios
          .get('my_entry.php?action=getBackground')
          .then(response => {
            if (response.data) {document.getElementById("backgroundDiv").style.backgroundImage='url(\'img/backgrounds/'+response.data+'\')';}
           });
        } 
        $("#modalWindow").modal('show');
      });
    },
    authorizationOnStart: function(){
      axios
      .get('my_entry.php?action=authorizationOnStart')
      .then(response => {
        if (response.data > 0){
          axios
            .get('my_entry.php?action=getUserName')
            .then(response => {
            if (response.data) {
              this.userName = response.data;
          }});
          this.buttonLogout = true;
          this.buttonLogin = false;
          if (this.userName == userNameID){
            this.ifLogined = true
          }
          this.loadMainCard();
          // загрузим фон
          axios
            .get('my_entry.php?action=getBackground')
            .then(response => {
            if (response.data) {document.getElementById("backgroundDiv").style.backgroundImage='url(\'img/backgrounds/'+response.data+'\')';}
          });
        }
      });
      
    }
  },
  beforeMount(){
    this.loadMainCard();
    this.authorizationOnStart();
    this.loadMainCard();
    this.mainnav = true;
 },
});

/*Check is email or not*/
function checkEmail(value){
  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
}



