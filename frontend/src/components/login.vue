<template>
  <div class="wrapper">
    <div class="parent">
      <div class="inner_wrapper"> </div>
      <div class="header"> </div>
      <div class="welcome_msg_wrapper"> </div>
      <div class="footer"> </div>
      <div class="header_logo"> <p>header_logo</p> </div>
      <div class="welcome_msg"> <p>welcome_msg</p> </div>
      <div class="copyright"> <p>copyright</p> </div>
      <div class="link"> <p>link</p> </div>
      <div class="login_wrapper"> </div>
      <transition name="list" appear>
        <div class="login_inner"> </div>
      </transition>
      <transition name="list" appear>
        <div class="login_img_wrapper"> </div>
      </transition>
      <transition name="list" appear>
        <div class="login_img"> <p>login_img</p> </div>
      </transition>
      <transition name="list" appear>
        <div class="login_msg_wrapper"> </div>
      </transition>
      <transition name="list" appear>
        <div class="login_msg"> <p>login_msg</p> </div>
      </transition>
      <transition name="list" appear>
        <div class="login_input_wrapper"> </div>
      </transition>
      <transition name="list" appear>
        <div class="login_user_id">
          <b-form-input type="text" size="lg" placeholder="Enter your ID"></b-form-input>
        </div>
      </transition>
      <transition name="list" appear>
        <div class="login_user_pw" :key="0">
          <b-form-input type="password" size="lg" placeholder="Enter your Password"  :key="1"></b-form-input>
        </div>
      </transition>
      <transition name="list" appear>
        <div class="login_submit_wrapper"> </div>
      </transition>
      <transition name="list" appear>
        <div class="login_submit"  :key="2">
          <b-button variant="primary" :key="3">Submit</b-button>
        </div>
      </transition>
      <transition name="list" appear>
        <div class="login_action"> </div>
      </transition>
      <transition name="list" appear>
        <div class="forget_pw"> <p>forget_pw</p> </div>
      </transition>
      <transition name="list" appear>
        <div class="join"> <p>join</p> </div>
      </transition>
    </div>

    <div class="sam"></div>
    <div class="sagak"></div>
    <div id="gradient" class="gradient" :style="currGradientStyle"> </div>
  </div>

</template>


<style scoped>
.parent {
  background-color: #ffffff;
  opacity: 1;
  z-index: 40;
}
.sam{
  position:absolute;
  bottom:61%;
  left:0;
  width:0;
  height:0;
  border-right: 100vw solid #172b4d;
  border-top: 9vh solid transparent;
  z-index: 10;
}
.sagak{
  position:absolute;
  bottom:0;
  left:0;
  width:100%;
  height:61%;
  background:#172b4d;
  z-index: 11;
}

* {
  margin: 0;
  padding: 0;
}

.gradient {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(87deg, #5e72e4 0, #825ee4 100%);
  z-index: 1;
}
.wrapper{
  height:100vh;
}

html, body {
  margin:0;
  padding:0;
  height:100%;
}
div {
  border: thin solid #f44336;
  height: 100%;
}
.parent {
  display: grid;
  grid-template-columns: repeat(30, 1fr);
  grid-template-rows: repeat(30, 1fr);
  grid-column-gap: 2px;
  grid-row-gap: 2px;
}
.inner_wrapper {
  grid-area: 1 / 7 / 31 / 25;
  z-index: 40;
}
.header {
  grid-area: 1 / 7 / 3 / 25;
  z-index: 40;
}
.welcome_msg_wrapper {
  grid-area: 3 / 7 / 8 / 25;
  z-index: 40;
}
.login_wrapper {
  grid-area: 8 / 7 / 25 / 25;
  z-index: 40;
}
.login_action {
  grid-area: 25 / 7 / 27 / 25;
  z-index: 40;
}
.footer {
  grid-area: 27 / 7 / 31 / 25;
  z-index: 40;
}
.header_logo {
  grid-area: 2 / 7 / 3 / 10;
  z-index: 40;
}
.welcome_msg {
  grid-area: 4 / 12 / 7 / 20;
  z-index: 40;
}
.login_inner {
  grid-area: 8 / 12 / 25 / 20;
  z-index: 40;
}
.forget_pw {
  grid-area: 25 / 12 / 27 / 14;
  text-align: left;
  z-index: 40;
}
.join {
  grid-area: 25 / 17 / 27 / 20;
  text-align: right;
  z-index: 40;
}
.copyright {
  grid-area: 29 / 7 / 30 / 12;
  text-align: left;
  z-index: 40;
}
.link {
  grid-area: 29 / 18 / 30 / 25;
  text-align: right;
  z-index: 40;
}
.login_img_wrapper {
  grid-area: 8 / 12 / 13 / 20;
  z-index: 40;
}
.login_msg_wrapper {
  grid-area: 13 / 12 / 16 / 20;
  z-index: 40;
}
.login_input_wrapper {
  grid-area: 16 / 12 / 21 / 20;
  z-index: 40;
}
.login_submit_wrapper {
  grid-area: 21 / 12 / 25 / 20;
  z-index: 40;
}
.login_img {
  grid-area: 9 / 14 / 12 / 18;
  z-index: 40;
}
.login_msg {
  grid-area: 13 / 13 / 15 / 19;
  z-index: 40;
}
.login_user_id {
  grid-area: 16 / 13 / 18 / 19;
  z-index: 40;
}
.login_user_pw {
  grid-area: 19 / 13 / 21 / 19;
  z-index: 40;
}
.login_submit {
  grid-area: 22 / 15 / 24 / 17;
  text-align: center;
  z-index: 40;
}

.list-enter-active {
  transition: all 1s;
}
.list-enter {
  opacity: 0;
  transform: translateY(30px);
}
</style>

<script>
const colors = [
  {
    start: [41, 121, 255], stop: [130, 94, 228]
  },
  {
    start: [144, 164, 174], stop: [66, 66, 120]
  }
]

export default {
  data() {
    return {
      colors, // colors array
      step: 0,
      currIdx: 0,
      nextIdx: 1,
      totalSteps: 228,
      rgbValues: {start: [0, 0, 0], stop: [0, 0, 0]}, // values for gradient
      rgbSteps: {start: [0, 0, 0], stop: [0, 0, 0]}, // steps
      col1: null,
      col2: null,

      currGradientStyle: {
        backgroundImage: null
      }
    }
  },
  methods: {
    onClickRedirect: function(event){
      this.$router.push('/hello')
    },

    nextStep(n) {
      return (n + 1 < colors.length) ? n + 1 : 0
    },
    calcStepSize(a, b) {
      return (a - b) / this.totalSteps
    },
    calcSteps() {
      for (let key in this.rgbValues) {
        if (this.rgbValues) {
          for (var i = 0; i < 3; i++) {
            this.rgbValues[key][i] = this.colors[this.currIdx][key][i]
            this.rgbSteps[key][i] = this.calcStepSize(this.colors[this.nextIdx][key][i], this.rgbValues[key][i])
            //console.log(this.rgbSteps[key])
          }
        }
      }
    },
    //////////////////////
    updateGradient() {
      for (let key in this.rgbValues) {
        if (this.rgbValues) {
          for (var i = 0; i < 3; i++) {
            this.rgbValues[key][i] += this.rgbSteps[key][i]
          }
        }
      }

      let tCol1 = "rgb(" + (this.rgbValues.start[0] | 0) + "," + (this.rgbValues.start[1] | 0) + "," + (this.rgbValues.start[2] | 0) + ")"
      let tCol2 = "rgb(" + (this.rgbValues.stop[0] | 0) + "," + (this.rgbValues.stop[1] | 0) + "," + (this.rgbValues.stop[2] | 0) + ")"

      if (tCol1 !== this.col1 || tCol2 !== this.col2) {
        this.col1 = tCol1
        this.col2 = tCol2
        this.currGradientStyle.backgroundImage = "linear-gradient(45deg, " + this.col1 + ", " + this.col2 + ")"
      }

      this.step++
      if (this.step > this.totalSteps) {
        this.step = 0;

        this.currIdx = this.nextStep(this.currIdx)
        this.nextIdx = this.nextStep(this.nextIdx)

        this.calcSteps()
      }

      if (this.currGradientStyle.backgroundImage.indexOf("gradient") !== -1) {
        window.requestAnimationFrame(this.updateGradient)
      }
    }
  },
  created() {
    this.calcSteps()
    window.requestAnimationFrame(this.updateGradient)
  }
}
</script>
