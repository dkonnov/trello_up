<template>
  <div id="app">
    <mainMenu />
    <div
      id="backgroundDiv"
      class="page-header header-filter"
      style="background-size: cover; background-position: top center;"
    >
      <!-- Desktop -->
      <div
        class="container wow fadeIn"
        data-wow-duration="2s"
        style="display: flex; align-items: center; flex-direction: column; padding-top: 15vh;"
      >
        <div class="card" style="width: unset;">
          <div class="card-body" style="margin-bottom: 0px;">
            <transition name="fade" mode="out-in">
              <router-view />
            </transition>
          </div>
        </div>
      </div>
    </div>
    <modal />
    <background />
  </div>
</template>

<script>
import modal from './components/modal.vue';
import mainMenu from './components/mainMenu.vue';
import background from './components/background.vue';

export default {
  name: 'App',
  components: {
    modal,
    mainMenu,
    background,
  },
  computed: {
    background() {
      return this.$store.state.userData.background;
    },
  },
  mounted() {
    // установим фоновое изображение
    document.getElementById('backgroundDiv').style.backgroundImage =
      "url('img/backgrounds/patrick-tomasso-1272187-unsplash.jpg')";
  },
  watch: {
    background: (value) => {
      // сменим фон, если он изменился в state
      document.getElementById(
        'backgroundDiv'
      ).style.backgroundImage = `url('img/backgrounds/${value}')`;
    },
  },
};
</script>

<style lang="sass">
.fade-enter-active
  transition-property: opacity
  transition-duration: 0.25s
.fade-leave-active
  transition-property: opacity
  transition-duration: 0.25s
.fade-enter-active
  transition-delay: 0.25s

.fade-enter,
.fade-leave-active
  opacity: 0

.form-control-feedback
	position: absolute
	right: 0
	z-index: 200
	display: block
	width: 24px
	height: 24px
	line-height: 24px
	text-align: center
	pointer-events: auto
	background: transparent
	padding-left: 0px
	padding-right: 0px
  border: 0px
	border-left-width: 0px
	border-left-style: solid
	border-top-width: 0px
	border-top-style: solid
	border-right-width: 0px
	border-right-style: solid
	border-bottom-width: 0px
	border-bottom-style: solid
</style>
