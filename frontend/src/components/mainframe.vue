<template>
  <div class="wrapper">

    <div class="one"></div>
    <left></left>           <!-- 여기가 left바-------------------------------------------------------------------------------------- -->
    <user></user>
    <div class="five" style=" display: table; background-color: lightgrey; position: relative">
      <p class="notice-pretty" style="margin-left: 10%; font-weight: bold; border-bottom: #825ee4; border-bottom: 1px">과목별
        <span class="notice-pretty2" style="color: #825ee4">NOTICE</span>
      </p>
      <ul class="latest-notice" v-for="item in notice_list" :key="item" style="margin-left: 10%">
        <li class="border3" style="border: none; width: 100%">
          <span style="font-weight: bold; margin-left: -20%">{{$moment(item.date).format('MM/DD')}}</span>
          <span style="margin-left: 5%; font-weight: bold">{{item.sname}}</span>
          <span style="margin-left: 5%; font-weight: bold">{{item.title}}</span>
        </li>
      </ul>
    </div>

    <div class="two" style="display: table; background-color: #5758bb">
      <table class="subject-table table" style="color: #cce5ff" >
        <thead class="thead-light" style="text-align: left; height: 10px">
        <p style="font-weight: bolder; font-size: large; width: 100%">
          <span style="font-size: x-large; font-weight: bolder; margin-right: 8%; color: #cce5ff">
            2020학년도 2학기
          </span>
          수강 과목
        </p>
        </thead>
        <tbody style="text-align:left">
        <tr  v-for="(item, index) in class_list" :key="item">
          <td class="border4"><span style="font-weight: bold; color: darkgrey">{{index+1}}.</span>  {{ item.sname}} ({{ item.stime}})</td>
          <td class="border5"><router-link  style="font-size: large" v-bind:to="{name: 'notice', params: {snum: item.snum}}">공지사항</router-link></td>
        </tr>
        </tbody>
      </table>
    </div>




    <div class="three" style="background-color: #E2E2E2">
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
          <td style="width: 5.4%;">시간</td>
          <td style="width: 18.9%;">월</td>
          <td style="width: 18.9%;">화</td>
          <td style="width: 18.9%;">수</td>
          <td style="width: 18.9%;">목</td>
          <td style="width: 18.9%;">금</td>
        </tr>
        <tr style="height: 15.5%;">
          <td style="width: 5.4%;">1</td>
          <td style="width: 18.9%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 19%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 18.9%;"></td>
        </tr>
        <tr style="height: 15.5%;">
          <td style="width: 5.4%;">2</td>
          <td style="width: 18.9%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 19%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 18.9%;"></td></tr>
        <tr style="height: 15.5%;">
          <td style="width: 5.4%;">3</td>
          <td style="width: 18.9%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 19%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 18.9%;"></td>
        </tr>
        <tr style="height: 15.5%;">
          <td style="width: 5.4%;">4</td>
          <td style="width: 18.9%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 19%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 18.9%;"></td></tr>
        <tr style="height: 15.5%;">
          <td style="width: 5.4%;">5</td>
          <td style="width: 18.9%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 19%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 18.9%;"></td>
        </tr>
        <tr style="height: 15.5%;">
          <td style="width: 5.4%;">6</td>
          <td style="width: 18.9%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 19%;"></td>
          <td style="width: 18.9%;"></td>
          <td style="width: 18.9%;"></td></tr>
      </table>
    </div>
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
        semester: '20-2'
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

  .timetable{
    border:1px solid white;
    border-collapse: collapse
  }
  .timetable th, .timetable td{
    border: 1px solid white;
    text-align: center
  }

</style>
