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
      <hr color="gray" size="3px" width="80%">
      <ul class="friend">
        <li><a href="url2">친구1</a></li>
        <li><a href="url2">친구2</a></li>
        <li><a href="url2">친구3</a></li>
        <li><a href="url2">친구4</a></li>
      </ul>
    </div>


  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  el: '#transition-components-demo',
  data() {
    return {
    }
  },
  methods:{
    test12:function(event){
      this.$router.push({path:'/test1'})        // 버튼 누른 경우에는 이런식으로 페이지 이동, router-link 혹은 이거 쓸 수 있음
    }
  }
}
</script>


<style>
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
</style>
