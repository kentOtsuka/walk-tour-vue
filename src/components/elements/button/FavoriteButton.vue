<template>
  <v-btn class="btn ma-2" fab small color="white" @click="clickButton">
    <v-icon color="pink" v-if="isFavorite">mdi-heart</v-icon>
    <v-icon color="pink" v-else>mdi-heart-outline</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    spotDetail: {
      type: Object,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    clickButton() {
      const { id, spot } = this.spotDetail;

      this.$emit('click', id, spot.id);
    },
  },
};
</script>
