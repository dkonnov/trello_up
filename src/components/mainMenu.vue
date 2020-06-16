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
            v-if="this.$store.state.userData.cf"
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
              <template v-for="(board, index) in cf">
                <router-link :to="`/${board.board_id}`" :key="index">
                  <a class="dropdown-item" href="#">
                    <i
                      class="material-icons epmty-icon"
                      v-show="board.board_id != currentRoute"
                    ></i>
                    <i class="material-icons" v-show="board.board_id == currentRoute">check</i>
                    {{ board.name }}
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
              <a class="dropdown-item" @click="changeLang('en')">
                <i class="material-icons epmty-icon" v-show="this.$i18n.locale != 'en'"></i>
                <i class="material-icons" v-show="this.$i18n.locale == 'en'">check</i> English
              </a>
              <a class="dropdown-item" @click="changeLang('ru')">
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
</style>
