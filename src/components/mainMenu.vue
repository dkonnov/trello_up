<template>
  <nav
    class="navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg"
    color-on-scroll="100"
    id="sectionsNav"
  >
    <div class="container">
      <div class="navbar-translate" style=" position: relative;">
        <a class="navbar-brand" href="#">
          <h4 class="card-title" style="color:white">Trello Up</h4>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="sr-only">Toggle navigation</span>
          <span class="navbar-toggler-icon"></span>
          <span class="navbar-toggler-icon"></span>
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="dropdown nav-item" v-if="this.$store.state.user.uid">
            <a
              class="dropdown-toggle nav-link"
              aria-expanded="false"
              href="#"
              data-toggle="dropdown"
            >
              <i class="material-icons">face</i>
              {{ this.$store.getters.userName }}
              <div class="ripple-container"></div
            ></a>
            <div class="dropdown-menu dropdown-with-icons">
              <a class="dropdown-item" @click="showAccaunt" href="#">
                <i class="material-icons">assignment_ind</i> Аккаунт
              </a>
              <a class="dropdown-item" @click="showBackgrounds" href="#">
                <i class="material-icons">photo_size_select_actual</i> Фон
              </a>
              <a class="dropdown-item" @click="showBoards" href="#">
                <i class="material-icons">chrome_reader_mode</i> Доски
              </a>
              <a class="dropdown-item" @click="singOut" href="#">
                <i class="material-icons">meeting_room</i> Выход
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { eventEmitter } from "./../main";
import * as fb from "firebase";

export default {
  name: "mainMenu",
  methods: {
    showAccaunt() {
      this.$router.push("/accaunt");
    },
    showBackgrounds() {
      eventEmitter.$emit("showBackgroundForm");
    },
    showBoards() {
      this.$router.push("/boards");
    },
    singOut() {
      fb.auth()
        .signOut()
        .then(() => {
          eventEmitter.$emit("showMessage", "Надеюсь ты скоро вернешься :(");
        })
        .catch(error => {
          eventEmitter.$emit(
            "showMessage",
            "Чтото пошло не так :( " + error.message
          );
        });
      this.$store.dispatch("singOut");
      document.getElementById("backgroundDiv").style.backgroundImage =
        "url('img/backgrounds/patrick-tomasso-1272187-unsplash.jpg')";
      this.$router.push("/");
    }
  }
};
</script>
