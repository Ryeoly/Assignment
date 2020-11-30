<template>
  <div class="wrapper">
    <div class="one"></div>

    <left></left>           <!-- 여기가 left바-------------------------------------------------------------------------------------- -->
    <user></user>

    <div class="view-board">
      <p style="font-size: xx-large; font-weight: bolder;">강의 공지사항</p>
      <div class="board-view-header" >
        <h3 style="font-weight: bolder">{{db_result[0].title}}</h3>
        <div class="board-viewinfo" style="font-size: small">
          <span>작성자:</span> {{db_result[0].writer}}&nbsp;
          <span>등록일:</span> {{$moment(db_result[0].date).format('YYYY-MM-DD HH:mm')}}&nbsp;
          <span>조회수:</span> {{db_result[0].hit}}&nbsp;
        </div>
      </div>
      <div class="board-view-file">
          <span style="margin-left: 80%; margin-top: 3%">첨부파일: {{db_result[0].file}}<br><br></span>
      </div>
      <div class="board-view-content" style="height: 50%; border-bottom: 1px">
        {{db_result[0].content}}
    </div>
      <div class="Comment-div" v-if="View_Comment">
        <ul class="Comment_border" v-for="item in Comment_list" :key="item" style="border-top: 1px solid #e2e2e2; margin-bottom: 0">
          <li style="font-weight: bolder">{{item.name}}({{item.pid}})
          <li>{{item.comment}}</li>
          <li style="color: darkgrey; margin-left: 80%">{{$moment(item.date).format('YYYY-MM-DD HH:mm:ss')}}</li>
        </ul>
        <p class="Comment-title" style="margin-top: 5%"> 댓글 달기 </p>
        <b-form-textarea class="Comment-input" v-model="Comment" placeholder="Comment.."></b-form-textarea>
        <b-button type="button" class="btn btn-info" v-on:click="Comment_input">댓글올리기</b-button>
      </div>
      <button type="button" class="btn btn-outline-secondary" v-on:click="go_list" style="margin-bottom: 1%; margin-top: 5%">목록</button>
      <button type="button" class="btn btn-outline-primary" v-on:click="Comment_lookup" style="margin-bottom: 1%; margin-top: 5%">댓글보기</button>
    </div>
  </div>
</template>

<script>
import Left from "./leftsidebar";
import user from "./userinfo";

export default {
  name: 'view',
  components:{
    Left,
    user
  },
  computed: {
    user: function () {
      return parseInt(this.$store.state.user.pid);
    }
  },
  data(){
    return{
      db_result: [{title:'', writer:'',content:'', file:'', date:'', hit:'', snum:''}],
      Comment_list: [],
      View_Comment: false,
      Comment: ""
    }
  },
  props: {
    index:{
      type: String,
      default : ''
    }
  },
  created() {
    console.log('index: '+this.index);
    this.$http.post('/viewdetail', {index: this.index}).then((response) => {
      if(response.data.length!==0)
        this.db_result = response.data;
      console.log('data: '+response.data);
    })
  },
  methods: {
    Comment_input: function (){
      if(!this.Comment){
        // 공백 입력시 예외 처리
        return;
      }
      this.$http.post('/viewdetail/input', {comment: this.Comment, pid: this.user, index: this.db_result[0].idx}).then((response) => {
        console.log("data "+response.data[0]);
        this.Comment_list.push({pid: this.user , comment: response.data[0].comment, date: response.data[0].date, name: response.data[0].name});
      })
      this.Comment = "";
    },
    Comment_lookup: function () {
      this.View_Comment=!this.View_Comment;
      this.$http.post('/viewdetail/lookup', {index: this.index}).then((response) =>{
        if(response.data.length!==0)
          this.Comment_list = response.data;
        console.log(response.data);
      })
    },
    go_list: function(){
      this.$router.push({name:'notice', params: {snum: this.db_result[0].snum}});
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
.view-board {
  grid-column: 15 / 65;
  grid-row: 23 / 95;
  border-radius: 5px 5px 5px 5px;
  background-color: white;
  box-shadow: 0px 2px 0px lightgray;
  max-width: 100%;
  height: auto !important;
  overflow: auto;
}
.view-board .board-view-header{
  background: #f9f9f9;
  border-top: 2px #96878e solid;
  border-bottom: 1px solid #757c86;
  padding: 1rem 0;
}
.view-board::-webkit-scrollbar {
  width: 10px;
}
.view-board::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  border-radius: 10px;
  background-clip: padding-box;
  border: 2px solid transparent;
}
.view-board::-webkit-scrollbar-track {
  background-color: lightgrey;
  border-radius: 10px;
  box-shadow: inset 0px 0px 5px white;
}
.view-board .Comment-div{
  background-color: white;
  padding-top: 3%;
}
.board-viewinfo span{
  color: darkgrey;
}
.view-board .Comment-title {
  margin-left: 2%;
  font-weight: bolder;
  color: darkgrey;
}
.btn-outline-primary{
  margin-top : 10%;
  margin-left: 2%;
}
.btn-outline-secondary{
  margin-top : 10%;
  margin-left: 40%;
}
.btn-info{
  margin-left : 90%;
}


</style>
