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
          <li class="dropdown nav-item" v-if="this.$store.state.currentUser">
            <a
              class="dropdown-toggle nav-link"
              aria-expanded="false"
              href="#"
              data-toggle="dropdown"
            >
              <i class="material-icons">face</i>
              {{ this.$store.getters.currentUserName }}
              <div class="ripple-container"></div
            ></a>
            <div class="dropdown-menu dropdown-with-icons">
              <a class="dropdown-item" href="./">
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
export default {
  name: "mainMenu",
  data() {
    return {};
  },
  methods: {},
  created() {},
  beforeMount() {}
};
</script>
