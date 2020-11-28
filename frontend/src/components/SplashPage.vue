<template>
  <div class="splashscreen-wrapper">
    <div class="letters-group">
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
    },
    afterEnter: function (el) {
      if(parseInt(el.dataset.index, 10) === 8) {
        this.$http.get("http://localhost:3000/api/login").then((res) => {
            const user = res.data.user;
            if (user) {
              this.$store.commit("setUser", user);
              this.$router.push('/main');
            }
            else {
              this.$router.push('/login');
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
}
</script>


<style lang="scss" scoped>
.splashscreen-wrapper {
  position: relative;
  height: 100%;
  width: 100%;

  .letters-group {
    height: 10vh;
    letter-spacing: 3px;
    font-size: 2.5vw;
    font-weight: 700;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: 23vw;
    margin-left: -8vw;
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
