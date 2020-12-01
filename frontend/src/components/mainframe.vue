<template>
  <div class="wrapper">
    <div class="one"></div>
    <div class="geul">
      2020 DataBase Project Bluemango
    </div>


    <left></left>           <!-- 여기가 left바-------------------------------------------------------------------------------------- -->
    <user></user>
    <transition name="insert" appear>
    <div class="five" style=" display: table; background-color: white; position: relative; overflow: auto">
      <div class="notice-title" style="font-size: x-large">
        <p style="font-weight: bolder; font-size: large; width: 100%; margin-left: 0; margin-top: 3%; margin-bottom: 3%">
          <span style="font-size: x-large; font-weight: bolder">
            &nbsp;과목별&nbsp;
          </span>
          <span style="color: #825ee4">
          NOTICE
          </span>
        </p>
      </div>
      <table class="table" style="width: 100%">
        <tr class="latest-notice" v-for="item in notice_list" :key="item" style="margin-left: 10%; width: 100%">
          <td style="width: 10%">
            {{$moment(item.date).format('MM/DD')}}
          </td>
          <td style="width: 30%" >
            {{item.sname}}
          </td>
          <td style="width: 60%;">
            <router-link v-bind:to="{name: 'view', params: {index:item.idx}}">{{item.title}}</router-link>
          </td>
        </tr>
      </table>
    </div>
    </transition>

    <transition name="insert" appear>
    <div class="two" style="display: table; background-color: white">
      <table class="table-hover" style="color: black; width: 100%" >
        <thead class="thead-light" style="text-align: left; height: 10px; border-bottom: 1px solid #e2e2e2">
        <p style="font-weight: bolder; font-size: large; width: 100%; margin-left: 0; margin-top: 3%; margin-bottom: 3%">
          <span style="font-size: x-large; font-weight: bolder">
            &nbsp;수강 과목&nbsp;
          </span>
          <span style="color: gray">
          (2020학년도 2학기)
          </span>
        </p>
        </thead>
        <tbody style="text-align:left">
        <tr  v-for="item in class_list" :key="item">
          <td class="border4" style="margin-bottom: 1%">&nbsp;{{ item.sname}} ({{ item.stime}})</td>
          <td class="border5">
                <button style="background-color: #ffac71; border: 2px solid #ffac71; border-radius: 5px; color: white; font-weight: bold" v-on:click="go_notice(item.snum)">공지사항</button>
        </tr>
        </tbody>
      </table>
    </div>
    </transition>

    <transition name="insert" appear>
      <div style="grid-column: 43/51; grid-row: 19/22;">
        <b-form-select v-on:change="formchange" v-model="selected" :options="options"></b-form-select>
      </div>
    </transition>

    <transition name="insert" appear>
    <div class="three" style="background-color: white">
      <div v-for="(item,index) in class_list" :style="[index === 0? {backgroundColor:'#FFA7A7'}: index===1 ?
            {backgroundColor:'#B7F0B1'}: index===2 ? {backgroundColor: '#B5B2FF'} : index===3 ? {backgroundColor:'#FFB2F5'} : index===4 ? {backgroundColor:'#D1B2FF'}  : index===5 ?
             {backgroundColor:'#FFE08C'} : index === 6 ?  {backgroundColor:'#B2EBF4'} :  {backgroundColor:'green'}
            ,{gridColumnStart:item.grid_time.split(',')[2], gridColumnEnd:item.grid_time.split(',')[3],
            gridRowStart:item.grid_time.split(',')[0], gridRowEnd:item.grid_time.split(',')[1]}]">{{item.sname}}
      </div>
      <div v-for="(item,index) in class_list" :style="[index === 0? {backgroundColor:'#FFA7A7'}: index===1 ?
            {backgroundColor:'#B7F0B1'}: index===2 ? {backgroundColor:'#B5B2FF'} : index===3 ? {backgroundColor:'#FFB2F5'} : index===4 ? {backgroundColor:'#D1B2FF'}  : index===5 ?
             {backgroundColor:'#FFE08C'} : index === 6 ?  {backgroundColor:'#B2EBF4'} :  {backgroundColor:'green'}
            ,{gridColumnStart:item.grid_time.split(',')[6], gridColumnEnd:item.grid_time.split(',')[7],
            gridRowStart:item.grid_time.split(',')[4], gridRowEnd:item.grid_time.split(',')[5]}]">{{item.sname}}
      </div>
      <table class="timetable" style="grid-area:1/1/59/38; height: 100%; width: 100%;">
        <tr style="height: 6.9%;">
          <td style="width: 5.1%;">시간</td>
          <td style="width: 19.1%;">월</td>
          <td style="width: 18.9%;">화</td>
          <td style="width: 18.9%;">수</td>
          <td style="width: 18.9%;">목</td>
          <td style="width: 18.9%;">금</td>
        </tr>
        <tr style="height: 15.5%;">
          <td style="width: 5.1%;">1</td>
          <td style="width: 19%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 19%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 18.9%;"></td>
        </tr>
        <tr style="height: 15.5%;">
          <td style="width: 5.1%;">2</td>
          <td style="width: 19.1%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 19%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 18.9%;"></td></tr>
        <tr style="height: 15.5%;">
          <td style="width: 5.1%;">3</td>
          <td style="width: 19.1%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 19%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 18.9%;"></td>
        </tr>
        <tr style="height: 15.6%;">
          <td style="width: 5.1%;">4</td>
          <td style="width: 19.1%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 19%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 18.9%;"></td></tr>
        <tr style="height: 15.6%;">
          <td style="width: 5.1%;">5</td>
          <td style="width: 19.1%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 19%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 18.9%;"></td>
        </tr>
        <tr style="height: 15.5%;">
          <td style="width: 5.1%;">6</td>
          <td style="width: 19.1%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 19%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 18.9%;"></td></tr>
      </table>
    </div>
    </transition>
  </div>
</template>

<script>
  import Left from "./leftsidebar";
  import user from "./userinfo";

  export default {
    components:{
      Left,
      user
    },
    data() {
      return {
        friend_id:'',
        class_list:[{snum:'', sname:'', grid_time:''}],
        notice_list:[],
        friend_table:[],
        semester: '20-2',
        selected: '20-2',
        options: [
          { value: '20-2', text: '20-2학기' },
          { value: '20-1', text: '20-1학기' },
          { value: '19-2', text: '19-2학기' },
          { value: '19-1', text: '19-1학기' },
          { value: '18-2', text: '18-2학기' },
          { value: '18-1', text: '18-1학기' }
        ]
      }
    },
    computed: {
      user: function () {
        return parseInt(this.$store.state.user.pid);
      }
    },
    created() {
      this.$http.post('/maintable/main', {user: this.user, semes: this.semester}).then((response) => {
        this.class_list = response.data.rows2;
        this.notice_list = response.data.notice;
      })
    },
    methods: {
      go_notice: function (data){
        this.$router.push({name: 'notice', params: {snum: data}});
      },
      formchange: function() {
        this.$http.post('/maintable/seme', {user: this.user, semes: this.selected}).then((response) => {
          this.class_list = response.data;
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/basicstyle.scss';
  @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;500&display=swap');
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

  .timetable{
    /*border:1px solid gray;*/
    /*border-collapse: collapse*/
  }
  .timetable th, .timetable td{
    border: 2px solid #f8f9fa;
    text-align: center
  }
  .geul {
    grid-column: 14/51;
    grid-row: 9 / 21;
    font-family: 'Heebo', sans-serif;
    font-size: 42px;
    font-weight: 400;
    color: white;
  }
  .insert-item {
    display: inline-block;
    margin-right: 10px;
  }
  .insert-enter-active, .insert-leave-active {
    transition: all 1s;
  }
  .insert-enter, .insert-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
