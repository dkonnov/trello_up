<template>
  <div>
    <center>
      <h2 class="title" style="color: #3c4858">Новая задача</h2>
    </center>
  </div>

  <!-- <form @submit.prevent="sendTicket">
    


    <div class="form-group" :class="{'has-danger': $v.name.$error}" v-show="selectedUser">
      <label>Задача</label>
      <input type="text" v-model="name" id="name" @input="$v.name.$touch" class="form-control" />
      <small id="emailHelp" class="form-text text-muted" v-if="!$v.name.required">Обязательное поле</small>
    </div>
    <div class="form-group" v-show="selectedUser">
      <label>Описание задачи</label>
      <textarea class="form-control" v-model="desc" rows="4" placeholder></textarea>
      <small
        id="emailHelp"
        class="form-text text-muted"
      >Максимально подробно опишите вашу заявку. Заявка должна содержать идентификационные номера или модели устройств, а также сущностей, текст возникшей ошибки. В случае возникновения проблемы опишите последовательность выполнения действий.</small>
    </div>

    <center v-show="selectedUser">
      <button type="submit" class="btn btn-primary btn-round" :disabled="$v.$invalid">Подать заявку</button>
      <button type="button" class="btn btn-primary btn-link" @click="crearForm">Очистить</button>
    </center>
  </form>-->
</template>