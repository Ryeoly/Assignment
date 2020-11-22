<template>
  <div class="wrapper">
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
    data(){
      return {
        //메뉴 리스트 상태바 페이지마다 가져가야 될것
        menu_list: [
          {link: '/', title: 'MAIN'},
          {link: '/func1', title: 'FUNC1'},
          {link: '/func2', title: 'FUNC2'},
          {link: '/func3', title: 'FUNC3'}
        ],
        //여기까지 상태바////////
        schedule:[6][5],
        db_result: [],
        0:{
          backgroundColor: 'blue'
        },
        1:{
          backgroundColor: 'black'
        },
        2:{
          backgroundColor: 'blue'
        },
        3:{
          backgroundColor: 'blue'
        },
        4:{
          backgroundColor: 'blue'
        },
        5:{
          backgroundColor: 'blue'
        }
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
</style>
