<template>
  <div class="wrapper">
    <div class="notice" style="background-color: white">

      <p style="font-size: 24px;" >강의 공지사항</p>


      <table class="n-list">
        <thead>
        <tr class="list-head">
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
          <td> {{ (pageNum * 10)+index}} </td>
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
      <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
        이전
      </button>
      <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
        다음
      </button>
    </div>



    <div class="searchbox">
      <b-dropdown text="강의 목록" class="m-md-2">
        <b-dropdown-item v-for='list in this.subject_list'>
          <router-link  v-bind:to="{name: 'notice', params: {snum: list.snum}}">{{ list.sname }}</router-link>
        </b-dropdown-item>
      </b-dropdown>

      <font-awesome-icon class = "icon" ria-hidden="true" icon="search"/>
      <b-form-input v-model="Title" placeholder="제목을 입력하세요"></b-form-input>
      <b-button v-on:click="search">검색</b-button>
    </div>
    <div class="professor-info">
      <table class="card-table table">
        <thead class="thead-light" style="text-align:center">
        <tr>
          <th scope="col" colspan="1" class="border">교수님 이름</th>
          <th scope="col" colspan="1" class="border">교수님 전화번호</th>
          <th scope="col" colspan="1" class="border">교수님 이메일</th>
        </tr>
        </thead>
        <tbody style="text-align:center">
        <tr>
        <tr>
          <td class="border">{{ this.prof_result[0].name}}</td>
          <td class="border">{{ this.prof_result[0].tel}}</td>
          <td class="border">{{this.prof_result[0].email}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <img src="../assets/professor.png" class="professor-img" alt="picture" title="prof">
  </div>
</template>



<script>

export default {
  name: 'notice',
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
      user:'2016722001',      //기홍이형이 보내줄거
      semester:'1-1',         //이거갖고있어야되는 현재 학기
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
    }
  },
  computed: {
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
<style>
@import '../style/basicstyle.scss';

.wrapper {
  display: grid;
  grid-template-columns: repeat(77, 1fr);
  grid-template-rows: repeat(100, 1fr);
  height: 100vh;
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
  grid-column: 32 / 52;
  grid-row: 89 / 93;
  background-color: white;
}
.page-btn {
  width: 5rem;
  height: 2rem;
  letter-spacing: 0.5px;
}
.page-count {
  padding: 0 1rem;
}
.select-subject {
  grid-column: 46 / 53;
  grid-row: 26 / 30;
  background-color: white;
}
.searchbox {
  grid-column: 54 / 65;
  grid-row: 26 / 30;
  background-color: white;
  width: 200px;
  vertical-align: middle;
  white-space: nowrap;
  position: relative;

}
.searchbox input {
  width: 200px;
  height: 40px;
  border: 1px solid #5e72e4;
  font-size: 13pt;
  float: left;
  color: #5e72e4;
  padding-left: 45px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;

}
.searchbox input::-webkit-input-placeholder {
  color: #5e72e4;
}
.searchbox input::-moz-placeholder {
  color: #5e72e4;
}
.searchbox input::-moz-placeholder {
  color: #5e72e4;
}
.searchbox input:-ms-input-placeholder{
  color: #5e72e4;
}
.searchbox .icon {
  position: absolute;
  margin-left: 17px;
  margin-top: 13px;
  color: #5e72e4;
}
.professor-info {
  grid-column: 66 / 77;
  grid-row: 25 / 70;
  background-color: white;
  border-radius: 5px 5px 5px 5px;
}
.professor-img {
  grid-column: 69/74;
  grid-row: 19/26;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
p.click-list {
  text-align: right;
}
table.n-list {
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 40px;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px;
  text-align: left;
  line-height: 1.5;
  border-top: 1px solid #ccc;
}
table.n-list th {
  width: 150px;
  padding: 10px;
  font-weight: bold;
  vertical-align: top;
  border-bottom: 1px solid #ccc;
}
table.n-list td {
  width: 350px;
  padding: 10px;
  vertical-align: top;
  border-bottom: 1px solid #ccc;
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
  max-width: 100%;
  height: auto !important;
  line-height: 0px;
}




/*.Drop-down {*/
/*  position: absolute;*/
/*}*/

</style>
