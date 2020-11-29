<template>
  <div class="wrapper">
    <div class="one"></div>
    <user></user>

    <div class="enrollsearch">
      <table class="card-table table">
        <tr>
          <td width="5">세부 검색</td>
          <td width="20%">
            <input type="radio" v-model="check1" value="1">전공
            <input type="radio" v-model="check1" value="0">교양
          </td>
          <td width="5%">전공</td>
          <td width="20%" height="40%">
            <b-form-select v-model="check2" :options="options1" size="sm"></b-form-select>
          </td>
          <td width="5%">학년</td>
          <td width="20%" height="40%">
            <b-form-select v-model="check3" :options="options2" size="sm"></b-form-select>
          </td>
          <td width="10%" height="40%"><button v-on:click="test12">button</button></td>
        </tr>
      </table>
    </div>

    <div class="enrollclasses" style="background-color: seashell">
      <table class="card-table table">
        <tr>
          <td width="5%">No.</td>
          <td width="20%">과목 번호</td>
          <td width="20%">과목 이름</td>
          <td width="5%">학 점</td>
          <td width="10%">교수명</td>
          <td width="5%">여 석</td>
          <td width="10%">강의 시간</td>
          <td>비 고</td>
        </tr>
        <tr v-for="(item,index) in classes_result" align="center" v-on:click="incart(item)">
          <td class="border" width="5%">{{index+1}}</td>
          <td class="border" width="20%">{{item.snum}}</td>
          <td class="border" width="20%">{{item.sname}}</td>
          <td class="border" width="5%"> 1 </td>
          <td class="border" width="10%">{{item.pid}}</td>
          <td class="border" width="5%">{{item.remainder}}</td>
          <td class="border" width="10%">{{item.kstime}}</td>
          <td class="border">{{item.etc}}</td>
        </tr>
      </table>

    </div>

    <div class="enrollcart" style="background-color: #b9bbbe">
      <table class="card-table table">
        <tr>
          <td width="5%">No.</td>
          <td width="20%">과목 번호</td>
          <td width="20%">과목 이름</td>
          <td width="5%">학 점</td>
          <td width="10%">교수명</td>
          <td width="5%">여 석</td>
          <td width="10%">강의 시간</td>
          <td>비 고</td>
        </tr>
        <tr v-for="(cartlist,index) in cart" v-on:click="deletecart(cartlist)">
          <td class="border" width="5%">{{index+1}}</td>
          <td class="border" width="20%">{{cartlist.snum}}</td>
          <td class="border" width="20%">{{cartlist.sname}}</td>
          <td class="border" width="5%"> {{cartlist.hakjum}} </td>
          <td class="border" width="10%">{{cartlist.pid}}</td>
          <td class="border" width="5%">{{cartlist.remainder}}</td>
          <td class="border" width="10%">{{cartlist.kstime}}</td>
          <td class="border">{{cartlist.etc}}</td>
        </tr>
      </table>
    </div>

    <div class="four" style="background-color:white">
      <img src="../assets/Bluemango_logo.jpeg" alt="Logo" title="bluemango">
      <ul class="mylist">
        <li><router-link to="/main">메인</router-link></li>
        <li><router-link to="/enroll">수강 신청</router-link></li>
        <li><router-link to="/notice">공지 사항</router-link></li>
        <li>
          <router-link to="/">메인</router-link>
        </li>
        <li>
          <router-link to="/enroll">수강 신청</router-link>
        </li>
        <li>
          <router-link to="/notice">공지 사항</router-link>
        </li>
        <li><a href="url">기능4</a></li>
      </ul>
      <li class="menu" v-for='list in menu_list'>
        <router-link :to='list.link'> {{ list.title }}</router-link>
      </li>
      <hr color="gray" size="3px" width="80%">
    </div>
  </div>
</template>

<script>
import user from "./userinfo";

export default {
  components:{
    user
  },
  created(){
    this.$http.post('/enrolltable', {pid:this.pid, semes:this.semes}).then((response) =>{     //created() 는 이 페이지 켜지기 전에 실행되는거고//    https://localhost:3000/test backend로 요청을 넣는 거임
      console.log(response.data);
      this.classes_result = response.data.rows;                    //response = (backend의 routes/test.js 파일에서 res.send로 결과 보낸거임)
      this.cart=response.data.rows2;
      console.log(this.cart);
    })
  }
  ,
  data(){
    return {
      pid:'2016722001',
      semes:'1-1',
      fields: ['snum', 'sname', 'pid','remainder', 'kstime', 'etc'],
      check1 : [],
      check2 : [],
      options1: [
        {value: '%', text:'전체'},
        {value: '1', text:'컴공'},
        {value: '2', text:'소프'},
        {value: '3', text:'국어 국문'}
      ],
      check3 : [],
      options2: [
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
          var count = item.hakjum;
          for(q=0 ; q<this.cart.length; q++) {
            count = count + this.cart[q].hakjum;
          }
          if(count>21){
            alert('21학점을 초과하셨습니다.')
            return;
          }
          else {
            this.cart.push(item);
            this.$http.post('/enrolltable/cart', {cartlist: item,pid:this.pid,semes:this.semes}).then((response) => {
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
        this.$http.post('/enrolltable/delcart', {delitem: item.snum,pid: this.pid}).then((response) => {
          var q;
          console.log(response.data);
          console.log('2222'+response.data.length);
          this.cart = response.data;
          // for(q=0;q<response.data.length;q++){
          //   this.cart.push(response.data[q]);
          // }
        });
        var i;
        for (i = 0; i < this.classes_result.length; i++) {
          if (this.classes_result[i].snum === item.snum) {
            this.classes_result[i].remainder = this.classes_result[i].remainder + 1;
          }
        }
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
  grid-row-start: 15;
  grid-row-end: 21;
  border-top-width: 2px;
  border-bottom-width: 2px;
  background-color: white;
  border-radius: 5px 5px 5px 5px;
}
.enrollclasses{
  grid-column-start: 15;
  grid-column-end: 75;
  grid-row-start: 23;
  grid-row-end: 73;
  background-color: white;
  border-radius: 5px 5px 5px 5px;
  overflow: auto;

}
.enrollcart{
  grid-column-start: 15;
  grid-column-end: 75;
  grid-row-start: 74;
  grid-row-end: 99;
  background-color: white;
  border-radius: 5px 5px 5px 5px;
}


</style>
