<template>
  <div class="card">
    <div class="card-body" style="padding-bottom: 0px;margin-bottom: -15px;">
      <div class="row">
        <div class="col-md-6" style="padding-left: 30px; padding-right: 30px;padding-bottom: 40px;">
          <form @submit.prevent="sendTicket">
            <center>
              <h2 class="title" style="color: #3c4858">Новая задача</h2>
            </center>

            <div class="form-group" :class="{'has-danger': $v.selectedUser.$error}">
              <label for="exampleFormControlSelect2">Пользователь</label>
              <!-- https://developer.snapappointments.com/bootstrap-select/ -->
              <select
                @change="loadCards"
                @blur="$v.selectedUser.$touch"
                data-live-search="true"
                id="selectedUser"
                class="form-control selectpicker show-tick"
                v-model="selectedUser"
                data-style="btn btn-link"
              >
                <option data-hidden="true"></option>
                <option v-for="user of users" :value="user.id">{{user.value.text}}</option>
              </select>
              <small
                id="emailHelp"
                class="form-text text-muted"
                v-if="!$v.selectedUser.required"
              >Обязательное поле</small>
            </div>

            <div class="form-group" :class="{'has-danger': $v.name.$error}">
              <label>Задача</label>
              <input
                type="text"
                v-model="name"
                id="name"
                @input="$v.name.$touch"
                class="form-control"
              />
              <small
                id="emailHelp"
                class="form-text text-muted"
                v-if="!$v.name.required"
              >Обязательное поле</small>
            </div>
            <div class="form-group">
              <label>Описание задачи</label>
              <textarea class="form-control" v-model="desc" rows="4" placeholder></textarea>
              <small
                id="emailHelp"
                class="form-text text-muted"
              >Максимально подробно опишите вашу заявку. Заявка должна содержать идентификационные номера или модели устройств, а также сущностей, текст возникшей ошибки. В случае возникновения проблемы опишите последовательность выполнения действий.</small>
            </div>

            <center>
              <button
                type="submit"
                class="btn btn-primary btn-round"
                :disabled="$v.$invalid"
              >Подать заявку</button>
              <button type="button" class="btn btn-primary btn-link" @click="crearForm">Очистить</button>
            </center>
          </form>
        </div>

        <div
          class="col-md-6"
          style="background-color: rgb(243, 241, 241); border-radius: 3px; top: -15px; margin-bottom: 0px; right: -16px; bottom: 0px;padding-left: 30px;padding-right: 30px;"
        >
          <div class="info" v-show="hollowMsg">
            <div class="icon icon-primary">
              <i class="material-icons">chat</i>
            </div>
            <h4 class="info-title">Ваши задачи</h4>
            <p>Задачи, созданные вами, будут отображаться тут. Чтобы увидеть их выберите пользователя в правой колонке сервиса</p>
          </div>

          <h4 v-show="!hollowMsg" class="title" style="color: #3c4858">Ваши текущие задачи</h4>

          <div
            class="card wow fadeInUp"
            style="width: 100%;"
            v-for="(card, index) of cards"
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
import { eventEmitter } from "./../main";
import { required } from "vuelidate/lib/validators";

export default {
  name: "hollowCard",
  data() {
    return {
      cards: [],
      members: [],
      lists: [],
      users: [],
      desc: "",
      name: "",
      selectedUser: "",
      cfid: "",
      hollowMsg: "true"
    };
  },
  validations: {
    name: {
      required
    },
    selectedUser: {
      required
    }
  },
  methods: {
    crearForm() {
      this.name = "";
      this.desc = "";
    },
    getmemberTooltip(value) {
      var tooltip;
      this.members.forEach(function(item, i, members) {
        if (value == item.id) {
          tooltip = item.fullName;
        }
      });
      return tooltip;
    },
    getAvatarURL(value) {
      var url;
      this.members.forEach(function(item, i, members) {
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
    sendTicket() {
      // получим ID первого листа
      axios
        .get(
          "https://api.trello.com/1/boards/" +
            board +
            "/lists?cards=open&card_fields=all&filter=open&fields=all&key=" +
            key +
            "&token=" +
            token
        )
        .then(response => {
          // публикуем новую карточку
          axios
            .post(
              "https://api.trello.com/1/cards?name=" +
                this.name +
                "&desc=" +
                this.desc +
                "&idList=" +
                response.data[0].id +
                "&keepFromSource=all&pos=top&key=" +
                key +
                "&token=" +
                token
            )
            .then(response => {
              // добавим пользователя, создавшего задачу
              axios
                .put(
                  "https://api.trello.com/1/card/" +
                    response.data.id +
                    "/customField/" +
                    this.cfid +
                    "/item?idValue=" +
                    this.selectedUser +
                    "&key=" +
                    key +
                    "&token=" +
                    token
                )
                .then(() => {});

              // напишем сообщение об успешной публикации карточки
              eventEmitter.$emit(
                "showMessage",
                "Задача добавлена! В ближайшее время она будет распределена на специалиста. Ожидайте."
              );
              this.name = "";
              this.desc = "";
              //setTimeout(this.loadCards(), 2000);
            });
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