<template>
  <div class="wrapper">
    <div class="cover" v-if="cover_show"/>
    <div class="one"></div>
    <!-- 회원정보 위에 띄우는 부분 -->
    <div class="user">
      <b-dropdown id="dropdown-1" :text="info.pid+'-'+info.name" class="user_inner" size="sm">
        <b-dropdown-item v-on:click="logout">로그아웃</b-dropdown-item>
        <b-dropdown-item v-b-modal.modify>회원 정보 수정</b-dropdown-item>
      </b-dropdown>
    </div>

    <div class="five" style="background-color: #686868">
      <table class="card-table table" style="color: white">
        <thead class="thead-light" style="text-align:center">
        <p class="notice-pretty">과목별
          <span class="notice-pretty2">NOTICE</span>
        </p>
        </thead>
        <tbody style="text-align:center">
        <tr  v-for="item in notice_list" :key="item">
          <td class="border">{{$moment(item.date).format('MM/DD')}}</td>
          <td class="border">{{item.sname}}</td>
          <td class="border">{{item.title}}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="two" style="background-color: midnightblue">
      <table class="card-table table" style="color: white">
        <thead class="thead-light" style="text-align:center">
        <p> 수강 과목 </p>
        </thead>
        <tbody style="text-align:center">
        <tr  v-for="item in class_list" :key="item">
          <td class="border">{{ item.sname}}</td>
          <td class="border"><router-link v-bind:to="{name: 'notice', params: {snum: item.snum}}">공지사항</router-link></td>
        </tr>
        </tbody>
      </table>
    </div>




    <div class="three" style="background-color:white">
      <table style="grid-area:1/1/59/38; height: 100%; width: 100%">
        <tr style="height: 7%">
          <td style="width: 5%; text-align: center">시간</td>
          <td style="width: 19%; text-align: center">월</td>
          <td style="width: 19%; text-align: center">화</td>
          <td style="width: 19%; text-align: center">수</td>
          <td style="width: 19%; text-align: center">목</td>
          <td style="width: 19%; text-align: center">금</td>
        </tr>
        <tr style="height: 15%; text-align: center"><td>1</td></tr>
        <tr style="height: 15%; text-align: center"><td>2</td></tr>
        <tr style="height: 15%; text-align: center"><td>3</td></tr>
        <tr style="height: 15%; text-align: center"><td>4</td></tr>
        <tr style="height: 15%; text-align: center"><td>5</td></tr>
        <tr style="height: 15%; text-align: center"><td>6</td></tr>
      </table>
      <div v-for="(item,index) in class_list" :style="[index === 0? {backgroundColor:'#D9E4BF'}: index===1 ?
            {backgroundColor:'#DDE5F0'}: index===2 ? {backgroundColor: '#F5D5B7'} : index===3 ? {backgroundColor:'#E0E0E0'} : index===4 ? {backgroundColor:'#F4F4F4'}  : index===5 ?
             {backgroundColor:'purple'} : index === 6 ?  {backgroundColor:'gray'} :  {backgroundColor:'green'}
            ,{gridColumnStart:item.grid_time.split(',')[2], gridColumnEnd:item.grid_time.split(',')[3],
            gridRowStart:item.grid_time.split(',')[0], gridRowEnd:item.grid_time.split(',')[1]}]">{{item.sname}}
      </div>
      <div v-for="(item,index) in class_list" :style="[index === 0? {backgroundColor:'#D9E4BF'}: index===1 ?
            {backgroundColor:'#DDE5F0'}: index===2 ? {backgroundColor:'#F5D5B7'} : index===3 ? {backgroundColor:'#E0E0E0'} : index===4 ? {backgroundColor:'#F4F4F4'}  : index===5 ?
             {backgroundColor:'purple'} : index === 6 ?  {backgroundColor:'gray'} :  {backgroundColor:'green'}
            ,{gridColumnStart:item.grid_time.split(',')[6], gridColumnEnd:item.grid_time.split(',')[7],
            gridRowStart:item.grid_time.split(',')[4], gridRowEnd:item.grid_time.split(',')[5]}]">{{item.sname}}
      </div>
    </div>





    <left></left>           <!-- 여기가 left바-------------------------------------------------------------------------------------- -->





    <!-- 회원정보 수정 -->
    <b-modal
      v-model="modalShow"
      @ok="gotoLogin"
      ok-only
      centered
      no-close-on-backdrop
      no-close-on-esc
      hide-header
    >로그인부터 해 시발놈아
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

<script>
  import Left from "./leftsidebar";

  export default {
    components:{
      Left
    },
    data() {
      return {
        friend_id:'',
        user : '2018722007',
        db_result:[],
        class_list:[{snum:'', sname:'', grid_time:''}],
        notice_list:[],
        friend_table:[],
        semester: '20-2',
        pid: '',
        name: '',
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

    created: async function () {
      this.$http.get("http://localhost:3000/api/login").then((res) => {
        const user = res.data.user;
        if (user) {
          this.$store.commit("setUser", user);
          this.info.pid = this.$store.state.user.pid;
          this.info.name = this.$store.state.user.name;
          this.cover_show = false;
          this.db_init();
        } else {
          this.modalShow = true;
        }
      })
        .catch((err) => {
          console.error(err);
        });
    },

    methods: {
      db_init: function() {
        this.$http.post('/maintable', {user: this.user, semes:this.semester}).then((response) => {
          this.db_result = response.data;
          console.log(this.db_result);
          if(this.db_result.rows2.length!==0)
            this.class_list = this.db_result.rows2;

          if(this.db_result.notice.length!==0)
            this.notice_list = this.db_result.notice;
        })
      },
      calltable: function(f_pid){
        this.$http.post('/maintable/calltable', {friend_pid : f_pid, semes: this.semester}).then((response) => {
          this.friend_table = response.data;
        });
      },

      logout: function () {
        this.$http.get("http://localhost:3000/api/logout").then((res) => {
          if (res.data.isSuccess) {
            this.$router.push('/login');
          }
        })
          .catch((err) => {
            console.error(err);
          });
      },
      gotoLogin: function () {
        this.$router.push('/login');
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
        this.$http.post("http://localhost:3000/api/userinfo", {pid: this.$store.state.user.pid}).then((res) => {
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
        this.$http.post("http://localhost:3000/api/update", {info: this.info}).then((res) => {
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
      }

    }
  }
</script>


<style lang="scss" scoped>
  @import '../style/basicstyle.scss';
  /*시간표 테마*/

  table.type11 {
    border-collapse: separate;
    border-spacing: 1px;
    text-align: center;
    line-height: 1.5;
    margin: 20px 10px;
  }
  table.type11 th {
    width: 155px;
    padding: 10px;
    font-weight: bold;
    vertical-align: top;
    color: #fff;
    background: #ce4869 ;
  }
  table.type11 td {
    width: 155px;
    padding: 10px;
    vertical-align: top;
    border-bottom: 1px solid #ccc;
    background: #eee;
  }

  /* 시간표 테마 끝!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


</style>
