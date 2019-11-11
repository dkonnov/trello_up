<template>
  <div class="card mainCard">
    <div class="card-body" style="padding-bottom: 0px;margin-bottom: -15px;">
      <div class="row">
        <div class="col-md-6" style="padding-left: 30px; padding-right: 30px;padding-bottom: 40px;">
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </div>

        <div class="col-md-6 rightCard">
          <transition name="fade">
            <div class="info" v-show="!this.$store.state.currentUser">
              <div class="icon icon-primary">
                <i class="material-icons">chat</i>
              </div>
              <h4 class="info-title">Привет!</h4>
              <p>
                Тут вы можете создать задачу по вашей проблеме, наблюдать за ходом ее исполнения.
                <br />
                <br />Для начала работы необходимо авторизоваться. Если вас нет в списке пользователей, зарегистрируйтесь или обратитесь к администратору по телефону.
              </p>
            </div>

            <div class="info" v-show="this.$store.state.currentUser">
              <div class="icon icon-primary">
                <i class="material-icons">chat</i>
              </div>
              <h4 class="info-title">Ваши задачи</h4>
              <p>Задачи, созданные вами, будут отображаться тут. Чтобы увидеть их выберите пользователя в правой колонке сервиса</p>
            </div>
          </transition>
          <h4 v-show="!hollowMsg" class="title" style="color: #3c4858">Ваши текущие задачи</h4>

          <div
            class="card wow fadeInUp"
            style="width: 100%;"
            v-for="(card, index) of cards"
            :key="card"
            v-show="showCustomField(card.customFieldItems[0])"
            data-wow-duration="2s"
          >
            <div class="stageLine" :class="stageColor(index)"></div>
            <div class="card-body">
              <h4 class="card-title">{{ card.name }}</h4>
              <h6 class="card-subtitle mb-2 text-muted">{{ stage(index) }}</h6>
              <p class="card-text">{{ card.desc }}</p>
              <div align="right">
                <div
                  v-for="idMember of card.idMembers"
                  :key="idMember"
                  style="display: block;float: right; margin: 2px;"
                >
                  <a href="#" data-toggle="tooltip" :title="getmemberTooltip(idMember)">
                    <img
                      :src="getAvatarURL(idMember)"
                      width="30px"
                      class="img-raised rounded-circle img-fluid"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const key = "2a754a93fa902b29d2694a2f71af3f83";
const token =
  "b5123e80de5b5de7d21f46a754d8f97e6013facb5d0d6b5d2fcc2484b5530519";
const board = "fsA5vKgk";

export default {
  name: "mainCard",
  data() {
    return {
      cards: [],
      members: [],
      lists: [],
      users: [],

      cfid: "",
      hollowMsg: "true"
    };
  },

  methods: {
    getmemberTooltip(value) {
      var tooltip;
      this.members.forEach(function(item) {
        //
        if (value == item.id) {
          tooltip = item.fullName;
        }
      });
      return tooltip;
    },
    getAvatarURL(value) {
      var url;
      this.members.forEach(function(item) {
        //
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
    showCustomField(value) {
      if (value) {
        if (value.idValue == this.selectedUser) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    loadCards() {
      this.hollowMsg = false;
      axios
        .get(
          "https://api.trello.com/1/boards/fsA5vKgk/?cards=open&fields=all&card_customFieldItems=true&key=" +
            key +
            "&token=" +
            token
        )
        .then(response => {
          this.cards = response.data.cards;
        });
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
  mounted() {
    axios
      .get(
        "https://api.trello.com/1/boards/" +
          board +
          "/?lists=all&key=" +
          key +
          "&token=" +
          token
      )
      .then(response => {
        this.lists = response.data.lists;
      });
    axios
      .get(
        "https://api.trello.com/1/boards/" +
          board +
          "/?members=all&key=" +
          key +
          "&token=" +
          token
      )
      .then(response => {
        this.members = response.data.members;
      });

    // получим costom fields
    axios
      .get(
        "https://api.trello.com/1/boards/" +
          board +
          "/customFields?key=" +
          key +
          "&token=" +
          token
      )
      .then(response => {
        this.users = response.data[0].options;
        this.$nextTick(function() {
          $("#selectedUser").selectpicker("refresh");
        });
        this.cfid = response.data[0].id;
      });

    // установим фоновое изображение
    document.getElementById("backgroundDiv").style.backgroundImage =
      "url('img/backgrounds/patrick-tomasso-1272187-unsplash.jpg')";
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.row {
  height: 100%;
}
.mainCard {
  margin-top: -25px;
  min-height: 600px; /* Минимальная высота */
}
.rightCard {
  background-color: rgb(243, 241, 241);
  border-radius: 3px;
  top: -15px;
  margin-bottom: 0px;
  bottom: 0px;
  padding-left: 30px;
  padding-right: 30px;
  margin-right: 0px;
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