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
        style="display: flex;  align-items: center; flex-direction: column;"
      >
        <mainCard />
      </div>
    </div>
    <modalWindow />
  </div>
</template>

<script>
import modalWindow from "./components/modalWindow";
import mainMenu from "./components/mainMenu";
import mainCard from "./views/mainCard";

export default {
  name: "app",
  components: {
    modalWindow,
    mainMenu,
    mainCard
  }
};
</script>

<style lang="sass">
.login-page
  .page-header
    .container
      padding-top: 15vh
.fa-instagram
  color: #125688
.fa-facebook-square
  color: #3b5998
.fa-whatsapp
  color: #128c7e
.fa-vk
  color: #0099e5
.fa-phone-square
  color: #68217a
.fa-envelope
  color: #239ab9
.wa-white
	color: white
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
