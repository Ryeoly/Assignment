<template>
  <div class="wrapper">
    <div class="one"></div>
    <left></left>
    <user></user>

    <div class="hot_deal_wrapper">
      <b-card>
        <b-card-header>
          <b-icon icon="alarm-fill" animation="cylon" style = "color: red;"></b-icon> 핫딜
        </b-card-header>
        <b-card-body>
          <tr>
            <transition name="hotdeal" mode="out-in">
              <td class="hot" v-for="(item, index) in hotdeals" v-if="show_list[index]" :key="item.sname">{{item.snum}}</td>
            </transition>
            <transition name="hotdeal" mode="out-in">
              <td class="hot" v-for="(item, index) in hotdeals" v-if="show_list[index]" :key="item.sname">{{item.sname}}</td>
            </transition>
            <transition name="hotdeal" mode="out-in">
              <td class="hot" v-for="(item, index) in hotdeals" v-if="show_list[index]" :key="item.sname">여석: {{item.remainder}}</td>
            </transition>
          </tr>
        </b-card-body>
      </b-card>
    </div>


    <div class="enrollsearch">
      <table class="card-table table">
        <tr>
          <td width="5">세부 검색</td>
          <td width="20%">
            <input type="radio" v-model="check1" value="2">전체
            <input type="radio" v-model="check1" value="0">전공
            <input type="radio" v-model="check1" value="1">교양
          </td>
          <td width="5%">전공</td>
          <td width="20%" height="40%">
            <b-form-select v-model="check2" :options="options1" size="sm"></b-form-select>
          </td>
          <td width="5%">학년</td>
          <td width="20%" height="40%">
            <b-form-select v-model="check3" :options="options2" size="sm"></b-form-select>
          </td>
          <td width="10%" height="40%"><button v-on:click="test12">search</button></td>
        </tr>
      </table>
    </div>

    <div style="grid-area:20/15/22/28; font-size:large; font-weight: bold; color:white;">수강 신청 자료집</div>

    <div class="enrollclasses" style="background-color: #ecfffd ">
      <table class="table">
        <tr style="color: black">
          <td width="5%">No.</td>
          <td width="19.5%">과목 번호</td>
          <td width="20%">과목 이름</td>
          <td width="6%">학 점</td>
          <td width="10%">교수명</td>
          <td width="6%">여 석</td>
          <td width="10%">강의 시간</td>
          <td>비 고</td>
        </tr>
      </table>
    </div>

    <div style="grid-area: 27/15/71/75; overflow: scroll">
      <table class="table card-table table-sm table-bordered">
        <tr v-for="(item,index) in classes_result" align="center" class="subject" v-on:click="incart(item)">
          <td class="border" width="5%">{{index+1}}</td>
          <td class="border" width="20%">{{item.snum}}</td>
          <td class="border" width="20%">{{item.sname}}</td>
          <td class="border" width="5%"> {{item.hakjum}} </td>
          <td class="border" width="10%">{{item.p_name}}</td>
          <td class="border" width="5%">{{item.remainder}}</td>
          <td class="border" width="10%">{{item.stime}}</td>
          <td class="border">{{item.etc}}</td>
        </tr>
      </table>

    </div>

    <div style="grid-area:72/15/73/28; font-size:large; font-weight: bold">수강 신청 목록</div>
    <div class="enrollcart" style="overflow: scroll">
      <table class="card-table table table-sm">
        <tr style="background-color: #ecfffd; color: black; font-weight: bolder">
          <td width="5%">No.</td>
          <td width="20%">과목 번호</td>
          <td width="20%">과목 이름</td>
          <td width="5%">학 점</td>
          <td width="10%">교수명</td>
          <td width="5%">여 석</td>
          <td width="10%">강의 시간</td>
          <td>비 고</td>
        </tr>
        <tr v-for="(cartlist,index) in cart" align="center" class="subject" v-on:click="deletecart(cartlist)">
          <td class="border" width="5%">{{index+1}}</td>
          <td class="border" width="20%">{{cartlist.snum}}</td>
          <td class="border" width="20%">{{cartlist.sname}}</td>
          <td class="border" width="5%"> {{cartlist.hakjum}} </td>
          <td class="border" width="10%">{{cartlist.p_name}}</td>
          <td class="border" width="5%">{{cartlist.remainder}}</td>
          <td class="border" width="10%">{{cartlist.stime}}</td>
          <td class="border">{{cartlist.etc}}</td>
        </tr>
      </table>
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
  created(){
    this.$http.post('http://localhost:3000/enrolltable', {pid:this.user, semes: this.semes}).then((response) =>{     //created() 는 이 페이지 켜지기 전에 실행되는거고//    https://localhost:3000/test backend로 요청을 넣는 거임
      this.classes_result = response.data.rows;                    //response = (backend의 routes/test.js 파일에서 res.send로 결과 보낸거임)
      this.cart=response.data.rows2;
    })
    this.$http.get('http://localhost:3000/enrolltable/hotdeal').then((response) =>{     //created() 는 이 페이지 켜지기 전에 실행되는거고//    https://localhost:3000/test backend로 요청을 넣는 거임
      console.log(response.data);
      this.hotdeals = response.data.subject;                    //response = (backend의 routes/test.js 파일에서 res.send로 결과 보낸거임)
      let count = response.data.subject.length;
      this.show_list = new Array(count).fill(false);
      this.show_list[0] = true;
    })
    setInterval(function() {
      this.show_list.unshift(this.show_list.pop() === true);
    }.bind(this), 3000);
  }
  ,
  data(){
    return {
      show_list: [],
      hotdeals: [],
      semes:'21-1',
      check1 : [],
      check2 : [],
      options1: [
        {value: '%', text:'전체'},
        {value: '722', text:'컴퓨터공학'},
        {value: '700', text:'소프트웨어'},
        {value: '500', text:'전자공학'},
        {value: '100', text:'국어국문'},
        {value: '400', text:'영어영문'}
      ],
      check3 : [],
      options2: [
        {value: '%', text:'전체'},
        {value: '1', text:'1'},
        {value: '2', text:'2'},
        {value: '3', text:'3'},
        {value: '4', text:'4'}
      ],
      search_result: [],
      cart: [],
      yesno: [],
      yesno2: [],
      item11: [],

      //메뉴 리스트 상태바 페이지마다 가져가야 될것
      menu_list: [
        {link: '/', title: 'MAIN'},
        {link: '/func1', title: 'FUNC1'},
        {link: '/func2', title: 'FUNC2'},
        {link: '/func3', title: 'FUNC3'}
      ]
      //여기까지 상태바////////
      ,
      classes_result: [],
      tableVariants: [
        'primary',
        'secondary',
        'info',
        'danger',
        'warning',
        'success',
        'light',
        'dark'
      ],
      striped: false,
      bordered: false,
      borderless: false,
      outlined: false,
      small: false,
      hover: false,
      dark: false,
      fixed: false,
      footClone: false,
      headVariant: null,
      tableVariant: '',
      noCollapse: false
    }
  },
  methods:{
    test12: function(event) {
      this.$http.post('/enrolltable/detail', {type: this.check1, major: this.check2, number:this.check3}).then((response) => {
        this.classes_result = response.data;
      });
    },
    incart: function(item) {
      this.yesno = confirm('수강 신청 하시겠습니까?');
      if (item.remainder !== 0) {
        var p;
        for(p = 0; p < this.cart.length; p++){
          if(this.cart[p].snum === item.snum){
            alert('이미 수강 중인 과목입니다.');
            return;
          }
        }
        if (this.yesno) {
          var q;
          var count=0;
          for(q=0 ; q<this.cart.length; q++) {
            count = count + this.cart[q].hakjum;
          }
          for(q=0 ; q<this.cart.length; q++) {
            var temp = [];
            temp = this.cart[q].stime.split(',');
            if(temp[0] === item.stime.split(',')[0] || temp[0] === item.stime.split(',')[1]){
              alert('수강 시간을 확인해 주세요.');
              return;
            }
            if(temp[1] === item.stime.split(',')[0] || temp[1] === item.stime.split(',')[1]){
              alert('수강 시간을 확인해 주세요.');
              return;
            }
          }
          if(count + item.hakjum>21){
            alert('21학점을 초과하셨습니다.')
            return;
          }
          else {
            this.cart.push(item);
            this.$http.post('/enrolltable/cart', {cartlist: item,pid:this.user,semes:this.semes}).then((response) => {
            });
            var i;
            for (i = 0; i < this.classes_result.length; i++) {
              if (this.classes_result[i].snum === item.snum) {
                this.classes_result[i].remainder = this.classes_result[i].remainder - 1;
              }
            }
          }
        }
      }
      else{
        alert('여석이 없습니다.')
      }
    },
    deletecart: function (item) {
      this.yesno2 = confirm('수강 포기 하시겠습니까?');
      if(this.yesno2){
        this.$http.post('/enrolltable/delcart', {delitem: item.snum, pid: this.user}).then((response) => {
          var q;
          this.cart = response.data.result2;
          this.classes_result = response.data.rows2;
        });
      }

    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/basicstyle.scss';
.enrollsearch{
  grid-column-start: 15;
  grid-column-end: 75;
  grid-row-start: 13;
  grid-row-end: 18;
  border-top-width: 2px;
  border-bottom-width: 2px;
  background-color: white;
  border-radius: 5px 5px 5px 5px;
}
.enrollclasses{
  grid-column-start: 15;
  grid-column-end: 75;
  grid-row-start: 23;
  grid-row-end: 27;
  border-radius: 5px 5px 5px 5px;
  background-color: #b9bbbe;

}
.enrollcart{
  grid-column-start: 15;
  grid-column-end: 75;
  grid-row-start: 74;
  grid-row-end: 99;
  background-color: white;
  border-radius: 5px 5px 5px 5px;
}

.subject {
  background-color: white;
}

.subject:hover {
  background-color: #ecfffd;
}

.hot_deal_wrapper {
  grid-area: 4/15/11/35;
}
.card{
  height:100%;
}
.card-body {
  padding:0;
}
.card-header {
  padding: 0 0 0 .75rem;
}
.hotdeal-item {
  display: inline-block;
  margin-right: 10px;
}
.hotdeal-enter-active, .hotdeal-leave-active {
  transition: all 1s;
}
.hotdeal-enter, .hotdeal-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(10px);
}
.hot {
  padding-left: .5rem;
  padding-right: 1.25rem;
  padding-top: .5rem;
}
</style>
