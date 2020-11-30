<template>
  <div class="wrapper">
    <div class="one" style="text-align: right; color:white">2016722021 윤인석</div>
    <left></left>

    <div class = "uptown">
      <b-card>
        <h4 class="card-title">학과별 수석 장학생</h4>
        <table class="card-table table">
          <tr>
            <td colspan="1">{{major[janghaksang[this.time].pmajor]}}</td>
            <td colspan="1">{{janghaksang[this.time].name}}</td>
          </tr>
        </table>
      </b-card>
    </div>

    <div class="resulttb" >
      <b-card >
        <h4 class="card-title">수강 성적 조회</h4>
        <table class="card-table table">
          <thead class="thead-light" style="text-align:center">
          <tr>
            <th scope="col" class="border">구분</th>
            <th scope="col" class="border">학과/학부</th>
            <th scope="col" class="border">학번</th>
            <th scope="col" class="border">이름</th>
          </tr>
          </thead>
          <tbody style="text-align:center">
          <tr>
            <td class="border">학부</td>
            <td class="border">{{major[this.db_user[0].pmajor]}}</td>
            <td class="border">{{this.db_user[0].pid}}</td>
            <td class="border">{{this.db_user[0].name}}</td>
          </tr>
          </tbody>
        </table>
        <br>

        <table class="card-table table">
          <thead class="thead-light" style="text-align:center">
          <tr>
            <th scope="col" colspan="3" class="border">신청 학점</th>
            <th scope="col" colspan="3" class="border">취득 학점</th>
            <th scope="col" colspan="2" class="border">평량 평균</th>
          </tr>
          <tr>
            <th scope="col" class="border">전공</th>
            <th scope="col" class="border">교양</th>
            <th scope="col" class="border">계</th>
            <th scope="col" class="border">전공</th>
            <th scope="col" class="border">교양</th>
            <th scope="col" class="border">계</th>
            <th scope="col" class="border">성적 증명서 기준</th>
          </tr>
          </thead>
          <tbody style="text-align:center">
          <tr>
            <td class="border">{{this.jeongong[0].first}}</td>
            <td class="border">{{this.gyoyang[0].first}}</td>
            <td class="border">{{this.jeongong[0].first + this.gyoyang[0].first}}</td>
            <td class="border">{{this.jeongong[0].second}}</td>
            <td class="border">{{this.gyoyang[0].second}}</td>
            <td class="border">{{this.jeongong[0].second + this.gyoyang[0].second}} </td>
            <td class="border">{{this.totalaverage.toPrecision(3)}}</td>
          </tr>
          </tbody>
        </table>
        <div class="forselect">
          <b-form-select v-on:change="formchange" v-model="selected" :options="options"></b-form-select>
        </div>

        <table class="card-table table">
          <thead class="thead-light" style="text-align:center">
          <tr>
            <th scope="col" class="border">과목번호</th>
            <th scope="col" class="border">과목명</th>
            <th scope="col" class="border">개설학과</th>
            <th scope="col" class="border">이수구분</th>
            <th scope="col" class="border">학점</th>
            <th scope="col" class="border">성적</th>
          </tr>
          </thead>
          <tbody style="text-align:center">
            <tr v-for="item in db_score">
                <td class="border">{{item.snum}}</td>
                <td class="border">{{item.sname}}</td>
                <td class="border">{{major[item.snum.split('-')[2]]}}</td>
                <td class="border">{{classify[item.snum.split('-')[0]]}}</td>
                <td class="border">{{item.hakjum}}</td>
                <td class="border">{{item.grade}}</td>
            </tr>
          </tbody>
        </table>

        <div class = "leftchart">
          <GChart
            type="LineChart"
            :data="chartData"
            :options="chartOptions"
            style="width:70%; margin-left:15%;"
          />
        </div>

      </b-card>
    </div>
  </div>
</template>

<script>
import Left from './leftsidebar.vue'

export default {
  components:{
    Left
  },
  created() {
    this.$http.post('/resultperson', {user: this.user, semester: this.selected, recent: this.recent_selected}).then((response) => {
      this.db_result = response.data;
      if (this.db_result.janghak.length !==0){
        this.janghaksang = this.db_result.janghak;        //장학생이 존재하는 경우에 값을 넣기.
      }
      if (this.db_result.db_score.length !==0){
        this.db_score = this.db_result.db_score;        //장학생이 존재하는 경우에 값을 넣기.
      }
      if(this.db_result.semester.length!==0){
        for(var i=(this.db_result.semester.length)-1; i>=0; i--)
          if(this.db_result.semester[i]!=='21-1')
            this.chartData.push([this.db_result.semester[i], Number(this.db_result.chartav[i])]);     //차트 만들기
      }
      else{
        this.chartData.push([' ',0]);
      }

      if (this.db_result.db_user.length !==0){
        this.db_user = this.db_result.db_user;
      }

      if (this.db_result.sungjeok.length !==0){
        this.sungjeok = this.db_result.sungjeok;
        var nanugi = 0;
        for(var j=0; j<this.sungjeok.length; j++){
          this.totalaverage += this.sungjeok[j].avofav;
          nanugi += this.sungjeok[j].hakjum;
        }
        if(nanugi ===0 )
          nanugi = 1;
        this.totalaverage /= nanugi;
      }

      if (this.db_result.jeongong.length !==0){
        this.jeongong = this.db_result.jeongong;
      }
      if (this.db_result.gyoyang.length !==0){
        this.gyoyang = this.db_result.gyoyang;
      }
      console.log(this.db_result);
    })

    var i = 0;
    setInterval(function () {
      this.time = i;
      i++;
      if(i===this.db_result.janghak.length || this.db_result.janghak.length===0){
        i=0;
      }
    }.bind(this), 3000);

  },
  data() {
    return {
      //여기까지 상태바////////
      user: '2018722007',
      db_result: [],
      sungjeok: [{avofav: 0, semester:'20-2', chartav:0, hakjum:0}],
      db_user: [{pmajor:'null', pid:'null', pname:'null'}],
      jeongong: [{first:0, second:0}],
      gyoyang: [{first:0, second:0}],
      totalaverage:0,
      major:{
        '': ' ',
        722: '컴퓨터정보공학부',
        700: '소프트웨어학과',
        500: '전자공학과',
        100: '국어국문학과',
        400: '영어영문학과',
        999: '전체공통'

      },
      classify:{
        0: '전공',
        1: '교양'
      },
      db_score:[{snum:' ',semester:null,grade:null,sname:null,hakjum:null}],
      recent_selected:'20-2',  //현재 semester로 바꿔줘야함.
      selected: '20-2',
      options: [
        { value: '20-2', text: '20-2' },
        { value: '20-1', text: '20-1' },
        { value: '19-2', text: '19-2' },
        { value: '19-1', text: '19-1' },
        { value: '18-2', text: '18-2' },
        { value: '18-1', text: '18-1' }
      ],
      janghaksang : [{name:'', pmajor : ''}],
      time : 0,
      chartData: [
        ['학기', '성적']
      ],
      chartOptions: {
        chart: {

        },
        vAxis: {
          viewWindow: {
            max: 4.5,
            min: 0
          }
        }
      }
    }
  },
  //  여기까지 드롭다운
  methods:{
    formchange: function() {
      console.log("selected="+this.selected);
      this.$http.post('/resultperson', {user: this.user, semester: this.selected, recent: this.recent_selected}).then((response) => {
        this.db_result = response.data;
        if (this.db_result.db_score.length !==0){
          this.db_score = this.db_result.db_score;
        }
        console.log(this.db_result);
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../style/basicstyle.scss';

.uptown{
  grid-column: 52/75;
  grid-row: 7/20;
}
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
