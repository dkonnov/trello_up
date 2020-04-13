<template>
  <div class="row">
    <div class="col-md-12 ml-auto mr-auto text-center">
      <div class="row">
        <div class="col-md-8 ml-auto mr-auto text-center">
          <br /><br />
          <div class="section-description wow fadeIn" data-wow-duration="2s" data-wow-delay="1s">
            <h3 class="info-title">
              {{ $t('message.hollowLabelBottom1') }}
            </h3>
            <h5 class="description">{{ $t('message.hollowLabelBottom2') }}<br /><br /></h5>
            <div class="wow fadeInUp" data-wow-duration="3s" data-wow-delay="1s">
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
            class="card card-background wow fadeInLeft"
            data-wow-duration="3s"
            data-wow-delay="1s"
            style="background-image:url('img/slides/christina-wocintechchat-com-TR0GG3U81i0-unsplash.jpg')"
          >
            <a href="#pablo"></a>
            <div class="card-body">
              <a href="#pablo">
                <h3 class="card-title">Подача заявок</h3>
              </a>
              <p class="card-description">
                Проще чем когда-либо
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-5 mr-auto">
          <div class="info info-horizontal wow fadeIn" data-wow-duration="2s" data-wow-delay="1s">
            <div class="icon icon-info">
              <i class="material-icons">dashboard</i>
            </div>
            <div class="description">
              <h4 class="info-title">{{ $t('message.hollowLabel11') }}</h4>
              <p class="description">
                {{ $t('message.hollowLabel12') }}
              </p>
            </div>
          </div>
          <div class="info info-horizontal wow fadeIn" data-wow-duration="2s" data-wow-delay="2s">
            <div class="icon icon-success">
              <i class="material-icons">view_day</i>
            </div>
            <div class="description">
              <h4 class="info-title">{{ $t('message.hollowLabel21') }}</h4>
              <p class="description">
                {{ $t('message.hollowLabel22') }}
              </p>
            </div>
          </div>
          <div class="info info-horizontal wow fadeIn" data-wow-duration="2s" data-wow-delay="3s">
            <div class="icon icon-primary">
              <i class="material-icons">code</i>
            </div>
            <div class="description">
              <h4 class="info-title">{{ $t('message.hollowLabel31') }}</h4>
              <p class="description">
                {{ $t('message.hollowLabel32') }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-md-5 ml-auto">
          <div class="info info-horizontal wow fadeIn" data-wow-duration="2s" data-wow-delay="1s">
            <div class="icon icon-rose">
              <i class="material-icons">timeline</i>
            </div>
            <div class="description">
              <h4 class="info-title">{{ $t('message.hollowLabel41') }}</h4>
              <p class="description">
                {{ $t('message.hollowLabel42') }}
              </p>
            </div>
          </div>

          <div class="info info-horizontal wow fadeIn" data-wow-duration="2s" data-wow-delay="2s">
            <div class="icon icon-info">
              <i class="material-icons">group</i>
            </div>
            <div class="description">
              <h4 class="info-title">{{ $t('message.hollowLabel51') }}</h4>
              <p class="description">
                {{ $t('message.hollowLabel52') }}
              </p>
            </div>
          </div>
          <div class="info info-horizontal wow fadeIn" data-wow-duration="2s" data-wow-delay="3s">
            <div class="icon icon-primary">
              <i class="material-icons">phonelink</i>
            </div>
            <div class="description">
              <h4 class="info-title">{{ $t('message.hollowLabel61') }}</h4>
              <p class="description">
                {{ $t('message.hollowLabel62') }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-5 mr-auto">
          <div
            class="card card-background wow fadeInRight"
            data-wow-duration="3s"
            data-wow-delay="1s"
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

      <div
        class="card card-background wow fadeIn"
        data-wow-duration="2s"
        data-wow-delay="1s"
        style="background-image: url('./img/backgrounds/kara-eads-1506373-unsplash.jpg'); "
      >
        <div class="container" style="padding-top: 0vh;">
          <div class="row">
            <div class="col-md-6 ml-auto mr-auto">
              <div class="text-center">
                <h3 class="title">Попробуйте без регистрации</h3>
                <p class="card-description">
                  Все еще есть сомнения? Попробуйте демо кабинет!
                </p>
              </div>
              <div class="card card-raised card-form-horizontal">
                <div
                  class="card-body"
                  style="min-height: 0px; padding-top: 30px; padding-bottom: 30px;"
                >
                  <form method="" action="">
                    <div class="row">
                      <div class="col-lg-8 col-md-6 ">
                        <span class="bmd-form-group"
                          ><div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="material-icons">mail</i>
                              </span>
                            </div>
                            <input
                              type="email"
                              value=""
                              placeholder="Your Email..."
                              class="form-control"
                            /></div
                        ></span>
                      </div>
                      <div class="col-lg-4 col-md-6 ">
                        <button type="button" class="btn btn-primary btn-block">Войти</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <hr />

      <div class="row">
        <div class="col-lg-4 col-md-10 ml-auto mr-auto text-left">
          <h3 class="info-title">Следующие шаги</h3>
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
      </div> -->

      <div class="row">
        <div class="col-md-8 ml-auto mr-auto text-center">
          <div class="section-description">
            <h3 class="info-title">
              Что о нас пишут
            </h3>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-duration="2s" data-wow-delay="1s">
          <div class="rotating-card-container manual-flip" style="margin-bottom: 30px;">
            <div class="card card-rotate">
              <div class="front">
                <div class="card-body">
                  <h5 class="card-category card-category-social text-success">
                    <i class="fa fa-newspaper-o"></i> Отзыв
                  </h5>
                  <h4 class="card-title">
                    <a href="#pablo"
                      >"Организовать техническую подержку получилось в кратчайшие сроки."</a
                    >
                  </h4>
                  <p class="card-description">
                    Don't be scared of the truth because we need to restart the human foundation in
                    truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but
                    the back is...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-duration="2s" data-wow-delay="2s">
          <div class="rotating-card-container manual-flip" style="margin-bottom: 30px;">
            <div class="card card-rotate">
              <div class="front">
                <div class="card-body">
                  <h5 class="card-category card-category-social text-success">
                    <i class="fa fa-newspaper-o"></i> Отзыв
                  </h5>
                  <h4 class="card-title">
                    <a href="#pablo">"Принимаем заявки на канцелярю."</a>
                  </h4>
                  <p class="card-description">
                    Don't be scared of the truth because we need to restart the human foundation in
                    truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but
                    the back is...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-duration="2s" data-wow-delay="4s">
          <div class="rotating-card-container manual-flip" style="margin-bottom: 30px;">
            <div class="card card-rotate">
              <div class="front">
                <div class="card-body">
                  <h5 class="card-category card-category-social text-success">
                    <i class="fa fa-newspaper-o"></i> Отзыв
                  </h5>
                  <h4 class="card-title">
                    <a href="#pablo">"Возможностей даже больше чем нужно"</a>
                  </h4>
                  <p class="card-description">
                    Don't be scared of the truth because we need to restart the human foundation in
                    truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but
                    the back is...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div />
    </div>
  </div>
</template>

<style scoped>
.info {
  padding: 0;
  text-align: left;
}
.card-description {
  color: white !important;
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
