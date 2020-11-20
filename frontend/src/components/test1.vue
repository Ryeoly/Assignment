<template>
  <div class="wrapper">
  <h>{{db_result}}</h>

  </div>
</template>

<script>
export default {
  created(){
    console.log("?")
    this.$http.get('/test').then((response) =>{     //created() 는 이 페이지 켜지기 전에 실행되는거고       https://localhost:3000/test backend로 요청을 넣는 거임
      this.db_result = response.data                    //response = (backend의 routes/test.js 파일에서 res.send로 결과 보낸거임)
      console.log(response.data)
    })
  },
  data(){
    return {
      db_result: []
    }
  }
}
</script>
