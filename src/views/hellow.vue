/* eslint-disable max-len */
<template>
  <div class="row">
    <div class="col-md-12 ml-auto mr-auto text-center">
      <div class="row">
        <div class="col-md-8 ml-auto mr-auto text-center">
          <br /><br />
          <div class="section-description wow fadeIn" data-wow-duration="2s" data-wow-delay="1s">
            <h3 class="info-title">
              {{ $t('message.hollow.bottom1') }}
            </h3>
            <h5 class="description" v-html="$t('message.hollow.bottom2')"><br /><br /></h5>
            <div
              v-if="!this.$store.state.user.uid"
              class="wow fadeInUp"
              data-wow-duration="3s"
              data-wow-delay="2s"
            >
              <center>
                <router-link to="/registration">
                  <button type="button" class="btn btn-info btn-round">
                    {{ $t('message.createAccaut') }}
                  </button>
                </router-link>
              </center>
            </div>
            <br /><br />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-5 ml-auto">
          <div
            class="card card-background wow fadeInLeft"
            data-wow-duration="3s"
            data-wow-delay="2s"
            style="background-image: url('img/slides/christina-wocintechchat-com-unsplash.jpg');"
          >
            <a href="#pablo"></a>
            <div class="card-body">
              <a href="#pablo">
                <h3 class="card-title">{{ $t('message.hollow.reviewBlock11') }}</h3>
              </a>
              <p class="card-description">
                {{ $t('message.hollow.reviewBlock12') }}
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
              <h4 class="info-title">{{ $t('message.hollow.label11') }}</h4>
              <p class="description">
                {{ $t('message.hollow.label12') }}
              </p>
            </div>
          </div>
          <div class="info info-horizontal wow fadeIn" data-wow-duration="2s" data-wow-delay="2s">
            <div class="icon icon-success">
              <i class="material-icons">view_day</i>
            </div>
            <div class="description">
              <h4 class="info-title">{{ $t('message.hollow.label21') }}</h4>
              <p class="description">
                {{ $t('message.hollow.label22') }}
              </p>
            </div>
          </div>
          <div class="info info-horizontal wow fadeIn" data-wow-duration="2s" data-wow-delay="3s">
            <div class="icon icon-primary">
              <i class="material-icons">code</i>
            </div>
            <div class="description">
              <h4 class="info-title">{{ $t('message.hollow.label31') }}</h4>
              <p class="description">
                {{ $t('message.hollow.label32') }}
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
              <h4 class="info-title">{{ $t('message.hollow.label41') }}</h4>
              <p class="description">
                {{ $t('message.hollow.label42') }}
              </p>
            </div>
          </div>

          <div class="info info-horizontal wow fadeIn" data-wow-duration="2s" data-wow-delay="2s">
            <div class="icon icon-info">
              <i class="material-icons">group</i>
            </div>
            <div class="description">
              <h4 class="info-title">{{ $t('message.hollow.label51') }}</h4>
              <p class="description">
                {{ $t('message.hollow.label52') }}
              </p>
            </div>
          </div>
          <div class="info info-horizontal wow fadeIn" data-wow-duration="2s" data-wow-delay="3s">
            <div class="icon icon-primary">
              <i class="material-icons">phonelink</i>
            </div>
            <div class="description">
              <h4 class="info-title">{{ $t('message.hollow.label61') }}</h4>
              <p class="description">
                {{ $t('message.hollow.label62') }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-5 mr-auto">
          <div
            class="card card-background wow fadeInRight"
            data-wow-duration="3s"
            data-wow-delay="1s"
            style="background-image: url('img/slides/you-x-ventures-Oalh2MojUuk-unsplash.jpg');"
          >
            <a href="#pablo"></a>
            <div class="card-body">
              <a href="#pablo">
                <h3 class="card-title">{{ $t('message.hollow.reviewBlock21') }}</h3>
              </a>
              <p class="card-description">
                {{ $t('message.hollow.reviewBlock22') }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr v-show="this.$store.state.user.uid" />
      <div
        v-show="!this.$store.state.user.uid"
        class="card card-background wow fadeIn"
        data-wow-duration="2s"
        data-wow-delay="1s"
        style="background-image: url('./img/backgrounds/kara-eads-1506373-unsplash.jpg');"
      >
        <div class="container" style="padding-top: 0vh;">
          <div class="row">
            <div class="col-md-6 ml-auto mr-auto">
              <div class="text-center wow fadeInUp" data-wow-duration="3s" data-wow-delay="1s">
                <h3 class="title">{{ $t('message.hollow.try1') }}</h3>
                <p class="card-description">
                  {{ $t('message.hollow.try2') }}
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
                  <form @submit.prevent="login">
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
                              v-model="email"
                              @input="$v.email.$touch"
                              placeholder="Your Email..."
                              class="form-control"
                            /></div
                        ></span>
                      </div>
                      <div class="col-lg-4 col-md-6">
                        <button
                          type="submit"
                          class="btn btn-primary btn-block"
                          :disabled="$v.$invalid || loading"
                        >
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
              {{ $t('message.hollow.reviewsTitle') }}
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
              <h6 class="card-category text-success">{{ $t('message.hollow.review') }}</h6>
              <h4 class="card-title">
                <a href="#pablo">"{{ $t('message.hollow.review11') }}"</a>
              </h4>
              <p class="card-description">
                {{ $t('message.hollow.review12') }}
              </p>
            </div>
            <div class="card-footer">
              <div class="author">
                <img src="/img/faces/christian.jpg" class="avatar img-raised rounded-circle" />
                <span>{{ $t('message.hollow.review13') }}</span>
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
              <h6 class="card-category text-success">{{ $t('message.hollow.review') }}</h6>
              <h4 class="card-title">
                <a href="#pablo">"{{ $t('message.hollow.review21') }}"</a>
              </h4>
              <p class="card-description">
                {{ $t('message.hollow.review22') }}
              </p>
            </div>
            <div class="card-footer">
              <div class="author">
                <img src="/img/faces/camp.jpg" class="avatar img-raised rounded-circle" />
                <span>{{ $t('message.hollow.review23') }}</span>
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
              <h6 class="card-category text-success">{{ $t('message.hollow.review') }}</h6>
              <h4 class="card-title">
                <a href="#pablo">"{{ $t('message.hollow.review31') }}"</a>
              </h4>
              <p class="card-description">
                {{ $t('message.hollow.review32') }}
              </p>
            </div>
            <div class="card-footer">
              <div class="author">
                <img src="/img/faces/marc.jpg" class="avatar img-raised rounded-circle" />
                <span>{{ $t('message.hollow.review33') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <h6 class="card-category text-info">
        <a href="mailto:info@trello-up.com">info@trello-up.com</a>
      </h6>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators/';
import * as fb from 'firebase';
// eslint-disable-next-line
import { eventEmitter } from '../main.js';

export default {
  name: 'Hellow',
  data() {
    return {
      email: '',
      loading: false
    };
  },
  validations: {
    email: {
      email,
      required
    }
  },
  methods: {
    login() {
      this.loading = true;
      fb.auth()
        .signInWithEmailAndPassword('try@mail.com', '123456')
        .then(user => {
          // запишем данные о пользователе
          this.$store.commit('setUser', user.user);
          // получим дополнительные данные о пользователе
          this.$store.dispatch('getUserData');
          this.$store.dispatch('getBackgrounds');
          this.$router.push('/-M4IAbwAzaCd7TS6LjIR');
        })
        .catch(error => {
          // отобразим ошибку логина
          this.loading = false;
          eventEmitter.$emit('showMessage', error.message);
        });
    }
  }
};
</script>

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
