<template>
  <div class="wrapper">
    <div class="parent">
      <div class="inner_wrapper"></div>
      <div class="header"></div>
      <div class="welcome_msg_wrapper"></div>
      <div class="footer"></div>
      <transition-group name="list" tag="div" class="join_wrapper" appear>
        <div v-for="component in components" :class="component" :key="component" v-if="show">
          <b-card bg-variant="light" v-if="component === 'join_inner'">
            <b-form-group
              class="mb-0"
              label="회원가입"
              label-align="center"
              label-size="lg"
            >
              <b-form-group v-for="item in Object.keys(user_input)"
                            :label="item"
                            label-cols="4"
                            :label-for="item"
                            label-align="center"
                            :key="item"
                            :style="[item === 'PW' ? {padding: pw_padding+'px 0 0 0'} : {padding: '27px 0 0 0'}]"
              >
                <b-form-input :id="item" :key="item" v-model="user_input[item]" :placeholder="item" v-if="item !== 'ID' && item !== 'Birth' && item !=='PW' && item !=='PW_Check'"></b-form-input>
                <b-form-input :id="item" v-model="user_input[item]" class="password" type="password" v-else-if="item === 'PW'" :state="check_PW()"></b-form-input>
                <b-form-input :id="item" v-model.lazy="user_input[item]" class="password" type="password" v-else-if="item === 'PW_Check'" :state="check_PW()"></b-form-input>
                <div v-else-if="item === 'Birth'">
                  <b-input-group>
                    <b-form-input
                      :id="item"
                      v-model="b_tmp"
                      type="text"
                      placeholder="YYYY-MM-DD"
                      autocomplete="off"
                      onKeyup="this.value=this.value.replace(/[^0-9-]/g,'')"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-form-datepicker
                        v-model="b_tmp"
                        button-only
                        right
                        locale="ko-KR"
                        dropup
                        @context="onContext"
                      ></b-form-datepicker>
                    </b-input-group-append>
                  </b-input-group>
                </div>
                <b-form-group v-else
                              :description="hakbun_msg"
                >
                  <b-form-row>
                    <b-col class="id_input">
                      <b-form-select class="id_input_box1" v-model="user_input.ID.p_year" :options="year_options" placeholder="Year" v-on:change="hakbungen()"></b-form-select>
                    </b-col>
                    <b-col class="id_input">
                      <b-form-select class="id_input_box2" v-model="user_input.ID.p_major" :options="major_options" placeholder="Major" v-on:change="hakbungen()"></b-form-select>
                    </b-col>
                  </b-form-row>
                </b-form-group>
              </b-form-group>
            </b-form-group>
          </b-card>
          <b-button v-on:click="test_submit" class="submit_btn" block variant="info" size="lg" v-else>Submit</b-button>
        </div>
      </transition-group>
      <div class="copyright"></div>
      <div class="link"></div>
      <div class="header_logo"></div>
      <div class="welcome_msg"></div>
    </div>
    <div class="sam"></div>
    <div class="sagak"></div>
    <div id="gradient" class="gradient" :style="currGradientStyle"></div>
  </div>
</template>


<style lang="scss" scoped>
.submit_btn {
  text-align: center;
}

.id_input {
  padding-left: 0;
  padding-right: 0;
}

.id_input_box1 {
  border-radius: .25rem 0 0 .25rem;
  border: 1px solid #ced4da;
  box-shadow: 0 2px 2px #d0d2d7;
}

.id_input_box2 {
  border-radius: 0;
  border-top: 1px solid #ced4da;
  border-bottom: 1px solid #ced4da;
  border-left: 0;
  border-right: 0;
  box-shadow: 0 2px 2px #d0d2d7;
}

.id_input_box3 {
  border-radius: 0 .25rem .25rem 0;
  border: 1px solid #ced4da;
}

.parent {
  background-color: #ffffff;
  opacity: 1;
  z-index: 11;
}

.sam {
  position: absolute;
  bottom: 61%;
  left: 0;
  width: 0;
  height: 0;
  border-right: 100vw solid #172b4d;
  border-top: 9vh solid transparent;
  z-index: 9;
}

.sagak {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 61%;
  background: #172b4d;
  z-index: 9;
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

.wrapper {
  height: 100vh;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

div {
  height: 100%;
}

.parent {
  display: grid;
  grid-template-columns: repeat(30, 1fr);
  grid-template-rows: repeat(30, 1fr);
  grid-column-gap: 2px;
  grid-row-gap: 2px;
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
  z-index: 11;
}

.header {
  grid-area: 1 / 7 / 3 / 25;
  z-index: 11;
}

.welcome_msg_wrapper {
  grid-area: 3 / 7 / 8 / 25;
  z-index: 11;
}

.footer {
  grid-area: 27 / 7 / 31 / 25;
  z-index: 11;
}

.join_wrapper {
  grid-area: 8 / 7 / 27 / 25;
  z-index: 11;
  display: grid;
  grid-template-columns: repeat(18, 1fr);
  grid-template-rows: repeat(19, 1fr);
  grid-column-gap: 2px;
  grid-row-gap: 2px;
}

.join_inner {
  grid-area: 1 / 6 / 20 / 14;
  z-index: 11;
}

.submit {
  grid-area: 18 / 9 / 20 / 11;
  z-index: 11;
}

.submit_btn {
  background: linear-gradient(87deg, #5e72e4 0, #825ee4 100%);
  border: none;
  height: 50%;
  z-index: 11;
}

.copyright {
  grid-area: 29 / 7 / 30 / 9;
  z-index: 11;
}

.link {
  grid-area: 29 / 21 / 30 / 25;
  z-index: 11;
}

.header_logo {
  grid-area: 2 / 7 / 3 / 9;
  z-index: 11;
}

.welcome_msg {
  grid-area: 4 / 12 / 7 / 20;
  z-index: 11;
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
      },
      user_input: {
        ID: {p_year: null, p_major: null, pid: ''},
        PW: '',
        PW_Check: '',
        Name: '',
        Tel: '',
        Birth: '',
        email: '',
        addr: ''
      },
      components: [
        'join_inner',
        'submit'
      ],
      show: true,
      b_tmp: '',
      major_options: [
        { value: null, text: '학과선택', disabled: true },
        { value: '722', text: '컴퓨터공학과' },
        { value: '723', text: 'ㅁㅁ학과' }
      ],
      year_options: [
        { value: null, text: '연도선택', disabled: true },
        '2016',
        '2017',
        '2018',
        '2019',
        '2020'
      ],
      pw_padding : 27,
      hakbun_msg: ''
    }
  },
  methods: {
    test_submit: function () {
      console.log(this.user_input);
    },
    joinEL: function () {
      this.show = false;
      setTimeout(this.goto_join, 1000);
    },
    goto_join: function () {
      this.$router.push('/login');
    },
    hakbungen() {
      if(this.user_input.ID.p_year==null || this.user_input.ID.p_major==null) {
        this.pw_padding = 27;
        this.hakbun_msg =  '';
      }
      else {
        this.pw_padding = 4;
        this.$http.post('http://localhost:3000/api/join-pid', this.user_input.ID).then(response => {
          this.hakbun_msg = "학번은 "+response.data.next+" 입니다.";
        });
      }
    },
    check_PW() {
      if(this.user_input.PW === '' || this.user_input.PW_Check === '') return null;
      return this.user_input.PW === this.user_input.PW_Check;
    },
    onContext(ctx) {
      this.user_input.Birth = ctx.selectedYMD
      console.log(this.b_date)
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
    console.log(Object.keys(this.user_input));
    this.calcSteps()
    window.requestAnimationFrame(this.updateGradient)
  },
}
</script>
