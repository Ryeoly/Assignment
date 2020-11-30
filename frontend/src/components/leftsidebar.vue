<template>
  <div class="left" style="background-color:white" >
    <img src="../assets/Bluemango_logo.png" alt="Logo" title="bluemango" style="width: 100%">
    <ul class="mylist">
      <li><router-link to="/main">메인</router-link></li>
      <li><router-link to="/enroll">수강 신청</router-link></li>
      <li><router-link to="/result">학습 결과</router-link></li>
      <li><router-link to="/ranking">석차 조회</router-link></li>
      <li @click="$bvToast.show('example-toast')">친구 신청 목록</li>
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
    <b-form-input v-model="friend_id" placeholder="Enter Friend_id"></b-form-input>
    <button v-on:click="add_friend" class=”btn-sm“>친구 신청</button>




    <hr color="gray" size="3px" width="80%">
    <b-dropdown text="친구 목록" class="m-md-2">
      <b-dropdown-item v-for='list in $store.state.friend_list' @click="$bvToast.show('friendtable-toast')" v-on:click="calltable(list.pid)">
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
