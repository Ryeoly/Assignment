<template>
  <div class="wrapper">
    <div class="one" ></div>
    <left></left>
    <user></user>

    <div class = "resulttb">
      <b-card>
        <h4 class="card-title">석차 조회</h4>
        <table class="card-table table">
          <thead class="thead-light" style="text-align:center">
          <tr>
            <th scope="col" class="border">학과/학부</th>
            <th scope="col" class="border">학번</th>
            <th scope="col" class="border">이름</th>
          </tr>
          </thead>
          <tbody style="text-align:center">
          <tr>
            <td class="border">{{major[this.db_user[0].pmajor]}}</td>
            <td class="border">{{this.db_user[0].pid}}</td>
            <td class="border">{{this.db_user[0].name}}</td>
          </tr>
          </tbody>
        </table>

        <br>
        <br>
        <div class="forselect">
          <b-form-select v-on:change="formchange" v-model="selected" :options="options"></b-form-select>
        </div>

        <table class="card-table table">
          <thead class="thead-light" style="text-align:center">
          <tr>
            <th scope="col" class="border">년도</th>
            <th scope="col" class="border">학기</th>
            <th scope="col" class="border">신청학점</th>
            <th scope="col" class="border">총점</th>
            <th scope="col" class="border">평점</th>
            <th scope="col" class="border">학과석차</th>
          </tr>
          </thead>
          <tbody style="text-align:center">
          <tr>
            <td class="border">{{this.year}}</td>
            <td class="border">{{this.sem}}</td>
            <td class="border">{{this.db_score.hakjum}}</td>
            <td class="border">{{this.totals}}</td>
            <td class="border">{{this.average_grade}}</td>
            <td class="border">{{this.db_score.ranking + '/' + this.db_score.totalcount}}</td>
          </tr>
          </tbody>
        </table>

      </b-card>
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
  computed: {
    user: function () {
      return parseInt(this.$store.state.user.pid);
    }
  },
  created() {
    this.$http.post('/ranking', {user: this.user, selected: this.selected}).then((response) => {
      this.db_result = response.data;
      console.log(response.data);
      if (this.db_result.db_user.length !==0){
        this.db_user = this.db_result.db_user;
      }

      if (this.db_result.db_score.length !==0){
        const idx = this.db_result.db_score.findIndex(i=>i.pid === parseInt(this.user));
        if (idx > -1) {
          this.db_score = this.db_result.db_score[idx];
          this.year = '20'+this.db_score.semester.split('-')[0];
          this.sem = this.db_score.semester.split('-')[1];
          this.totals = this.db_score.avofav.toPrecision(2);
          this.average_grade = this.db_score.avg_grade.toPrecision(2);
        }
        console.log(idx);
        console.log(this.db_score);
      }
    })
  },
  data() {
    return {
      year:'',
      sem:'',
      average_grade:0,
      totals:0,
      selected:'20-2',
      db_result: [],
      db_score:[{pid:'', pmajor:'', ranking:'', semester:'-',avg_grade:0, hakjum:'', avofav:'', totalcount:''}],
      db_user: [{pmajor:'', pid:'null', pname:'null'}],
      major:{
        '': ' ',
        722: '컴퓨터정보공학부',
        700: '소프트웨어학과',
        500: '전자공학과',
        100: '국어국문학과',
        400: '영어영문학과',
        999: '전체공통'
      },
      options: [
        { value: '20-2', text: '20-2' },
        { value: '20-1', text: '20-1' },
        { value: '19-2', text: '19-2' },
        { value: '19-1', text: '19-1' },
        { value: '18-2', text: '18-2' },
        { value: '18-1', text: '18-1' }
      ],
    }
  },
  methods:{
    formchange: function() {
      console.log("selected="+this.selected);
      this.$http.post('/ranking', {user: this.user, selected: this.selected}).then((response) => {
        this.db_result = response.data;
        if (this.db_result.db_score.length !==0){
          const idx = this.db_result.db_score.findIndex(i=>i.pid === parseInt(this.user));
          if (idx > -1) {
            this.db_score = this.db_result.db_score[idx];
            this.year = '20'+this.db_score.semester.split('-')[0];
            this.sem = this.db_score.semester.split('-')[1];
            this.totals = this.db_score.avofav.toPrecision(2);
            this.average_grade = this.db_score.avg_grade.toPrecision(2);
          }
        }
        else{
          this.db_score = [{pid:'', pmajor:'', ranking:'', semester:'-',avg_grade:0, hakjum:'', avofav:'', totalcount:''}];
          this.year = '';
          this.sem = '';
          this.average_grade = 0;
        }
      })
    }
  }
}
</script>

<style lang="scss">
.resulttb {
  grid-column: 15/75;
  grid-row: 23/100;
  max-width: 100%;
  height: auto !important;
  overflow: scroll;
}
.forselect{
  width:10%;
  float:right;
}
</style>
