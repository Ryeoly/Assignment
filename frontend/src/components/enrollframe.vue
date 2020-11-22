<template>
  <div class="wrapper">
    <div class="one" style="text-align: right; color:white">2016722021 윤인석</div>
    <div class="enrollclasses">

      <table class="n-list">
        <thead>
        <tr class="list-head">
          <th>
            <input type="radio" name="major1">전공
            <input type="radio" name="major1">교양
          </th>
          <th>학과 선택</th>
          <td>
            <select name="item1">
              <option name="total">전</option>
             <option name="computer">computer</option>
              <option value="software">software</option>
              <option value="korean">korean</option>
            </select>
          </td>
          <th>학년</th>
          <td>
            <select name="item2">
              <option name="one1">1</option>
              <option value="two2">2</option>
              <option value="three3">3</option>
              <option value="four4">4</option>
            </select>
          </td>
          <td><input type="submit" value="검색" onclick='btn_click("search")'></td>
        </tr>
        </thead>
        <tbody>
      </table>

      <table class="n-list">
        <thead>
        <tr class="list-head">
          <th>No.</th>
          <th>교과 번호</th>
          <th>강좌 유형</th>
          <th>교과목명</th>
          <th>학년</th>
          <th>학점</th>
          <th>담당교수</th>
          <th>강의시간</th>
          <th>비고</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in classes_result">
          <td> {{index+1}} </td>
          <td> {{item.snum}} </td>
          <td> 1 </td>
          <td> {{item.sname}} </td>
          <td> 1 </td>
          <td> 1 </td>
          <td> {{item.pid}} </td>
          <td> {{item.kstime}} </td>
          <td> {{item.etc}} </td>
        </tr>
        </tbody>
      </table>

    </div>
    <div class="four" style="background-color:white">
      <img src="../assets/Bluemango_logo.jpeg" alt="Logo" title="bluemango">
      <ul class="mylist">
        <li><router-link to="/">메인</router-link></li>
        <li><router-link to="/enroll">수강 신청</router-link></li>
        <li><router-link to="/notice">공지 사항</router-link></li>
        <li><a href="url">기능4</a></li>
      </ul>
      <li class="menu" v-for='list in menu_list'>
        <router-link :to='list.link'> {{ list.title }}</router-link>
      </li>
      <hr color="gray" size="3px" width="80%">
      <AppDropdown>
        <template slot="toggler">
          <p class="click-list">
            친구목록
            <font-awesome-icon aria-hidden="true" icon="angle-down"/>
          </p>
        </template>
        <AppDropdownContent class="friend-list">
          <AppDropdownItem>
            <li>친구1</li>
          </AppDropdownItem>
          <AppDropdownItem>
            <li>친구2</li>
          </AppDropdownItem>
          <AppDropdownItem>
            <li>친구3</li>
          </AppDropdownItem>
          <AppDropdownItem>
            <li>친구4</li>
          </AppDropdownItem>
        </AppDropdownContent>
      </AppDropdown>
    </div>
  </div>
</template>

<script>
  import AppDropdown from "./AppDropdown.vue";
  import AppDropdownContent from "./AppDropdownContent.vue";
  import AppDropdownItem from "./AppDropdownItem.vue";
  export default {
    created(){
      this.$http.get('/enrolltable').then((response) =>{     //created() 는 이 페이지 켜지기 전에 실행되는거고//    https://localhost:3000/test backend로 요청을 넣는 거임
        console.log(response.data);
        this.classes_result = response.data;                    //response = (backend의 routes/test.js 파일에서 res.send로 결과 보낸거임)
        console.log(response.data);
      })
    },
    data(){
      return {

        //메뉴 리스트 상태바 페이지마다 가져가야 될것
        menu_list: [
          {link: '/', title: 'MAIN'},
          {link: '/func1', title: 'FUNC1'},
          {link: '/func2', title: 'FUNC2'},
          {link: '/func3', title: 'FUNC3'}
        ]
        //여기까지 상태바////////
        ,
        classes_result: []
      }
    },
    //드롭다운 속성 주는거 가져야됨 페이지마다
    components :{
      AppDropdown,
      AppDropdownContent,
      AppDropdownItem
    }
  //  여기까지 드롭다운
 }



</script>
<style lang="scss" scoped>
  @import '../style/basicstyle.scss';
  .enrollclasses{
    grid-column-start: 15;
    grid-column-end: 75;
    grid-row-start: 23;
    grid-row-end: 100;
    background-color: white;
  }

  table.n-list {
    margin-left: 0;
    margin-right: 0;
    margin-top: 1%;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0px;
    text-align: left;
    line-height: 1.5;
    border-top: 3px solid #ccc;
    border-bottom: 3px solid #ccc;
  }
  table.n-list th {
    width: 20%;
    font-weight: bold;
    vertical-align: top;
  }
  table.n-list tr {
    width: 20%;
    font-weight: bold;
    vertical-align: top;
  }
  tr.list-head {
    background : white;
    font-weight: bolder;
    font-family: 새굴림,serif;
  }

</style>
