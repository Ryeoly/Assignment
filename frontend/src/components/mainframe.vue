<template>
  <div class="wrapper">
    <div class="one" style="text-align: right; color:white">2016722021 윤인석</div>



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





    <div class="four" style="background-color:white">

      <img src="../assets/Bluemango_logo.jpeg" alt="Logo" title="bluemango">
      <ul class="mylist">
        <li><router-link to="/main">메인</router-link></li>
        <li><router-link to="/enroll">수강 신청</router-link></li>
        <li><router-link to="/result">학습 결과</router-link></li>
        <li @click="$bvToast.show('example-toast')">친구 신청 목록</li>
      </ul>
      <b-toast id="example-toast" title="친구 신청 목록" static no-auto-hide>
        <table class="card-table table">
          <thead class="thead-light" style="text-align:center">
          <tr>
            <th scope="col" colspan="1" class="border">ID</th>
            <th scope="col" colspan="1" class="border">이름</th>
            <th scope="col" colspan="2" class="border">수락/거절</th>
          </tr>
          </thead>
          <tbody style="text-align:center">
          <tr v-for="item in apply_list">
            <td class="border">{{ item.friend_pid }}</td>
            <td class="border">{{ item.name }}</td>
            <td class="border">
              <b-button size="sm" v-on:click="accept_friend(item.friend_pid, item.name)">수락</b-button>
              <b-button size="sm" v-on:click="reject_friend(item.friend_pid)">거절</b-button>
            </td>
          </tr>
          </tbody>
        </table>
      </b-toast>



      <hr color="gray" size="3px" width="80%">
      <b-form-input v-model="friend_id" placeholder="Enter Friend_id"></b-form-input>
      <button v-on:click="add_friend" class=”btn-sm“>친구 신청</button>




      <hr color="gray" size="3px" width="80%">
      <b-dropdown text="친구 목록" class="m-md-2">
        <b-dropdown-item v-for='list in this.db_result.friend_list' @click="$bvToast.show('friendtable-toast')" v-on:click="calltable(list.pid)">
          {{list.pid + ' - ' + list.name}}
        </b-dropdown-item>
      </b-dropdown>
      <b-toast id="friendtable-toast" title="친구 시간표" no-auto-hide >
        <div v-if="this.friend_table !== NULL" style="display: grid; grid-template-columns: repeat(40, 1fr);
  grid-template-rows: repeat(60, 1fr); ">
          <div v-for="(item,index) in friend_table" :style="[index === 0? {backgroundColor:'#D9E4BF'}: index===1 ?
            {backgroundColor:'#DDE5F0'}: index===2 ? {backgroundColor: '#F5D5B7'} : index===3 ? {backgroundColor:'#E0E0E0'} : index===4 ? {backgroundColor:'#F4F4F4'}  : index===5 ?
             {backgroundColor:'purple'} : index === 6 ?  {backgroundColor:'gray'} :  {backgroundColor:'green'}
            ,{gridColumnStart:item.grid_time.split(',')[2], gridColumnEnd:item.grid_time.split(',')[3],
            gridRowStart:item.grid_time.split(',')[0], gridRowEnd:item.grid_time.split(',')[1]}]">{{item.sname}}
          </div>
          <div v-for="(item,index) in friend_table" :style="[index === 0? {backgroundColor:'#D9E4BF'}: index===1 ?
            {backgroundColor:'#DDE5F0'}: index===2 ? {backgroundColor:'#F5D5B7'} : index===3 ? {backgroundColor:'#E0E0E0'} : index===4 ? {backgroundColor:'#F4F4F4'}  : index===5 ?
             {backgroundColor:'purple'} : index === 6 ?  {backgroundColor:'gray'} :  {backgroundColor:'green'}
            ,{gridColumnStart:item.grid_time.split(',')[6], gridColumnEnd:item.grid_time.split(',')[7],
            gridRowStart:item.grid_time.split(',')[4], gridRowEnd:item.grid_time.split(',')[5]}]">{{item.sname}}
          </div>
        </div>
        <div v-else>시간표가 없다</div>
      </b-toast>

    </div>
  </div>
</template>



<script>
  export default {
    // 시간표 디비 스크립트 시작
    // 시간표 디비 스크립트 종료
    data() {
      return {
        friend_id:'',
        friend_list:[],
        apply_list:[],
        user : '2016722001',
        db_result:[],
        class_list:[],
        notice_list:[],
        friend_table:[],
        semester: '1-1'
      }
    },

    created(){
      this.$http.post('/maintable', {user: this.user, semes:this.semester}).then((response) => {
        this.db_result = response.data;
        if(this.db_result.friend_list.length!==0)
          this.friend_list = this.db_result.friend_list;
        if(this.db_result.rows2.length!==0)
          this.class_list = this.db_result.rows2;
        if(this.db_result.apply_list.length!==0)
          this.apply_list = this.db_result.apply_list;
        if(this.db_result.notice.length!==0)
          this.notice_list = this.db_result.notice;
      })
    },

    methods: {
      add_friend: function(){
        this.$http.post('/maintable/add_friend', {user: this.user, friend: this.friend_id}).then((response) => {
          if(response.data.result[0]==='error'){
            alert('친구 신청 실패(존재하지 않는 pid)');
          }
          else if(response.data.result[0]==='success'){
            alert('친구 신청 성공');
          }
          else if(response.data.result[0]==='already'){
            alert('이미 친구 입니다.');
          }
          else if(response.data.result[0]==='already_apply'){
            alert('이미 친구 신청 했습니다.');
          }
          else if(response.data.result[0]==='same'){
            alert('자기 자신은 친구로 할 수 없습니다');
          }
        });
      },
      accept_friend: function (data, name) {
        this.$http.post('/maintable/accept', {friend_pid: data, user: this.user}).then((response) => {
          if(response.data.result[0]==='error') {
            alert('친구 수락 실패');
            const idx = this.apply_list.findIndex(i=>i.friend_pid === data);
            if (idx > -1)
              this.apply_list.splice(idx, 1)        //삭제
          }
          else{
            alert('친구 수락 성공');
            const idx = this.apply_list.findIndex(i=>i.friend_pid === data);
            if (idx > -1)
              this.apply_list.splice(idx, 1)        //삭제
            console.log("idx = " + idx + "apply_list : " + this.apply_list);
            this.friend_list.push({name: name, pid : data});     //추가
            console.log("name : " + name + "pid : " + data);
            console.log("friend_list"+ this.friend_list);
          }
        })
      },
      reject_friend: function (data) {
        this.$http.post('/maintable/reject', {friend_pid: data, user: this.user}).then((response) => {
        })
        const idx = this.apply_list.findIndex(i=>i.friend_pid === data);
        if (idx > -1)
          this.apply_list.splice(idx, 1)        //삭제
        alert('친구 수락 거절');
      },
      calltable: function(f_pid){
        this.$http.post('/maintable/calltable', {friend_pid : f_pid, semes: this.semester}).then((response) => {
          this.friend_table = response.data;
        });
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
