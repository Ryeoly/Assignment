<template>
  <div class="wrapper">
    <div class="one"></div>
    <left></left>           <!-- 여기가 left바-------------------------------------------------------------------------------------- -->
    <user></user>

    <div class="view-board" style="border:10px solid #FFFFFF">
      <p style="font-size: xx-large; font-weight: bolder;">공지사항 등록</p>
      <div class="board-view-header" >
        <textarea id="form7" class="md-textarea form-control" rows="1">
          <label for="form7">제목입력</label>
        </textarea>
      </div>
      <div class="board-view-content" style="height: 50%; border-bottom: 1px">
        <textarea id="form8" class="md-textarea form-control" rows="8">
          <label for="form8">내용입력</label>
        </textarea>
      </div>
      <button type="button" class="btn btn-outline-primary" v-on:click="write" style="margin-bottom: 1%; margin-top: 5%">글쓰기</button>
    </div>
  </div>
</template>

<script>
import Left from "./leftsidebar";
import user from "./userinfo";

export default {
  components: {
    Left,
    user
  },
  methods: {
    write: function (){
      this.$router.post('/write', )
      this.$router.push({name:'notice'});
    }
  }
}
</script>
