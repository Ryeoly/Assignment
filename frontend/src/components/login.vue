<template>
  <div class="wrapper">
    <button @click="onClickRedirect()">대쉬보드 페이지로 가자</button>
    <div id="gradient" class="gradient" :style="currGradientStyle"> </div>
    <div class="sam"></div>
    <div class="sagak"></div>
  </div>

</template>


<style>
.sam{
  position:absolute;
  bottom:61%;
  left:0;
  width:0;
  height:0;
  border-right: 100vw solid #172b4d;
  border-top: 9vh solid transparent;
}
.sagak{
  position:absolute;
  bottom:0;
  left:0;
  width:100%;
  height:61%;
  background:#172b4d;
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
  z-index: -1;
}
.wrapper{
  height:100vh;
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
