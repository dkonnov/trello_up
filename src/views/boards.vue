<template>
  <div class="row">
    <div class="col-md-6">
      <addBoard />
      <br />
    </div>

    <div class="col-md-6 rightCard">
      <div class="info" v-if="boards.length == 0">
        <div class="icon icon-primary">
          <i class="material-icons">chat</i>
        </div>
        <h4 class="info-title">{{ $t('message.addBoard.conBoards') }}</h4>
        <p>{{ $t('message.addBoard.desc') }}</p>
      </div>
      <div v-if="boards.length > 0">
        <h4 class="title" style="color: #3c4858;">{{ $t('message.addBoard.conBoards') }}</h4>
        <template v-for="(board, index) in boards">
          <div class="card wow fadeInUp" style="width: 100%;" data-wow-duration="2s" :key="index">
            <div class="card-body">
              <h4 class="card-title">{{ board.name }}</h4>
              <h6 class="card-subtitle mb-2 text-muted">ID {{ board.board }}</h6>
              {{ board.desc }}
              <div align="right">
                <div style="display: block; float: right; margin: 2px;">
                  <router-link :to="board.board">
                    <button
                      class="btn btn-secondary btn-fab btn-fab-mini btn-round"
                      type="button"
                      :title="$t('message.addBoard.title1')"
                    >
                      <i class="material-icons">keyboard_arrow_right</i>
                    </button>
                  </router-link>
                </div>
                <div style="display: block; float: right; margin: 2px;">
                  <button
                    class="btn btn-secondary btn-fab btn-fab-mini btn-round"
                    type="button"
                    @click="deleteBoard(board.id)"
                    :title="$t('message.addBoard.title2')"
                  >
                    <i class="material-icons">link_off</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import * as fb from 'firebase';
import addBoard from './addBoard.vue';

export default {
  name: 'Boards',
  components: {
    addBoard
  },
  methods: {
    deleteBoard(id) {
      this.$store.dispatch('deleteBoard', id);
    }
  },
  computed: {
    boards() {
      return this.$store.state.boards.boards;
    }
  },
  beforeMount() {
    // своебразная защита роута
    fb.auth().onAuthStateChanged(user => {
      if (!user) {
        this.$router.push('/login/back');
      }
    });
  }
};
</script>

<style scoped>
.row {
  min-height: 650px;
}
.material-icons {
  color: #999;
}
.mainCard {
  margin-top: -25px;
  /* min-height: 600px; Минимальная высота */
}
.rightCard {
  background-color: rgb(243, 241, 241);
  /* min-height: 600px; */
  border-radius: 3px;
  top: -15px;
  margin-bottom: -30px;
  bottom: 0px;
  padding-left: 30px;
  padding-right: 30px;
  margin-right: 0px;
}
</style>
