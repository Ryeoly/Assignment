<template>
  <div class="splashscreen-wrapper">
    <div class="logo-letters-group">
      <transition-group name="letters"
                        @after-enter="afterEnter"
                        @before-enter="beforeEnter"
                        appear>
        <span class="logo-letter" v-for="(item, index) in logoName" :data-index="index" :key="item">{{item}}</span>
      </transition-group>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SplashScreen',
  data() {
    return {
      show: true,
      logoName: ['B','L','U','E','M','A','N','G','O']
    }
  },
  methods: {
    beforeEnter: function(el) {
      el.style.transitionDelay = parseInt(el.dataset.index, 10) * 100 + 'ms'
      console.log(el.dataset.index)
    },
    afterEnter: function (el) {
      if(parseInt(el.dataset.index, 10) === 8) {
        this.$router.push('/login')
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.splashscreen-wrapper {
  position: relative;
  height: 100%;
  width: 100%;

  .logo-wrapper {
    height: 30vh;
    width: 30vw;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -15vw;
    margin-top: -15vh;
    animation: image 1s ease-in-out 2s 1 normal forwards;
    box-sizing: border-box;
  }

  .logo-letters-group {
    height: 10vh;
    letter-spacing: 3px;
    font-size: 1.5vw;
    font-weight: 700;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: 20vh;
    margin-left: -50vw;
    width: 100vw;
  }
}

.letters-enter-active {
  transition: all .3s ease;
}

.letters-enter, .letters-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
