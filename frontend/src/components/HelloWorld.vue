<template>
  <div class="wrapper">
    <div class="one" style="text-align: right; color:white" >2016722021 윤인석</div>
    <div id="transition-components-demo">
      <button v-on:click="test12">button</button>
    </div>


    <div class="two" style="background-color: midnightblue">Two</div>
    <div class="three" style="background-color:white">Three</div>
    <div class="four" style="background-color:white">
      <img src="../assets/Bluemango_logo.jpeg" alt="Logo" title="bluemango">
      <ul class="mylist">
        <router-link to="/test1">메인</router-link>
        <router-link to="/test2">Go to Foo</router-link>
        <li><a href="url">기능3</a></li>
        <li><a href="url">기능4</a></li>
      </ul>
      <li class="menu" v-for='list in menu_list'>
        <router-link :to='list.link'> {{list.title}}</router-link>
      </li>
      <hr color="gray" size="3px" width="80%">
      <AppDropdown>
        <template slot="toggler">
          <p class="click-list">
            친구목록
            <font-awesome-icon aria-hidden="true" icon="angle-down" />
          </p>
        </template>
        <AppDropdownContent class="friend-list">
          <AppDropdownItem><li>친구1</li></AppDropdownItem>
          <AppDropdownItem><li>친구2</li></AppDropdownItem>
          <AppDropdownItem><li>친구3</li></AppDropdownItem>
          <AppDropdownItem><li>친구4</li></AppDropdownItem>
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
  data() {
    return {
      view: '',
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
    }
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
}
</script>


<style>
a:link { color : gray; text-decoration: none;}
a:visited {  color: gray; text-decoration: none;}
a:hover { color: black; text-decoration: none;}
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to {
    opacity: 0;
  }


  ul{
    list-style: none;
    line-height: 3em;
  }
  div{
    background-color: aliceblue;
  }
  img{
    max-width: 100%;
    height: auto !important;
    line-height: 0px;
  }
  .wrapper {
    display: grid;
    grid-template-columns: repeat(77, 1fr);
    grid-template-rows: repeat(100, 1fr);
    height: 100vh;
  }
  .one {
    grid-column: 12/78;
    grid-row: 1/28;
    border-radius: 5px 5px 5px 5px;
    background : linear-gradient(87deg, #5e72e4 0, #825ee4 100%);
    padding-top: 10px;
    padding-right: 5px;
    background-color: #5758bb;
    box-shadow: 2px 4px 2px lightgray;
    font-weight: 500
  ;
  }
  .two {
    grid-column: 15 / 45;
    grid-row: 23 / 50;
    border-radius: 5px 5px 5px 5px;
    background-color: #5758bb;
    box-shadow: 0px 2px 0px lightgray;
  }
  .three {
    grid-column: 47/75;
    grid-row: 23 / 50;
    border-radius: 5px 5px 5px 5px;
    background-color: #5758bb;
    box-shadow: 2px 2px 2px lightgray;
  }
  .four {
    grid-column: 1/11;
    grid-row: 1/100;
    background-color: #5758bb;
    box-shadow: 2px 2px 2px lightgray;
  }

  li.menu{
    width : 100%;
    list-style: none;
    line-height: 3em;
    font-family: sans-serif;
  }
  li.menu:hover, li.menu:focus {
    background-color: #f2f2f2;
  }
  li.menu:active{
    font-weight: 700;
  }
.friend-list li{
  width: 100%;
  list-style: none;
  line-height: 3em;
  font-family: sans-serif;
}
.friend-list li:hover, .friend-list li:focus {
  background-color: #f2f2f2;
}

</style>
