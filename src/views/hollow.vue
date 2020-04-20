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
            <div class="wow fadeInUp" data-wow-duration="3s" data-wow-delay="2s">
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
            data-wow-delay="2s"
            style="
              background-image: url('img/slides/christina-wocintechchat-com-TR0GG3U81i0-unsplash.jpg');
            "
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
              <i class="material-icons">chrome_reader_mode</i>
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
              <i class="material-icons">dashboard</i>
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
            style="background-image: url('img/slides/irfan-simsar-wxWulfjN-G0-unsplash.jpg');"
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
        style="background-image: url('./img/backgrounds/kara-eads-1506373-unsplash.jpg');"
      >
        <div class="container" style="padding-top: 0vh;">
          <div class="row">
            <div class="col-md-6 ml-auto mr-auto">
              <div class="text-center wow fadeInUp" data-wow-duration="3s" data-wow-delay="1s">
                <h3 class="title">{{ $t('message.hollowTry1') }}</h3>
                <p class="card-description">
                  {{ $t('message.hollowTry2') }}
                </p>
              </div>
              <div
                class="card card-raised card-form-horizontal wow fadeIn"
                data-wow-duration="3s"
                data-wow-delay="3s"
              >
                <div
                  class="card-body"
                  style="min-height: 0px; padding-top: 30px; padding-bottom: 30px;"
                >
                  <form method="" action="">
                    <div class="row">
                      <div class="col-lg-8 col-md-6">
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
                      <div class="col-lg-4 col-md-6">
                        <button type="button" class="btn btn-primary btn-block">
                          {{ $t('message.singIn') }}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-8 ml-auto mr-auto text-center">
          <div class="section-description wow fadeInUp" data-wow-duration="3s" data-wow-delay="2s">
            <h3 class="info-title">
              {{ $t('message.hollowReviewsTitle') }}
            </h3>
          </div>
        </div>
      </div>
      <div class="row">
        <div
          class="col-md-12 col-lg-4 wow fadeInLeft review"
          data-wow-duration="2s"
          data-wow-delay="2s"
        >
          <div class="card">
            <div class="card-body">
              <h6 class="card-category text-success">{{ $t('message.hollowReview') }}</h6>
              <h4 class="card-title">
                <a href="#pablo">"{{ $t('message.hollowReview11') }}"</a>
              </h4>
              <p class="card-description">
                {{ $t('message.hollowReview12') }}
              </p>
            </div>
            <div class="card-footer">
              <div class="author">
                <img src="/img/faces/christian.jpg" class="avatar img-raised rounded-circle" />
                <span>{{ $t('message.hollowReview13') }}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="col-md-12 col-lg-4 wow fadeIn review"
          data-wow-duration="2s"
          data-wow-delay="2s"
        >
          <div class="card">
            <div class="card-body">
              <h6 class="card-category text-success">{{ $t('message.hollowReview') }}</h6>
              <h4 class="card-title">
                <a href="#pablo">"{{ $t('message.hollowReview21') }}"</a>
              </h4>
              <p class="card-description">
                {{ $t('message.hollowReview22') }}
              </p>
            </div>
            <div class="card-footer">
              <div class="author">
                <img src="/img/faces/camp.jpg" class="avatar img-raised rounded-circle" />
                <span>{{ $t('message.hollowReview23') }}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="col-md-12 col-lg-4 wow fadeInRight review"
          data-wow-duration="2s"
          data-wow-delay="2s"
        >
          <div class="card">
            <div class="card-body">
              <h6 class="card-category text-success">{{ $t('message.hollowReview') }}</h6>
              <h4 class="card-title">
                <a href="#pablo">"{{ $t('message.hollowReview31') }}"</a>
              </h4>
              <p class="card-description">
                {{ $t('message.hollowReview32') }}
              </p>
            </div>
            <div class="card-footer">
              <div class="author">
                <img src="/img/faces/marc.jpg" class="avatar img-raised rounded-circle" />
                <span>{{ $t('message.hollowReview33') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <h6 class="card-category text-info">
        <a href="mailto:info@trello-up.ru">info@trello-up.ru</a>
      </h6>
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
.review .card-description {
  color: #999 !important;
}
.autor {
  margin-right: 10px;
}
.avatar {
  margin-top: -5px;
}
.card .author .avatar {
  margin-right: 10px;
}
.img-raised {
  box-shadow: 0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
}
.rounded-circle {
  border-radius: 50% !important;
}
</style>
