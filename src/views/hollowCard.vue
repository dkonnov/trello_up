<template>
  
      
<div class="card"> 
<div class="card-body" style="padding-bottom: 0px;margin-bottom: -15px;">
  <div class="row">

    <div class="col-md-6" style="padding-left: 30px;padding-right: 30px;">
      
       <form>
         <center><h2 class="title" style="color: #3c4858">Новая заяка</h2></center>
          <div class="form-group">
              <label>Задача</label>
              <input type="text" v-model="name" @input="inputName" class="form-control">
              <small id="emailHelp" class="form-text text-muted">Обязательное поле</small>
          </div>
           <div class="form-group">
              <label>Описание задачи</label>
              <textarea class="form-control" v-model="desc" rows="4" placeholder=""></textarea>
              <small id="emailHelp" class="form-text text-muted">Максимально подробно опишите вашу заявку. Заявка должна содержать идентификационные номера или модели устройств, а также сущностей, текст возникшей ошибки. В случае возникновения проблемы опишите последовательность выполнения действий.</small>
          </div>
          <center>
            
            <button v-show="formOk" class="btn btn-primary btn-round">
              Подать заявку
            </button>
            <button v-show="!formOk" class="btn btn-primary btn-round" disabled>
              Подать заявку
            </button>
            <button class="btn btn-primary btn-link">
              Очистить
            </button>
          </center>
        </form>
    </div>
    
    <div class="col-md-6" style="background-color: rgb(243, 241, 241); border-radius: 3px; top: -15px; margin-bottom: 0px; right: -16px; bottom: 0px;padding-left: 30px;padding-right: 30px;">
      <h4 class="title" style="color: #3c4858">Ваши текущие заявки</h4>

      <div class="card wow fadeInUp" style="width: 100%;" v-for="(item, index) of cards" :key="item" data-wow-duration="2s" data-wow-delay="1s">
        <div class="stageLine" :class="stageColor(index)"></div>
        <div class="card-body">
          <h4 class="card-title">{{ item.name }}</h4>
          <h6 class="card-subtitle mb-2 text-muted">{{ stage(index) }}</h6>
          <p class="card-text">{{ item.desc }}
            <div align="right">
              <div v-for="(avatar, index) of item.idMembers">
                <img src="https://trello-avatars.s3.amazonaws.com/cf69e10484b5ea3cf622bd30536e2b84/30.png" alt="Thumbnail Image" class="img-raised rounded-circle img-fluid">
              </div>
            </div>
          </p>
        </div>
      </div>

    </div>
  
  
</div>
</div>

</div>
</template>

<script>
import axios from "axios"
import {http} from "./../http"
import {eventEmitter} from "./../main"

export default {
  name: 'hollowCard',
  data () {
    return {
      cards: [],
      lists:[],
      formOk: false,
      desc: '',
      name: ''
    }
  },
  methods: {
    stageColor(value){
      if (this.cards[value].closed == true) {
        return "stageArchiv";
      }  else {
        for (var i = 0; i < this.lists.length; ++i){
          if (this.lists[i].id == this.cards[value].idList){
            console.log("stage" + i);
            return "stage" + i; 
            
          }
        }
      }
    },
    stage(value) {
       if (this.cards[value].closed == true) {
         return "В архиве";
       } else {
        for (var i = 0; i < this.lists.length; ++i){
          if (this.lists[i].id == this.cards[value].idList){
            return this.lists[i].name;
          }
        }
       }
    },
    inputName() {
      if (this.name){this.formOk=true} else {this.formOk = false}
    }
  },
  mounted(){ 

    axios.get('https://api.trello.com/1/boards/fsA5vKgk/?cards=all&key=2a754a93fa902b29d2694a2f71af3f83&token=b5123e80de5b5de7d21f46a754d8f97e6013facb5d0d6b5d2fcc2484b5530519')
    .then(response => {
      this.cards =  response.data.cards;
      console.log(this.cards);
    });
    axios.get('https://api.trello.com/1/boards/fsA5vKgk/?lists=all&key=2a754a93fa902b29d2694a2f71af3f83&token=b5123e80de5b5de7d21f46a754d8f97e6013facb5d0d6b5d2fcc2484b5530519')
    .then(response => {
      this.lists =  response.data.lists;
      console.log(this.lists);
    });
    axios.get('https://api.trello.com/1/members/5b273fa55ebcca0b73b5cb7c?fields=all&key=2a754a93fa902b29d2694a2f71af3f83&token=b5123e80de5b5de7d21f46a754d8f97e6013facb5d0d6b5d2fcc2484b5530519')
    .then(response => {
      this.lists =  response.data.lists;
      console.log(this.lists);
    });
    document.getElementById("backgroundDiv").style.backgroundImage='url(\'img/backgrounds/patrick-tomasso-1272187-unsplash.jpg\')';
  }
}
</script>

<style scoped>
.stageLine {
  width: 3px;
  height: 100%;
  background-color: #701c7e;
  position: absolute;
  border-radius: 3px 0 0 3px;
}
.stageArchiv{
  background-color: gray;
}
.stage0{
  background-color: #39843c;
}
.stage1{
  background-color: #701c7e;
}
.stage2{
  background-color: #c27400;
}
.stage3{
  background-color: #008697;
}
.stage4{
  background-color: #e11b0c;
}
</style>