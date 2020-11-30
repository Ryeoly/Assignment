<template>
  <div :class="cover_show?'cover':'user'">
    <b-dropdown id="dropdown-1" :text="info.pid+'-'+info.name" class="user_inner" size="sm" v-if="!cover_show">
      <b-dropdown-item v-on:click="logout"> <b-icon icon="unlock-fill" style = "color: red"> </b-icon>  로그아웃</b-dropdown-item>
      <b-dropdown-item v-b-modal.modify> <b-icon icon="pencil-square" style = "color: red"></b-icon> 회원 정보 수정</b-dropdown-item>
    </b-dropdown>

    <b-modal
      v-model="modalShow"
      @ok="gotoLogin"
      ok-only
      centered
      no-close-on-backdrop
      no-close-on-esc
      hide-header
    >로그인 후 접속할 수 있습니다.
    </b-modal>
    <b-modal
      id="modify"
      title="회원 정보 수정"
      size="lg"
      @show="resetform"
      @hidden="resetform"
      @ok="handleOk"
      centered
    >
      <b-card bg-variant="light">
        <b-form-group
          label-cols-sm="3"
          label="이름"
          label-align-sm="center"
          label-for="nested-street"
        >
          <b-form-input
            id="name"
            v-model="info.name"
            disabled/>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="학번"
          label-align-sm="center"
          label-for="pid"
        >
          <b-form-input
            id="pid"
            v-model="info.pid"
            disabled/>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="생일"
          label-align-sm="center"
          label-for="birth"
        >
          <b-form-input
            id="birth"
            v-model="info.birth"
            type="date"
            :state="state_list.birth"
          />
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="새 비밀번호"
          label-align-sm="center"
          label-for="new_pwd"
        >
          <b-form-input
            id="new_pwd"
            v-model="new_pwd"
            type="password"
            :state="state_list.new_pwd"
            v-on:keyup="check_PW()"
          />
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="새 비밀번호 확인"
          label-align-sm="center"
          label-for="new_pwd_check"
        >
          <b-form-input
            id="new_pwd_check"
            v-model="new_pwd_check"
            type="password"
            :state="state_list.new_pwd_check"
            v-on:keyup="check_PW()"
          />
          <b-form-invalid-feedback id="input-live-feedback">
            비밀번호가 일치하지 않습니다.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="전화번호"
          label-align-sm="center"
          label-for="tel"
        >
          <b-form-input
            id="tel"
            v-model="info.tel"
            type="tel"
            placeholder="010-0000-0000"
            :state="state_list.tel"
            v-on:keyup="check_tel()"
            onKeyup="this.value=this.value.replace(/[^0-9-]/g,'')"
          />
          <b-form-invalid-feedback id="input-live-feedback">
            휴대폰 번호 양식에 맞게 입력하세요.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="메일"
          label-align-sm="center"
          label-for="email"
        >
          <b-form-input
            id="email"
            v-model="info.email"
            placeholder="aaa@gmail.com"
            type="email"
            :state="state_list.email"
            v-on:keyup="check_email()"
          />
          <b-form-invalid-feedback id="input-live-feedback">
            이메일 양식에 맞게 입력하세요.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="주소"
          label-align-sm="center"
          label-for="addr"
        >
          <b-form-textarea
            id="addr"
            v-model="info.addr"
            :state="state_list.addr"
          />
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="비밀번호"
          label-align-sm="center"
          label-for="old_pwd"
        >
          <b-form-input
            id="old_pwd"
            v-model="old_pwd"
            type="password"
            :state="state_list.old_pwd"
            v-on:keyup="check_old()"
          />
          <b-form-invalid-feedback id="input-live-feedback">
            이전 비밀번호를 입력하세요.
          </b-form-invalid-feedback>
        </b-form-group>
      </b-card>
    </b-modal>
  </div>
</template>

<style>
@import '../style/basicstyle.scss';
</style>

<script>
export default {
  data() {
    return {
      modalShow: false,
      info: {
        pid: '',
        pwd: '',
        name: '',
        tel: '',
        addr: '',
        birth: '',
        email: ''
      },
      state_list: {
        old_pwd: false,
        new_pwd: null,
        new_pwd_check: null,
        tel: null,
        birth: null,
        email: null,
        addr: null
      },
      old_pwd: '',
      new_pwd: '',
      new_pwd_check: '',
      cover_show: true
    }
  },
  methods: {
    logout: function () {
      this.$http.get("/api/logout").then((res) => {
        if (res.data.isSuccess) {
          this.$router.push('/login');
        }
      })
        .catch((err) => {
          console.error(err);
        });
    },
    check_PW: function () {
      if (this.new_pwd === '' || this.new_pwd_check === '') {
        this.state_list.new_pwd = null;
        this.state_list.new_pwd_check = null;
        return
      }
      this.state_list.new_pwd = this.new_pwd === this.new_pwd_check;
      this.state_list.new_pwd_check = this.new_pwd === this.new_pwd_check;
    },
    check_old: function () {
      this.state_list.old_pwd = this.old_pwd === this.$store.state.user.pwd;
    },
    check_email: function () {
      this.state_list.email = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(this.info.email);
    },
    check_tel: function () {
      this.state_list.tel = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/.test(this.info.tel);
    },
    resetform: function () {
      this.$http.post("/api/userinfo", {pid: this.$store.state.user.pid}).then((res) => {
        // this.$http.post("http://localhost:3000/api/userinfo", {pid: '2016722001'}).then((res) => {
        if (res.data.isSuccess) {
          this.info = res.data.info;
          this.info.birth = this.info.birth.substring(0, 10);
          this.old_pwd = '';
          this.new_pwd = '';
          this.new_pwd_check = '';
          this.state_list = {
            old_pwd: false,
            new_pwd: null,
            new_pwd_check: null,
            tel: null,
            birth: null,
            email: null,
            addr: null
          }
        }
      })
        .catch((err) => {
          console.error(err);
        });
    },
    handleOk: function (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit: function () {
      let a = this.checkFormValidity();
      if (a === true) {
        return
      }
      if (this.new_pwd !== '') this.info.pwd = this.new_pwd;
      this.$http.post("/api/update", {info: this.info}).then((res) => {
        if (res.data.success) {
          this.$store.commit("updatePW", this.info.pwd);
          this.$nextTick(() => {
            this.$bvModal.hide('modify')
          })
        }
      })
        .catch((err) => {
          console.error(err);
        });
    },
    checkFormValidity: function () {
      this.state_list.addr = this.info.addr.length !== 0;
      this.state_list.birth = this.info.birth.length !== 0;
      this.check_old();
      this.check_PW();
      this.check_email();
      this.check_tel();
      return Object.values(this.state_list).includes(false);
    },
    gotoLogin: function () {
      this.$router.push('/login');
    }
  },
  created: async function () {
    this.$http.get("/api/login").then((res) => {
      const user = res.data.user;
      if (user) {
        this.$store.commit("setUser", user);
        this.info.pid = this.$store.state.user.pid;
        this.info.name = this.$store.state.user.name;
        this.cover_show = false;
      } else {
        this.modalShow = true;
      }
    })
      .catch((err) => {
        console.error(err);
      });
  }
}
</script>
