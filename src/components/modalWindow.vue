<template>
  <div class="modal fade" id="modalWindow" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
       <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Сообщение</h5>
         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          {{ messageText }}
       </div>
        <div class="modal-footer">
         <div v-show="sendPassword" v-on:click="sendPasswordF()"><button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">Отправить пароль</button></div>
         <div v-show="toRegistration" v-on:click="showRegistrationForm()"><button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">Регистрация</button></div>
         <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Закрыть</button>
         </div>
     </div>
    </div>
  </div>
</template>

<script>
import {eventEmitter} from "./../main"

export default {
  name: 'modalWindow',
  data () {
    return {
      messageText: 'test',
      sendPassword: false,
      toRegistration: false
     }
  },
  methods: {
    showRegistrationForm(){
      eventEmitter.$emit('showRegistrationForm');
    }
  },
  created() {
    eventEmitter.$on('showMessage', (value, type) => {
      this.messageText = value;
      this.sendPassword = false;
      this.toRegistration = false;
      if (type == 'sendPassword'){
        this.sendPassword = true;
      }
      if (type == 'toRegistration'){
        this.toRegistration = true;
      }
      $("#modalWindow").modal('show');
    })
  }
}

</script>


