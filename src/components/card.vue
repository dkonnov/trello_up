<template>
  <div>
    123
  </div>
</template>

<script>
export default {
  props: {
    card: Object,
    index: Number
  },
  methods: {
    commentsOnCard(value) {
      var newArr = this.$store.state.comments.filter(function(arr) {
        if (arr.data.card.id == value) {
          return arr;
        }
      });
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
    }
  }
};
</script>

<style>
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
