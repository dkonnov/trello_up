<template>
  <nav
    class="navbar navbar-color-on-scroll navbar-transparent fixed-top navbar-expand-lg"
    color-on-scroll="100"
    id="sectionsNav"
  >
    <div class="container">
      <div class="navbar-translate">
        <router-link to="/" class="navbar-brand">
          <h4 class="card-title" style="color: unset;" :title="pagedesc">
            {{ pagename }}
          </h4>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="sr-only">Toggle navigation</span>
          <span class="navbar-toggler-icon" />
          <span class="navbar-toggler-icon" />
          <span class="navbar-toggler-icon" />
        </button>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li
            class="nav-item"
            style="margin-top: 22px; margin-right: 15px;"
            v-if="!this.$store.state.user.uid"
          >
            <router-link
              to="/registration"
              style="a.color: unset;"
              class="nav-link"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
              >{{ $t('message.createAccaut') }}</router-link
            >
          </li>
          <li
            class="nav-item"
            style="margin-top: 22px; margin-right: 15px;"
            v-if="this.$store.state.user.uid"
          >
            <router-link
              to="/-M4IAbwAzaCd7TS6LjIR"
              style="a.color: unset;"
              class="nav-link"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
              >{{ $t('message.support') }}</router-link
            >
          </li>
          <li
            class="nav-item"
            style="padding: 0 5px 0 15px; margin-top: 22px; margin-right: 15px;"
            v-if="!this.$store.state.user.uid"
          >
            <router-link to="/login">
              <a
                class="btn btn-success btn-block btn-round"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
                href="#"
              >
                <i class="material-icons">meeting_room</i>
                {{ $t('message.singIn') }}
              </a>
            </router-link>
          </li>
          <li
            class="dropdown nav-item"
            style="margin-top: 22px; margin-right: 15px;"
            v-if="this.$store.state.user.uid"
          >
            <a
              class="dropdown-toggle nav-link"
              aria-expanded="false"
              href="#"
              data-toggle="dropdown"
            >
              {{ $t('message.menuMyTasks') }}
              <div class="ripple-container" />
            </a>
            <div class="dropdown-menu dropdown-with-icons">
              <a class="dropdown-item" v-show="!cf" href="#" disabled="true"> Пока тут пусто</a>
              <template v-for="(board, index) in cf">
                <router-link :to="`/${board.board_id}`" :key="index">
                  <a class="dropdown-item" href="#">
                    <div>
                      <i
                        class="material-icons epmty-icon"
                        v-show="board.board_id != currentRoute"
                      ></i>
                      <i class="material-icons" v-show="board.board_id == currentRoute">check</i>
                      {{ board.name }}
                    </div>
                    <div style="padding-left: 15px; width:100%; text-align: right;">
                      <span
                        v-show="countOfNotifications(board.board)"
                        class="badge badge-pill badge-info"
                        >{{ countOfNotifications(board.board) }}</span
                      >
                    </div>
                  </a>
                </router-link>
              </template>
            </div>
          </li>
          <li
            class="dropdown nav-item"
            style="margin-top: 22px; margin-right: 15px;"
            v-if="this.$store.state.user.uid"
          >
            <a
              class="dropdown-toggle nav-link"
              aria-expanded="false"
              href="#"
              data-toggle="dropdown"
            >
              <i class="material-icons">face</i>
              {{ this.$store.getters.userName }}
              <div class="ripple-container" />
            </a>
            <div class="dropdown-menu dropdown-with-icons">
              <a class="dropdown-item" @click="showAccaunt" href="#">
                <i class="material-icons">assignment_ind</i>
                {{ $t('message.accaut.main') }}
              </a>
              <a class="dropdown-item" @click="showBackgrounds" href="#">
                <i class="material-icons">photo_size_select_actual</i>
                {{ $t('message.background') }}
              </a>
              <a class="dropdown-item" @click="showBoards" href="#">
                <i class="material-icons">chrome_reader_mode</i>
                {{ $t('message.boards.menu') }}
              </a>
              <a class="dropdown-item" @click="singOut" href="#">
                <i class="material-icons">meeting_room</i>
                {{ $t('message.singOut') }}
              </a>
            </div>
          </li>
          <li
            v-if="this.$store.state.user.uid"
            class="dropdown nav-item"
            style="margin-top: 22px; margin-right: 15px;"
          >
            <a
              class="nav-link"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="material-icons">notifications</i>
              <span class="notification" v-show="countNotification">{{ countNotification }}</span>
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" v-show="!countNotification" href="#" disabled="true">
                Пока тут пусто</a
              >
              <template v-for="(item, index) of this.$store.state.notifications">
                <a class="dropdown-item" href="#" :key="index">
                  Новый комментарий к задаче:<br />
                  <i>{{ item.data.text }}</i></a
                >
              </template>
            </div>
          </li>
          <li class="dropdown nav-item" style="margin-top: 22px; margin-right: 15px;">
            <a
              class="dropdown-toggle nav-link"
              aria-expanded="false"
              href="#"
              data-toggle="dropdown"
            >
              <i class="material-icons">language</i>
              <div class="ripple-container" />
            </a>
            <div class="dropdown-menu dropdown-with-icons">
              <a class="dropdown-item" href="#" @click="changeLang('en')">
                <i class="material-icons epmty-icon" v-show="this.$i18n.locale != 'en'"></i>
                <i class="material-icons" v-show="this.$i18n.locale == 'en'">check</i> English
                {{ $i18n.locale }}
              </a>
              <a class="dropdown-item" href="#" @click="changeLang('ru')">
                <i class="material-icons epmty-icon" v-show="this.$i18n.locale != 'ru'"></i>
                <i class="material-icons" v-show="this.$i18n.locale == 'ru'">check</i> Русский
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import * as fb from 'firebase';
import { eventEmitter } from '../main.js';

export default {
  name: 'MainMenu',
  methods: {
    countOfNotifications(value) {
      const res = this.$store.state.notifications.filter(e => e.data.board.shortLink === value);
      console.log(`${value}`);
      return res.length;
    },
    changeLang(value) {
      this.$i18n.locale = value;
    },
    showAccaunt() {
      this.$router.push('/accaunt');
    },
    showBackgrounds() {
      eventEmitter.$emit('showBackgroundForm');
    },
    showBoards() {
      this.$router.push('/boards');
    },
    singOut() {
      fb.auth()
        .signOut()
        .then(() => {
          eventEmitter.$emit('showMessage', this.$t('message.singOutModal'));
        })
        .catch(error => {
          eventEmitter.$emit('showMessage', `${error.message}`);
        });
      this.$store.dispatch('singOut');
      // eslint-disable-next-line operator-linebreak
      document.getElementById('backgroundDiv').style.backgroundImage =
        "url('img/backgrounds/patrick-tomasso-1272187-unsplash.jpg')";
      this.$router.push('/');
    }
  },
  computed: {
    cf() {
      return this.$store.state.userData.cf;
    },
    countNotification() {
      return this.$store.state.notifications.length;
    },
    pagename() {
      return this.$store.state.boards.currentBoard.name || 'Trello Up';
    },
    currentRoute() {
      return this.$store.state.boards.currentBoard.id;
    },
    pagedesc() {
      return this.$store.state.boards.currentBoard.desc;
    }
  }
};
</script>

<style lang="sass" scoped>
.epmty-icon
  width: 24px
.notification
  position: absolute
  top: 5px
  border: 0px
  right: 10px
  font-size: 9px
  background: #f44336
  color: #fff
  min-width: 20px
  padding: 0 5px
  height: 20px
  border-radius: 10px
  text-align: center
  line-height: 19px
  vertical-align: middle;
  display: block
</style>
