<template>
  <div class="card wow fadeInUp" style="width: 100%;" data-wow-duration="2s">
    <div class="stageLine" :class="stageColor(index)"></div>
    <div class="card-body">
      <h4 class="card-title">{{ card.name }}</h4>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ stage(index) }}
      </h6>
      <p class="card-text">{{ card.desc }}</p>
      <!-- комментарии -->
      <div class="commentBlock">
        <template v-for="comment of commentsOnCard(card.id)">
          <div
            :key="comment"
            class="comment"
            v-if="getmemberBollean(comment.idMemberCreator)"
          >
            <div style="display: inline-block;float: left; margin: 0px;">
              <a
                href="#"
                data-toggle="tooltip"
                :title="getmemberTooltip(comment.idMemberCreator)"
              >
                <img
                  :src="getAvatarURL(comment.idMemberCreator)"
                  width="24px"
                  class="img-raised rounded-circle img-fluid"
                  style="margin-right: 10px"
                />
              </a>
            </div>
            <div>
              {{ comment.data.text }}
            </div>
          </div>
          <div
            :key="comment"
            class="comment"
            v-if="!getmemberBollean(comment.idMemberCreator)"
          >
            <div style="display: block;float: right; margin: 0 -10px 0 10px;">
              <a
                href="#"
                data-toggle="tooltip"
                :title="getmemberTooltip(comment.idMemberCreator)"
              >
                <img
                  :src="getAvatarURL(comment.idMemberCreator)"
                  width="24px"
                  class="img-raised rounded-circle img-fluid"
                  style="margin-right: 10px"
                />
              </a>
            </div>
            <div style="text-align: right">
              {{ comment.data.text }}
            </div>
          </div>
        </template>
      </div>
      <div align="right">
        <form @submit.prevent="sendComment(card.id)">
          <div class="form-group">
            <input
              type="text"
              v-model="comment"
              id="name"
              class="form-control"
            />
          </div>
        </form>
        <!-- Аватарки участников -->
        <div v-for="idMember of card.idMembers" :key="idMember">
          <div style="display: block;float: right; margin: 2px;">
            <a
              href="#"
              data-toggle="tooltip"
              :title="getmemberTooltip(idMember)"
            >
              <img
                :src="getAvatarURL(idMember)"
                width="30px"
                class="img-raised rounded-circle img-fluid"
              />
            </a>
          </div>
        </div>
        <!-- Меню -->
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
          <a class="dropdown-item" href="#">Добавить файл</a>
          <a class="dropdown-item" href="#">Отменить задачу</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const key = "d02290573e1e3121c00a8bcb3bd08a1f";
const token =
  "57b6866c777bc31f1f6ca58c1a9a540873221292bbb1cf7ccfdd027d08c54349";
export default {
  props: {
    card: Object,
    index: Number
  },
  data() {
    return {
      comment: ""
    };
  },
  methods: {
    sendComment(cardId) {
      axios
        .post(
          "https://api.trello.com/1/cards/" +
            cardId +
            "/actions/comments?text=" +
            this.comment +
            "&key=" +
            key +
            "&token=" +
            token
        )
        .then(() => {
          this.$store.dispatch("getComments");
          this.comment = "";
        });
    },
    getAvatarURL(value) {
      var url;
      this.members.forEach(function(item) {
        if (value == item.id) {
          if (item.avatarUrl) {
            url = item.avatarUrl + "/30.png";
          } else {
            url = "img/placeholder.jpg";
          }
        }
      });
      return url;
    },
    getmemberBollean(value) {
      var tooltip;
      this.members.forEach(function(item) {
        if (value == item.id) {
          if (item.fullName == "Trello Up User") {
            tooltip = false;
          } else {
            tooltip = true;
          }
        }
      });
      return tooltip;
    },
    getmemberTooltip(value) {
      var tooltip;
      this.members.forEach(function(item) {
        if (value == item.id) {
          if (item.fullName == "Trello Up User") {
            tooltip = "Я";
          } else {
            tooltip = item.fullName;
          }
        }
      });
      return tooltip;
    },
    commentsOnCard(value) {
      var newArr = this.$store.state.comments.filter(function(arr) {
        if (arr.data.card.id == value) {
          return arr;
        }
      });
      newArr.sort((a, b) => (a.date > b.date ? 1 : -1)); // отсортируем
      return newArr;
    },
    stageColor(value) {
      if (this.cards[value].closed == true) {
        return "stageArchiv";
      } else {
        for (var i = 0; i < this.lists.length; ++i) {
          if (this.lists[i].id == this.cards[value].idList) {
            return "stage" + i;
          }
        }
      }
    },
    stage(value) {
      if (this.cards[value].closed == true) {
        return "В архиве";
      } else {
        for (var i = 0; i < this.lists.length; ++i) {
          if (this.lists[i].id == this.cards[value].idList) {
            return this.lists[i].name;
          }
        }
      }
    }
  },
  computed: {
    cards() {
      return this.$store.state.cards;
    },
    lists() {
      return this.$store.state.lists;
    },
    members() {
      return this.$store.state.members;
    }
  }
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
