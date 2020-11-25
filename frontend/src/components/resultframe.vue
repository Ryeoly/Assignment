<template>
  <div class="wrapper">
    <div class="one" style="text-align: right; color:white">2016722021 윤인석</div>
    <div class="four" style="background-color:white">
      <img src="../assets/Bluemango_logo.jpeg" alt="Logo" title="bluemango">
      <ul class="mylist">
        <li>
          <router-link to="/main">메인</router-link>
        </li>
        <li>
          <router-link to="/enroll">수강 신청</router-link>
        </li>
        <li>
          <router-link to="/notice">공지 사항</router-link>
        </li>
        <li>
          <router-link to="/result">학습 결과</router-link>
        </li>
      </ul>
      <li class="menu" v-for='list in menu_list'>
        <router-link :to='list.link'> {{ list.title }}</router-link>
      </li>
      <hr color="gray" size="3px" width="80%">

    </div>

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
            <td>학부</td>
            <td class="border">{{major[db_result.db_user[0].pmajor]}}</td>
            <td class="border">{{db_result.db_user[0].pid}}</td>
            <td class="border">{{db_result.db_user[0].name}}</td>
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
            <td class="border">{{db_result.jeongong[0].first * 3}}</td>
            <td class="border">{{db_result.gyoyang[0].first * 3 }}</td>
            <td class="border">{{db_result.jeongong[0].first * 3 + db_result.gyoyang[0].first*3}}</td>
            <td class="border">{{db_result.jeongong[0].second*3}}</td>
            <td class="border">{{db_result.gyoyang[0].second*3}}</td>
            <td class="border">{{db_result.jeongong[0].second*3 + db_result.gyoyang[0].second*3}} </td>
            <td class="border">{{db_result.sungjeok[0].avofav.toPrecision(3)}}</td>
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
          <tbody style="text-align:center" id="delbody">
            <tr  v-for="item in db_result.db_score">
                <td class="border">{{item.snum}}</td>
                <td class="border">{{item.sname}}</td>
                <td class="border">{{major[item.snum.split('-')[1]]}}</td>
                <td class="border">{{classify[item.snum.split('-')[0]]}}</td>
                <td class="border">3</td>
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

export default {
  created() {
    this.$http.post('/resultperson', {user: this.user, semester: this.selected, recent: this.recent_selected}).then((response) => {
      this.db_result = response.data;
      if (this.db_result.janghak.length !==0){
        this.janghaksang = this.db_result.janghak;        //장학생이 존재하는 경우에 값을 넣기.
      }
      if(this.db_result.semester.length!==0){
        for(var i=0; i<this.db_result.semester.length; i++)
        this.chartData.push([this.db_result.semester[i], Number(this.db_result.chartav[i])]);     //차트 만들기
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
      //메뉴 리스트 상태바 페이지마다 가져가야 될것
      menu_list: [
        {link: '/', title: 'MAIN'},
        {link: '/func1', title: 'FUNC1'},
        {link: '/func2', title: 'FUNC2'},
        {link: '/func3', title: 'FUNC3'}
      ],
      //여기까지 상태바////////
      user: '2016722001',
      db_result: [],
      major:{
        '': '장학생이 존재하지 않습니다',
        722: '컴퓨터정보공학부',
        622: '소프트웨어정보공학부',
        522: '정보공학부'
      },
      classify:{
        0: '전공',
        1: '교양'
      },
      recent_selected:'1-1',  //현재 semester로 바꿔줘야함.
      selected: '1-1',
      options: [
        { value: '1-2', text: '1-2' },
        { value: '1-1', text: '1-1' }
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
            max: 5,
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
