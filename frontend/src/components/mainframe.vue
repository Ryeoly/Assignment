<template>
  <div class="wrapper">

    <div class="one"></div>

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
    <user></user>

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
        friend_table:[],
        semester: '20-2',
        class_list: [],
        notice_list: []
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


</style>
