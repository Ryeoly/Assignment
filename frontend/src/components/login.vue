<template>
  <div class="login_full_wrapper">
    <div class="parent">
      <div class="inner_wrapper"> </div>
      <div class="header"> </div>
      <div class="welcome_msg_wrapper"> </div>
      <div class="footer"> </div>
      <div class="header_logo"></div>
      <div class="welcome_msg">2020 DBMS<br>Bluemango Team Project</div>
      <div class="copyright"> <p>copyright</p> </div>
      <div class="link"> <p>link</p> </div>
      <transition-group name="list" tag="div" class="login_wrapper" appear>
        <div v-for="component in components" :class="component" :key="component" v-if="show">
          <div v-if="component === 'login_img'" class="logo_img"></div>
          <div v-if="component === 'login_msg'" class="login_msg_front"><span class="front">Create new account</span> OR Sign in with these credentials:<div>Username: <span class="bold">10 digit number</span> Password: <span class="bold">secret</span></div></div>
          <b-form-input class="form-control border-0" type="text" size="lg" placeholder="Enter your ID" v-model="pid" v-if="component === 'login_user_id'" :state="pid_check" v-on:keyup="check_pid()" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            {{pid_msg}}
          </b-form-invalid-feedback>
          <b-form-input class="form-control border-0" type="password" size="lg" placeholder="Enter your Password" v-model="pwd" v-if="component === 'login_user_pw'" :state="login_success"></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            비밀번호가 틀렸습니다.
          </b-form-invalid-feedback>
          <b-button class="login_btn" block variant="info" size="lg" v-on:click="loginEL()" v-if="component === 'login_submit'">Login</b-button>
          <p v-if="component === 'forget_pw'">forget_pw</p>
          <div v-on:click="joinEL" v-if="component === 'join'">join</div>
        </div>
      </transition-group>
    </div>
    <div class="sam"></div>
    <div class="sagak"></div>
    <div id="gradient" class="gradient" :style="currGradientStyle"> </div>
  </div>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;500&display=swap');
.logo_img {
  background: url("../assets/kw_logo.png") no-repeat center center;
  background-size: 100%;
}
.login_msg_front {
  font-family: 'Heebo', sans-serif;
  font-weight: 400;
  text-align: center;
  font-size: 16px;
  color: #97999b;
}
.front {
  color: #7283df;
}
.bold {
  font-weight: 500;
}

.logo {
  width: 100%;
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
.login_full_wrapper{
  height:100vh;
}

html, body {
  margin:0;
  padding:0;
  height:100%;
}
div {
  height: 100%;
}
.parent {
  background-color: #ffffff;
  opacity: 1;
  z-index: 40;
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
  grid-area: 8 / 7 / 27 / 25;
  z-index: 40;
  display: grid;
  grid-template-columns: repeat(18, 1fr);
  grid-template-rows: repeat(19, 1fr);
  grid-column-gap: 2px;
  grid-row-gap: 2px;
}
.login_action {
  grid-area: 18 / 1 / 20 / 19;
  z-index: 40;
}
.footer {
  grid-area: 27 / 7 / 31 / 25;
  z-index: 40;
}
.header_logo {
  background: url("../assets/Bluemango_logo.png") no-repeat center center;
  background-size: 100%;
  grid-area: 2 / 7 / 4 / 12;
  z-index: 40;
}
.welcome_msg {
  font-family: 'Heebo', sans-serif;
  text-align: center;
  font-size: 45px;
  font-weight: 500;
  color: white;
  grid-area: 4 / 12 / 7 / 20;
  z-index: 40;
}
.login_inner {
  grid-area: 1 / 6 / 18 / 14;
  z-index: 40;
  background-color: #f8fafc;
  border-radius: 2%;
}
.forget_pw {
  grid-area: 18 / 6 / 19 / 8;
  text-align: left;
  z-index: 40;
}
.join {
  font-family: 'Heebo', sans-serif;
  font-weight: 500;
  grid-area: 18 / 12 / 19 / 14;
  text-align: right;
  z-index: 40;
  color:#ffffff;
  font-size:30px;

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
  grid-area: 1 / 6 / 6 / 14;
  z-index: 40;
}
.login_msg_wrapper {
  grid-area: 6 / 6 / 9 / 14;
  z-index: 40;
}
.login_input_wrapper {
  grid-area: 9 / 6 / 14 / 14;
  z-index: 40;
}
.login_submit_wrapper {
  grid-area: 14 / 6 / 18 / 14;
  z-index: 40;
}
.login_img {
  grid-area: 2 / 8 / 5 / 12;
  z-index: 40;
}
.login_msg {
  grid-area: 6 / 7 / 8 / 13;
  z-index: 40;
}
.login_user_id {
  grid-area: 9 / 7 / 11 / 13;
  z-index: 40;
}
.login_user_pw {
  grid-area: 12 / 7 / 14 / 13;
  z-index: 40;
}
.login_submit {
  grid-area: 15 / 9 / 17 / 11;
  text-align: center;
  z-index: 40;
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.form-control {
  box-shadow: 0 2px 2px #d0d2d7;
}

.login_btn {
  background: linear-gradient(87deg, #5e72e4 0, #825ee4 100%);
  border: none;
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
      showsidebar: false,
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
      },
      components: [
        "login_inner",
        "login_img_wrapper",
        "login_img",
        "login_msg_wrapper",
        "login_msg",
        "login_input_wrapper",
        "login_user_id",
        "login_user_pw",
        "login_submit_wrapper",
        "login_submit",
        "login_action",
        "forget_pw",
        "join",
      ],
      show: true,
      pid: '',
      pwd: '',
      pid_check: null,
      pid_msg: '',
      login_success: null
    }
  },
  methods: {
    joinEL: function () {
      this.show = false
      setTimeout(() => {
        this.$router.push('/join');
      }, 1000)
    },
    check_pid: function () {
      if(this.pid.length === 0) this.pid_check = null;
      else if(this.pid.length===10) {
        this.$http.post('http://localhost:3000/api/pid', {pid: this.pid}).then(response => {
          console.log(response.data.isSuccess);
          if(response.data.isSuccess === false) this.pid_msg = "없는 학번입니다."
          this.pid_check = !!response.data.isSuccess;
        });
      }
      else {
        this.pid_msg = "10자리 숫자를 입력하세요";
        this.pid_check = false;
      }
    },
    loginEL: function () {
        this.$http.post("http://localhost:3000/api/login", {pid: this.pid, pwd: this.pwd}, { "Content-Type": "application-json" })
          .then((res) => {
            if (res.data.user) {
              this.$store.commit("setUser", res.data.user);
              this.$router.push('/main');
            }
            else if (!res.data.isSuccess) {
              this.login_success = false;
            }
          })
          .catch((err) => {
            console.error(err);
          });
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
          }
        }
      }
    },
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
  },
}
</script>
