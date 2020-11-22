<template>
  <div class="wrapper">
    <div class="one" style="text-align: right; color:white">2016722021 윤인석</div>
    <div id="transition-components-demo">
      <button v-on:click="test12">button</button>
    </div>
    <div class="two" style="background-color: midnightblue">Two</div>
    <div class="three" style="background-color:white">
      <table class="type11">
        <thead>
        <tr>
          <th scope="cols">타이틀</th>
          <th scope="cols">타이틀</th>
          <th scope="cols">타이틀</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>내용</td>
          <td>내용</td>
          <td>내용</td>
        </tr>
        <tr>
          <td>내용</td>
          <td>내용</td>
          <td>내용</td>
        </tr>
        <tr>
          <td>내용</td>
          <td>내용</td>
          <td>내용</td>
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
    name: 'HelloWorld',
    el: '#transition-components-demo',
    // 시간표 디비 스크립트 시작
    // 시간표 디비 스크립트 종료
    data() {
      return {
        menu_list: [
          {link: '/', title: 'MAIN'},
          {link: '/func1', title: 'FUNC1'},
          {link: '/func2', title: 'FUNC2'},
          {link: '/func3', title: 'FUNC3'}
        ]
      }
    },
    methods: {
      test12: function (event) {
        this.$router.push({path: '/test1'})        // 버튼 누른 경우에는 이런식으로 페이지 이동, router-link 혹은 이거 쓸 수 있음
      },

    },
    components: {
      'v-a': {
        template: '<div>Component A</div>'
      },
      'v-b': {
        template: '<div>Component B</div>'
      },
      AppDropdown,
      AppDropdownContent,
      AppDropdownItem
    }


  }
</script>


<style lang="scss" scoped>
  @import '../style/basicstyle.scss';
  /*시간표 테마*/
  table.type11 {
    border-collapse: separate;
    border-spacing: 1px;
    text-align: center;
    line-height: 1.5;
    margin: 20px 10px;
  }
  table.type11 th {
    width: 155px;
    padding: 10px;
    font-weight: bold;
    vertical-align: top;
    color: #fff;
    background: #ce4869 ;
  }
  table.type11 td {
    width: 155px;
    padding: 10px;
    vertical-align: top;
    border-bottom: 1px solid #ccc;
    background: #eee;
  }

  /* 시간표 테마 끝!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


</style>
