<template>
  <div class="wrapper">
    <div class="one"></div>
    <left></left>           <!-- 여기가 left바-------------------------------------------------------------------------------------- -->
    <user></user>
    <div class="notice" style="background-color: white">
      <p style="font-size: 24px;" >강의 공지사항</p>
      <table class="table table-hover">
        <thead>
        <tr class="list-head" style="color: white">
          <th>번호</th>
          <th>제목</th>
          <th>파일</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>조회수</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in paginatedData" :key="item">
          <td> {{ (pageNum * 10)+index+1}} </td>
          <td><router-link v-bind:to="{name: 'view', params: {index:item.idx}}">{{item.title}}</router-link></td>
          <td> {{item.file}} </td>
          <td> {{item.writer}} </td>
          <td> {{$moment(item.date).format('YYYY-MM-DD HH:mm:ss')}} </td>
          <td> {{item.hit}} </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="page-button">
      <b-button :disabled="pageNum === 0" v-on:click="prevPage">
        이전
      </b-button>
      <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <b-button :disabled="pageNum >= pageCount - 1" v-on:click="nextPage">
        다음
      </b-button>
    </div>
    <div class="write-notice">
      <b-button v-on:click="write">
        글쓰기
      </b-button>
    </div>

    <div class="searchbox">
      <b-input-group size="sm" class="mb-2">
        <b-input-group-prepend is-text>
          <b-icon icon="search"></b-icon>
        </b-input-group-prepend>
        <b-form-input type="search" v-model="Title" placeholder="제목을 입력하세요"></b-form-input>
        <b-button v-on:click="search">검색</b-button>
      </b-input-group>
    </div>

    <div class="select-subject">
      <b-dropdown text="강의 목록" class="m-md-2">
        <b-dropdown-item v-for='list in this.subject_list'>
          <router-link  v-bind:to="{name: 'notice', params: {snum: list.snum}}">{{ list.sname }}</router-link>
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="professor-info">
      <p style="color: #825ee4; font-weight: bolder; text-align: center; margin-bottom: 5%; font-size: large">담당 교수님</p>
      <img src="../assets/professor.png" class="professor-img" alt="picture" title="prof" style="margin-bottom: 5%">
      <table class="card-table table" style="text-align: center">
        <tbody style="text-align:center">
        <tr>
          <th scope="col" colspan="1" class="border">성함</th>
          <td class="border">{{ this.prof_result[0].name}}</td>
        </tr>
        <tr>
          <th scope="col" colspan="1" class="border" style="font-size: small">전화번호</th>
          <td class="border">{{ this.prof_result[0].tel}}</td>
        </tr>
        <tr>
          <th scope="col" colspan="1" class="border">이메일</th>
          <td class="border">{{this.prof_result[0].email}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>



<script>
import Left from "./leftsidebar";
import user from "./userinfo";
export default {
  name: 'notice',
  components:{
    Left,
    user
  },
  created(){
    console.log('snum: '+this.snum);
    this.$http.post('/notice',{snum: this.snum, user: this.user, semester : this.semester }).then((response) =>{
      this.db_result = response.data;
      if(this.db_result.prof_inform.length!==0){
        this.prof_result = this.db_result.prof_inform;
      }
      if(this.db_result.notice_list.length!==0){
        this.notice_list = this.db_result.notice_list;
      }
      if(this.db_result.subject_list.length!==0){
        this.subject_list = this.db_result.subject_list;
      }

      console.log(this.notice_list);
      console.log(response.data)
    })
  },
  data(){
    return {
      semester:'20-2',         //이거갖고있어야되는 현재 학기
      db_result: [],
      subject_list:[],
      prof_result: [{name:'',tel:'',email:''}],
      notice_list:[],
      title: [],
      pageNum: 0,
      index: "",
      Title: "",
      selected: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ]
    }
  },
  props: {
    pageSize: {
      type: Number,
      required: false,
      default: 10
    },
    snum:{
      type: String,
      default : ''
    }
  },

  methods: {
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    },
    search : function (){
      this.$http.post('/notice/search',{Title: this.Title, snum: this.snum }).then((response) =>{
        this.notice_list=response.data;
      })
    },
    write : function() {
        this.$router.push({name: 'write'});
    }
  },
  computed: {
    user: function () {
      return parseInt(this.$store.state.user.pid);
    },
    pageCount() {
      let listLeng = this.notice_list.length,
        listSize = this.pageSize
      return Math.floor((listLeng - 1) / listSize) + 1;
    },
    paginatedData() {
      const start = this.pageNum * this.pageSize,
        end = start + this.pageSize;

      return this.notice_list.slice(start, end);
    }
  }
}
</script>
<style scoped>
@import '../style/basicstyle.scss';

.wrapper {
  display: grid;
  grid-template-columns: repeat(77, 1fr);
  grid-template-rows: repeat(100, 1fr);
  height: 100vh;
}
.one {
  grid-column: 2/78;
  grid-row: 1/28;
  border-radius: 5px 5px 5px 5px;
  background: linear-gradient(87deg, #5e72e4 0, #825ee4 100%);
  padding-top: 10px;
  padding-right: 5px;
  background-color: #5758bb;
  box-shadow: 2px 4px 2px lightgray;
  font-weight: 500;
}
.notice {
  grid-column: 15 / 65;
  grid-row: 23 / 95;
  border-radius: 5px 5px 5px 5px;
  background-color: white;
  box-shadow: 0px 2px 0px lightgray;
}
.notice p {
  font-weight: bold;
  font-family: sans-serif;
  margin-top: 20px;
  margin-left: 20px;
  width: 40%;
  padding: 0;
  color: darkgrey;
}
.page-button {
  grid-column: 35 / 55;
  grid-row: 89 / 93;
  background-color: white;
}
.page-count {
  padding: 0 1rem;
}
.write-notice{
  grid-column: 59 / 65;
  grid-row: 89 / 93;
}
.select-subject {
  grid-column: 43 / 47;
  grid-row: 25 / 29;
  background-color: white;
  margin-top: 0;
}
.searchbox {
  grid-column: 48 / 63;
  grid-row: 25 / 29;
  background-color: white;
  vertical-align: middle;
  white-space: nowrap;
  position: relative;
}
.searchbox input {
  font-size: 14pt;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
.professor-info {
  grid-column: 66 / 77;
  grid-row: 35 / 80;
  background-color: white;
  border-radius: 5px 5px 5px 5px;
  text-align: center;
}
.professor-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
tr.list-head {
  background : #5e72e4;
  font-weight: bolder;
  font-family: 새굴림,serif;
  color: darkgrey;
}
.friend-list2 li {
  width: 100%;
  list-style: none;
  line-height: 3em;
  font-family: sans-serif;
  max-height: 85px;
  overflow-y: auto;
  text-align: center;
  background-color: white;
}
img {
  max-width: 80%;
  height: auto !important;
  line-height: 0px;

}




/*.Drop-down {*/
/*  position: absolute;*/
/*}*/

</style>
