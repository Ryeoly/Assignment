<template>
  <div class="wrapper">
    <div class="view-board">
      <p style="font-size: 24px; font-weight: bolder; margin-left: 5%;">강의 공지사항</p>
      <form>
        <table class="view-table">
          <colgroup>
            <col width="15%" />
            <col width="*"/>
          </colgroup>
          <tr>
            <th>제목</th>
            <td>{{db_result[0].title}}</td>
          </tr>
          <tr>
            <th>작성자</th>
            <td>{{db_result[0].writer}}</td>
            <th>작성일</th>
            <td>{{$moment(db_result[0].date).format('YYYY-MM-DD HH:mm:ss')}}</td>
          </tr>
          <tr>
            <th>첨부 파일</th>
            <td>{{db_result[0].file}}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td class="txt-cont">{{db_result[0].content}}</td>
          </tr>
        </table>
      </form>
      <div class="Comment-div" v-if="View_Comment">
        <ul class="Comment_border" v-for="item in Comment_list" :key="item">
          <li class="Comment">{{item.comment}}<br><br> </li>
          <li class="date">  작성일: {{$moment(item.date).format('YYYY-MM-DD HH:mm:ss')}}</li>
          <li class="writer"> 작성자: {{item.pid}} {{item.name}} </li>
        </ul>
        <p class="Comment-title"> 댓글 달기 </p>

        <b-form-textarea class="Comment-input" v-model="Comment" placeholder="Comment.."></b-form-textarea>
        <button type="button" class="input-comment" v-on:click="Comment_input">댓글올리기</button>

      </div>
      <button type="button" class="go-list" v-on:click="go_list">목록</button>
      <button type="button" class="go-comment" v-on:click="Comment_lookup">댓글보기</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'view',
    data(){
      return{
        db_result: [{title:'', writer:'',content:'', file:'', date:'', hit:'', snum:''}],
        Comment_list: [],
        View_Comment: false,
        Comment: "",
        pid: "2020722002" //임시로 둔 댓글을 쓰는 사용자의 pid
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
        this.$http.post('/viewdetail/input', {comment: this.Comment, pid: this.pid, index: this.db_result[0].idx}).then((response) => {
          console.log("data "+response.data[0]);
          this.Comment_list.push({pid: this.pid , comment: response.data[0].comment, date: response.data[0].date, name: response.data[0].name});
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
    overflow: scroll;
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
  .view-table {
    border-top:1px solid #888;
    width: 100%;
    margin-right: 1%;
  }
  .view-table th, .view-table td{
    border-bottom:1px solid #eee; padding:1% 0;
  }
  .view-table td{
    padding: 2% 2% ; box-sizing: border-box;  text-align: left;
  }
  .view-table td.txt-cont{
    vertical-align:top;
    max-width: 300px;
    height: 300px;
  }
  .view-board .go-list{
    text-align: center;
    font-weight: bolder;
    font-size: 98%;
    width:13%;
    height: 6%;
    color: #ffffff;
    font-family: 새굴림,serif;
    background-color: #5e72e4;
    border:2px;
    border-radius: 5%;
    margin-left: 38%;
    margin-top: 2%;
    margin-bottom: 5%;
  }
  .view-board .go-comment{
    text-align: center;
    font-weight: bolder;
    font-size: 98%;
    width:13%;
    height: 6%;
    color: darkgrey;
    font-family: 새굴림,serif;
    border-radius: 5%;
    background-color: lightgrey;
    margin-top: 2%;
    margin-bottom: 5%;
  }
  .view-board .Comment-div{
    background-color: white;
    padding-top: 3%;
  }
  .view-board .Comment-input{
    width : 70%;
    height : 100px;
    margin-left: 8%;
    box-sizing: border-box;
    box-shadow: 0 0 3px ;
    border: 1px solid #5e72e4;
    font-size: 16px;
    padding: 3%;
  }
  .view-board .Comment-div{

  }
  .Comment-div .Comment{
    margin-left: 5%;
  }
  .Comment-div .writer, .Comment-div .date{
    margin-left: 75%;
  }
  .Comment-div .Comment_border{
    border-top: 1px;
    border-bottom: 1px;
    border-bottom-color: lightgrey;
    border-top-color: lightgrey;
  }
  .view-board .Comment-title {
    margin-left: 8%;
    font-weight: bolder;
    color: darkgrey;
  }
  .Comment-div .input-comment {
    margin-bottom: 3%;
    text-align: center;
    color: #5758bb;
    font-family: 새굴림,serif;
    background-color: lightgrey;
    border:2px;
    border-radius: 5%;
    width:10%;
    height: 4%;
    font-size: 98%;
  }
</style>
