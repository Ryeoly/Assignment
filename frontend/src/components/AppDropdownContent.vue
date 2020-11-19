<template>
  <transition class="list" name="dropdown-content">
    <p v-if="active" class="origin-top-right">
      <slot/>
    </p>
  </transition>
</template>

<script>
export default {
  name: "AppDropdownContent",
  inject: ["sharedState"],
  computed: {
    active() {
      return this.sharedState.active;
    }
  }
};
</script>

<style>
.dropdown-content-enter-active,
.dropdown-content-leave-active {
  transition: all 0.2s;
  transform: translateY(5px);
}
.dropdown-content-enter,
.dropdown-content-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

</style>
