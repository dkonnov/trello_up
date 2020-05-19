/* eslint-disable consistent-return */
<template>
  <div class="card" style="width: 100%;" :class="stageClosed">
    <div class="stageLine" :class="stageColor" />
    <div class="card-body">
      <h4 class="card-title">{{ card.name }}</h4>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ stage }}
        <span class="badge badge-pill" style="margin-top: -1px;" :class="dueColor" v-if="card.due"
          >{{ $t('message.deadline') }}: {{ deadline }}
        </span>
      </h6>
      <p class="card-text">
        {{ card.desc }}
      </p>
      <!-- комментарии -->
      <div class="commentBlock">
        <template v-for="(comment, commentIndex) in commentsOnCard(card.id)">
          <div :key="commentIndex" class="comment" v-if="getmemberBollean(comment.idMemberCreator)">
            <div style="display: inline-block; float: left; margin: 0px;">
              <a href="#" data-toggle="tooltip" :title="getmemberTooltip(comment.idMemberCreator)">
                <img
                  :src="getAvatarURL(comment.idMemberCreator)"
                  width="24px"
                  class="img-raised rounded-circle img-fluid"
                  style="margin-right: 10px;"
                />
              </a>
            </div>
            <div>
              {{ comment.data.text }}
            </div>
          </div>
          <div :key="comment" class="comment" v-if="!getmemberBollean(comment.idMemberCreator)">
            <div style="display: block; float: right; margin: 0 -10px 0 10px;">
              <a href="#" data-toggle="tooltip" :title="getmemberTooltip(comment.idMemberCreator)">
                <img
                  :src="getAvatarURL(comment.idMemberCreator)"
                  width="24px"
                  class="img-raised rounded-circle img-fluid"
                  style="margin-right: 10px;"
                />
              </a>
            </div>
            <div style="text-align: right;">
              {{ comment.data.text }}
            </div>
          </div>
        </template>
      </div>
      <div align="right">
        <form @submit.prevent="sendComment(card.id)" v-if="!card.closed">
          <div class="form-group">
            <input type="text" v-model="comment" id="name" class="form-control" />
          </div>
        </form>
        <!-- Аватарки участников -->
        <div v-for="(idMember, memberIndex) in card.idMembers" :key="memberIndex">
          <div style="display: block; float: right; margin: 2px;">
            <a href="#" data-toggle="tooltip" :title="getmemberTooltip(idMember)">
              <img
                :src="getAvatarURL(idMember)"
                width="30px"
                class="img-raised rounded-circle img-fluid"
              />
            </a>
          </div>
        </div>
        <!-- Файлы -->
        <div style="display: block; float: right; margin: 2px;">
          <button
            class="btn btn-secondary btn-fab btn-fab-mini btn-round"
            type="button"
            id="dropdownFiles"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            v-if="card.badges.attachments > 0"
            @click="getAttach(card.id)"
          >
            <i class="material-icons">attach_file</i>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownFiles">
            <div v-for="(file, fileindex) in files" :key="fileindex">
              <a class="dropdown-item" :href="file.url" target="new">{{ file.name }}</a>
            </div>
          </div>
        </div>
        <!-- Меню -->
        <div v-if="!card.closed" style="display: block; float: right; margin: 2px;">
          <button
            class="btn btn-secondary btn-fab btn-fab-mini btn-round"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="material-icons">more_horiz</i>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <!-- <a class="dropdown-item" href="#">Добавить файл</a> -->
            <a class="dropdown-item" href="#" @click="toArchive(card.id)">{{
              $t('message.closeTask')
            }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { eventEmitter } from '../main.js';

const key = 'd02290573e1e3121c00a8bcb3bd08a1f';
const token = '57b6866c777bc31f1f6ca58c1a9a540873221292bbb1cf7ccfdd027d08c54349';

export default {
  props: {
    card: Object,
    index: Number,
  },
  data() {
    return {
      comment: '',
      files: [],
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    toArchive(value) {
      eventEmitter.$emit(
        'showMessage',
        'Вы действительно ходите переместить данную задачу в архив? Исполнители больше ее не увидят.',
        // eslint-disable-next-line func-names
        function () {
          axios
            .put(`https://api.trello.com/1/cards/${value}?closed=true&key=${key}&token=${token}`)
            .then(() => {
              this.$store.dispatch('getCards');
            });
        }
      );
    },
    sendComment(cardId) {
      axios
        .post(
          `https://api.trello.com/1/cards/${cardId}/actions/comments?text=${this.comment}&key=${key}&token=${token}`
        )
        .then(() => {
          this.$store.dispatch('getComments');
          this.comment = '';
        });
    },
    getAvatarURL(value) {
      let url;
      this.members.forEach((item) => {
        if (value === item.id) {
          if (item.avatarUrl) {
            url = `${item.avatarUrl}/30.png`;
          } else {
            url = 'img/placeholder.jpg';
          }
        }
      });
      return url;
    },
    getmemberBollean(value) {
      let tooltip;
      this.members.forEach((item) => {
        if (value === item.id) {
          if (item.fullName === 'Trello Up User') {
            tooltip = false;
          } else {
            tooltip = true;
          }
        }
      });
      return tooltip;
    },
    getmemberTooltip(value) {
      let tooltip;
      this.members.forEach((item) => {
        if (value === item.id) {
          if (item.fullName === 'Trello Up User') {
            tooltip = 'Я';
          } else {
            tooltip = item.fullName;
          }
        }
      });
      return tooltip;
    },
    commentsOnCard(value) {
      const newArr = this.$store.state.comments.filter((arr) => {
        let res;
        if (arr.data.card.id === value) {
          res = arr;
        }
        return res;
      });
      newArr.sort((a, b) => (a.date > b.date ? 1 : -1)); // отсортируем
      return newArr;
    },
    getAttach(value) {
      // выводит список файлов прикрепленных к карточке
      axios
        .get(`https://api.trello.com/1/cards/${value}/attachments/?key=${key}&token=${token}`)
        .then((response) => {
          this.files = response.data;
        });
    },
  },
  computed: {
    deadline() {
      let res;
      if (this.cards[this.index].due) {
        const date = new Date(Date.parse(this.cards[this.index].due));
        const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
        const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        const formattedDate = `${day}.${month}.${date.getFullYear()}`;
        res = formattedDate;
      }
      return res;
    },
    dueColor() {
      // окрашиает бейдж в красный, если просроченно, или в синий если нет
      let res;
      if (this.cards[this.index].due) {
        if (Date.now() > Date.parse(this.cards[this.index].due)) {
          res = 'badge-danger';
        } else {
          res = 'badge-info';
        }
      }
      return res;
    },
    stage() {
      let res;
      if (this.cards[this.index].closed === true) {
        res = 'В архиве';
      } else {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.lists.length; i++) {
          if (this.lists[i].id === this.cards[this.index].idList) {
            res = this.lists[i].name;
          }
        }
      }
      return res;
    },
    stageColor() {
      let res;
      if (this.cards[this.index].closed === true) {
        res = 'stageArchiv';
      } else {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.lists.length; i++) {
          if (this.lists[i].id === this.cards[this.index].idList) {
            res = `stage${i}`;
          }
        }
      }
      return res;
    },
    stageClosed() {
      let res;
      if (this.cards[this.index].closed === true) {
        res = 'closedOpacity';
      }
      return res;
    },
    cards() {
      return this.$store.state.cards;
    },
    lists() {
      return this.$store.state.lists;
    },
    members() {
      return this.$store.state.members;
    },
  },
};
</script>

<style scoped>
.material-icons {
  color: #999;
}
.commentBlock {
  background-color: white;
}
.comment {
  background-color: #fafafa;
  border-radius: 12px;
  font-size: 75%;
  margin-top: 0.25rem;
}
.closedOpacity {
  opacity: 0.6;
}
.stageLine {
  width: 3px;
  height: 100%;
  background-color: #701c7e;
  position: absolute;
  border-radius: 3px 0 0 3px;
}
.stageArchiv {
  background-color: gray;
}
.stage0 {
  background-color: #39843c;
}
.stage1 {
  background-color: #701c7e;
}
.stage2 {
  background-color: #c27400;
}
.stage3 {
  background-color: #008697;
}
.stage4 {
  background-color: #e11b0c;
}
</style>
