<template>
  <div class="wrapper">
    <div class="one"></div>
    <left></left>
    <user></user>
    <div class = "uptown">
      <b-card class="up-card">
        <h4 class="card-title">학과별 수석 장학생</h4>
        <table class="card-table table">
          <tr>
            <transition name="janghack" mode="out-in">
              <td class="jang" v-for="(item, index) in janghaksang" colspan="1" v-if="show_list[index]" :key="item.name">{{major[item.pmajor]}}</td>
            </transition>
            <transition name="janghack" mode="out-in">
              <td class="jang" v-for="(item, index) in janghaksang" colspan="1" v-if="show_list[index]" :key="item.name">{{item.name}}</td>
            </transition>
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
            :data="chartData1"
            :options="chartOptions1"
            style="width:70%; margin-left:15%;"
          />
          <GChart
            type="LineChart"
            :data="chartData2"
            :options="chartOptions2"
            style="width:70%; margin-left:15%;"
          />
        </div>

      </b-card>
    </div>
  </div>
</template>

<script>
import Left from './leftsidebar.vue'
import user from "./userinfo";

export default {
  components:{
    Left,
    user
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

            if(this.db_result.gj[i]!==null) {
              this.chartData1.push([this.db_result.semester[i], Number(this.db_result.chartav[i])]);
              if(this.db_result.gj[i].semester!=='21-1')
                this.chartData2.push([this.db_result.gj[i].semester, Number(this.db_result.gj[i].g_avg_grade),Number(this.db_result.gj[i].j_avg_grade)]);     //차트 만들기
            }
            else{
              this.chartData1.push([this.db_result.semester[i], 0]);
              this.chartData2.push([this.db_result.semester[i], 0,0]);
            }

      }
      else{
        this.chartData1.push([' ',0]);
        this.chartData2.push([' ',0,0]);

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

      let count = this.db_result.janghak.length;
      this.show_list = new Array(count).fill(false);
      this.show_list[0] = true;
    })
    setInterval(function() {
      this.show_list.unshift(this.show_list.pop() === true);
    }.bind(this), 3000);

  },
  computed: {
    user: function () {
      return parseInt(this.$store.state.user.pid);
    }
  },
  data() {
    return {
      //여기까지 상태바////////
      chartav : [],
      show_list: [],
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
      chartData1: [
        ['학기', '전체']
      ],
      chartData2: [
        ['학기', '전공', '교양']
      ],
      chartOptions1: {
        series: {
          0: { color: '#e2431e' }
        },
        vAxis: {
          viewWindow: {
            max: 4.5,
            min: 0
          }
        }
      },
      chartOptions2: {
        series: {
          0: { color: '#f88b00' },
          1: { color: '#43459d' }
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
        else{
          this.db_score = [{snum:' ',semester:null, grade:null, sname:null, hakjum:null}];
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
  grid-row: 9/21;
}
.resulttb {
  grid-column: 15/75;
  grid-row: 23/100;
  max-width: 100%;
  height: auto !important;
  overflow: auto;
}
.forselect{
  width:10%;
  float:right;
}
.up-card{
  height:100%;
}
.janghack-item {
  display: inline-block;
  margin-right: 10px;
}
.janghack-enter-active, .janghack-leave-active {
  transition: all 1s;
}
.janghack-enter, .janghack-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.jang {
  text-align: center;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
}
</style>
