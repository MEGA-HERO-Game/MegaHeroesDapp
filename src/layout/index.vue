<template>
  <div class="app-wrapper">
    <navbar />
    <app-main />
  </div>
</template>

<script>
import { AppMain, Navbar } from "./components";
import { mapState } from "vuex";

export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  height: 100%;
  background-color: #c5ac84;
}
</style>
