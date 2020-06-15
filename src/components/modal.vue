<template>
  <div
    class="modal"
    id="modalWindow"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="false"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ $t('message.message') }}
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          {{ messageText }}
        </div>
        <div class="modal-footer">
          <button
            v-if="this.callback"
            type="button"
            class="btn btn-primary btn-sm"
            data-dismiss="modal"
            @click="callback()"
          >
            Ok
          </button>
          <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventEmitter } from '../main.js';

export default {
  name: 'Modal',
  data() {
    return {
      messageText: ''
    };
  },
  methods: {
    callback() {}
  },
  created() {
    eventEmitter.$on('showMessage', (value, callback) => {
      this.messageText = value;
      this.callback = callback;
      $('#modalWindow').modal('show');
    });
  }
};
</script>
