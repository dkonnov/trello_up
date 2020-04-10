<template>
  <div class="row">
    <div class="col-md-12 ml-auto mr-auto text-center">
      <div class="profile">
        <div class="avatarcenter">
          <div class="wow fadeInDown" data-wow-duration="2s">
            <div class="avatar">
              <div class="icon img-raised icon-primary">
                <img
                  src="img/dmitry.jpg"
                  alt="Trello Up"
                  class="img-raised rounded-circle img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-8 ml-auto mr-auto text-center">
          <div class="icon icon-primary"></div>
          <div class="section-description">
            <h3 class="info-title">
              Проще и эффективней
            </h3>
            <h5 class="description">
              Trello Up это личный кабинет для ваших клиентов интегрированный с Trello. Клиенты
              подают заявки в своем личном кабинете, а ваши специалисты работают с ними в Trello.
              При этом создание учетных записей для пользователей в самом Trello не трубуется.<br /><br />
            </h5>
            <div class="wow fadeInUp" data-wow-duration="2s" data-wow-delay="4s">
              <center>
                <router-link to="/registration">
                  <button type="button" class="btn btn-info btn-round">
                    {{ $t('message.createAccaut') }}
                  </button>
                </router-link>
              </center>
              <br /><br />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-5 ml-auto">
          <div
            class="card card-background"
            style="background-image:url('img/slides/christina-wocintechchat-com-TR0GG3U81i0-unsplash.jpg')"
          >
            <a href="#pablo"></a>
            <div class="card-body">
              <a href="#pablo">
                <h3 class="card-title">Подача заявок</h3>
              </a>
              <p class="card-description">
                Проще чем когда либо
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-5 mr-auto">
          <div class="info info-horizontal">
            <div class="icon icon-info">
              <i class="material-icons">dashboard</i>
            </div>
            <div class="description">
              <h4 class="info-title">Личный кабинет</h4>
              <p class="description">
                В личном кабинете пользователь сможет видеть все поданные заявки и уже исполненные.
              </p>
            </div>
          </div>
          <div class="info info-horizontal">
            <div class="icon icon-success">
              <i class="material-icons">view_day</i>
            </div>
            <div class="description">
              <h4 class="info-title">Карточки задач</h4>
              <p class="description">
                На карточках задач отображается все необходимое: срок, стадия, исполнитель, файлы
              </p>
            </div>
          </div>
          <div class="info info-horizontal">
            <div class="icon icon-primary">
              <i class="material-icons">code</i>
            </div>
            <div class="description">
              <h4 class="info-title">Короткие ссылки</h4>
              <p class="description">
                Просто отправье короткую ссылку на подключенную доску пользовотелю или разместите ее
                у себя на сайте.
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-md-5 ml-auto">
          <div class="info info-horizontal">
            <div class="icon icon-rose">
              <i class="material-icons">timeline</i>
            </div>
            <div class="description">
              <h4 class="info-title">Несколько досок Trello</h4>
              <p class="description">
                Создайте несколько досок в зависимости от направлений вашей работы и подключите их.
              </p>
            </div>
          </div>

          <div class="info info-horizontal">
            <div class="icon icon-info">
              <i class="material-icons">group</i>
            </div>
            <div class="description">
              <h4 class="info-title">Переписка с исполнителями</h4>
              <p class="description">
                Обсуждайте задачу прям на карточке с задачей. Ваша переписка будет именно по этой
                задаче и не будет смешан с другими диалогами.
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-5 mr-auto">
          <div
            class="card card-background"
            style="background-image:url('img/slides/irfan-simsar-wxWulfjN-G0-unsplash.jpg')"
          >
            <a href="#pablo"></a>
            <div class="card-body">
              <a href="#pablo">
                <h3 class="card-title">Интеграция с Trello</h3>
              </a>
              <p class="card-description">
                Исполнители работают в Trello используя концепкию Kanban.<br />Эффективность на
                выстоте!
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-lg-4 col-md-10 ml-auto mr-auto text-left">
          <h3 class="info-title">Следеющие шаги</h3>
          <h6 class="description">Мы работаем над этими функциями</h6>
          <div class="card-pricing">
            <ul>
              <li>
                <i class="material-icons text-danger">schedule</i> Прикрепленние файлов
                пользователем
              </li>
              <li>
                <i class="material-icons text-danger">schedule</i> Шаблонные ответы пользователю по
                задачам
              </li>
              <li>
                <i class="material-icons text-danger">schedule</i> Уведомление пользователя об
                изменениях
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div />
    </div>
  </div>
</template>

<style scoped>
.info {
  padding: 0;
  text-align: left;
}

.card-pricing ul li {
  color: #999;
  text-align: left;
  padding: 6px 0px;
  border-bottom: 1px solid hsla(0, 0%, 60%, 0);
}
.card-pricing ul {
  list-style: none;
  padding: 0;
  max-width: 360px;
  margin: 10px auto;
}
.avatarcenter {
  justify-content: center;
  display: flex;
}
.avatar {
  width: 160px;
  height: 160px;
  overflow: hidden;
  border-radius: 50%;
  margin-top: -80px;
}
.img-raised {
  box-shadow: 0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
}
.rounded-circle {
  border-radius: 50% !important;
}
.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>
