<template>
  <div class="left" style="background-color:white">

    <img src="../assets/Bluemango_logo.png" alt="Logo" title="bluemango" style="margin-top: 5%; margin-left:15%; margin-bottom:10%; width: 70%">
    <ul class="mylist">
      <li><router-link to="/main">
        <b-icon icon="house-door-fill" style = "color: #7952b3;"></b-icon>&nbsp;&nbsp;&nbsp;메인
      </router-link></li>
      <li><router-link to="/enroll">
        <b-icon icon="bookmark-check-fill" style = "color: #4BA0B5"></b-icon>&nbsp;&nbsp;&nbsp;수강 신청
      </router-link></li>
      <li><router-link to="/result">
        <b-icon icon="book-fill" style = "color: #EA3323"></b-icon>&nbsp;&nbsp;&nbsp;학습 결과
      </router-link></li>
      <li><router-link to="/ranking">
        <b-icon icon="award-fill" style = "color: #F3C955"></b-icon>&nbsp;&nbsp;&nbsp;석차 조회
      </router-link></li>
      <li @click="$bvToast.show('example-toast')" style="color:#808080">
        <b-icon icon="card-list" style = "color: #C3EEB7"></b-icon>&nbsp;&nbsp;&nbsp;친구 신청 목록
      </li>
    </ul>
    <b-toast id="example-toast" title="친구 신청 목록" static no-auto-hide>
      <table class="card-table table">
        <thead class="thead-light" style="text-align:center">
        <tr>
          <th scope="col" colspan="1" class="border">ID</th>
          <th scope="col" colspan="2" class="border">수락/거절</th>
        </tr>
        </thead>
        <tbody style="text-align:center">
        <tr v-for="item in $store.state.apply_list">
          <td class="border">{{ item.friend_pid }}<br>{{ item.name }}</td>
          <td class="border">
            <b-button-group>
              <b-button size="sm" variant="success" v-on:click="accept_friend(item.friend_pid, item.name)">
                <b-icon icon="check"></b-icon>
              </b-button>
              <b-button size="sm" variant="danger" v-on:click="reject_friend(item.friend_pid)">
                <b-icon icon="x"></b-icon>
              </b-button>
            </b-button-group>
          </td>
        </tr>
        </tbody>
      </table>
    </b-toast>



    <hr color="gray" size="3px" width="80%">
    <br>

    <b-form-input  v-model="friend_id" placeholder="Enter Friend_id" style="width:53%; margin-left:5%;margin-right:5%; display:inline-block; height:4%"></b-form-input>
    <b-button variant="outline-info" v-on:click="add_friend" style="width:30%; font-size:small; font-weight :bold; height:4%;">
      신청 <b-icon icon="search" aria-hidden="true"></b-icon>
    </b-button>



    <b-dropdown variant="outline-primary" text="친구 목록"  style="margin-left:5%; margin-top:10%; width:90%;  " >
      <b-dropdown-item v-for='list in $store.state.friend_list' @click="$bvToast.show('friendtable-toast')" v-on:click="calltable(list.pid)">
        {{list.pid + ' - ' + list.name}}
      </b-dropdown-item>
    </b-dropdown>
    <b-toast id="friendtable-toast" title="친구 시간표" no-auto-hide >
      <div v-if="this.friend_table !== NULL" style="display: grid; grid-template-columns: repeat(40, 1fr);
  grid-template-rows: repeat(60, 1fr); ">
        <table style="grid-area:1/1/59/38; height: 100%; width: 100%;">
          <tr style="height: 3%">
            <td style="width: 5.4%; text-align: center"></td>
            <td style="width: 18.9%; text-align: center">월</td>
            <td style="width: 18.9%; text-align: center">화</td>
            <td style="width: 18.9%; text-align: center">수</td>
            <td style="width: 18.9%; text-align: center">목</td>
            <td style="width: 18.9%; text-align: center">금</td>
          </tr>
          <tr style="height: 15.5%; text-align: center"><td>1</td></tr>
          <tr style="height: 15.5%; text-align: center"><td>2</td></tr>
          <tr style="height: 15.5%; text-align: center"><td>3</td></tr>
          <tr style="height: 15.5%; text-align: center"><td>4</td></tr>
          <tr style="height: 15.5%; text-align: center"><td>5</td></tr>
          <tr style="height: 15.5%; text-align: center"><td>6</td></tr>
        </table>
        <div v-for="(item,index) in friend_table" :style="[index === 0? {backgroundColor:'#FFA7A7'}: index===1 ?
            {backgroundColor:'#B7F0B1'}: index===2 ? {backgroundColor: '#B5B2FF'} : index===3 ? {backgroundColor:'#FFB2F5'} : index===4 ? {backgroundColor:'#D1B2FF'}  : index===5 ?
             {backgroundColor:'#FFE08C'} : index === 6 ?  {backgroundColor:'#B2EBF4'} :  {backgroundColor:'green'}
            ,{gridColumnStart:item.grid_time.split(',')[2], gridColumnEnd:item.grid_time.split(',')[3],
            gridRowStart:item.grid_time.split(',')[0], gridRowEnd:item.grid_time.split(',')[1]}]">{{item.sname}}
        </div>
        <div v-for="(item,index) in friend_table" :style="[index === 0? {backgroundColor:'#FFA7A7'}: index===1 ?
            {backgroundColor:'#B7F0B1'}: index===2 ? {backgroundColor:'#B5B2FF'} : index===3 ? {backgroundColor:'#FFB2F5'} : index===4 ? {backgroundColor:'#D1B2FF'}  : index===5 ?
             {backgroundColor:'#FFE08C'} : index === 6 ?  {backgroundColor:'#B2EBF4'} :  {backgroundColor:'green'}
            ,{gridColumnStart:item.grid_time.split(',')[6], gridColumnEnd:item.grid_time.split(',')[7],
            gridRowStart:item.grid_time.split(',')[4], gridRowEnd:item.grid_time.split(',')[5]}]">{{item.sname}}
        </div>
      </div>
      <div v-else>시간표가 없다</div>
    </b-toast>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.db_init();
  },
  data() {
    return {
      semester: '20-2',
      friend_table: [],
      friend_id:''
    }
  },
  computed: {
    user: function () {
      return parseInt(this.$store.state.user.pid);
    }
  },
  methods: {
    db_init: function() {
      this.$http.post('/maintable', {user: this.user, semes:this.semester}).then((response) => {
        let db_result = response.data;
        console.log(db_result);
        this.$store.commit("set_friend", db_result.friend_list);
        this.$store.commit("set_apply", db_result.apply_list);
      })
    },
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
      console.log(name);
      this.$store.commit("del_apply", data);
      this.$http.post('/maintable/accept', {friend_pid: data, user: this.user}).then((response) => {
        if(response.data.result[0]==='error') {
          alert('친구 수락 실패');
        }
        else{
          alert('친구 수락 성공');
          this.$store.commit("add_friend", {pid: data, name: name});
          console.log("friend_list"+ this.friend_list);
        }
      })
    },
    reject_friend: function (data) {
      this.$http.post('/maintable/reject', {friend_pid: data, user: this.user});
      this.$store.commit("del_apply", data);
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
