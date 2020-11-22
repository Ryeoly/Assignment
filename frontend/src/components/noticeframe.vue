<template>
  <div class="wrapper1">
<!--  <h>{{db_result[0].stime}}</h>-->
    <div v-for="(item,index) in db_result" :style="{gridColumnStart:item.stime[0],
     gridColumnEnd:item.stime[2],gridRowStart:item.stime[4], gridRowEnd:item.stime[6]}">1
<!--      <div v-if="index===1" style="stob">1</div>-->
<!--      <div v-else=>1</div>-->
    </div>
    <div v-for="(item,index) in db_result" :style="{gridColumnStart:item.stime[8],
     gridColumnEnd:item.stime[10],gridRowStart:item.stime[12], gridRowEnd:item.stime[14]}">1
    </div>
  </div>
</template>

<script>
export default {
  created(){
    console.log("?")
    this.$http.get('/timetable').then((response) =>{     //created() 는 이 페이지 켜지기 전에 실행되는거고//    https://localhost:3000/test backend로 요청을 넣는 거임
      console.log(response.data);
      this.db_result = response.data;                    //response = (backend의 routes/test.js 파일에서 res.send로 결과 보낸거임)
      console.log(response.data);
    })
  },
  data(){
    return {
      schedule:[6][5],
      db_result: []
    }
  }
}


</script>
<style scoped>
  .wrapper1 {
    display: grid;
    grid-template-columns: repeat(77, 1fr);
    grid-template-rows: repeat(100, 1fr);
    height: 100vh;
  }

#0{
  background-color: black;
}
  #1{
    background-color: red;
  }
  #2{
    background-color: green;
  }
  #3{
    background-color: blue;
  }
  #4{
    background-color: navajowhite;
  }
  /*li:nth-child(1){background-color: red;}*/
  /*li:nth-child(2){background-color: green;}*/
  /*li:nth-child(3){background-color: black;}*/
  /*li:nth-child(4){background-color: blue;}*/
  /*li:nth-child(5){background-color: navajowhite;}*/

</style>
