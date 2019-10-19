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
          <h5 class="modal-title" id="exampleModalLabel">Сообщение</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">{{ messageText }}</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventEmitter } from "./../main";

export default {
  name: "modalWindow",
  data() {
    return {
      messageText: "test"
    };
  },
  created() {
    eventEmitter.$on("showMessage", value => {
      this.messageText = value;
      $("#modalWindow").modal("show");
    });
  }
};
</script>


