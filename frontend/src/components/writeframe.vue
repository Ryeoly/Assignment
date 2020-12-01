<template>
  <div class="wrapper">
    <div class="one"></div>
    <left></left>           <!-- 여기가 left바-------------------------------------------------------------------------------------- -->

    <div class="view-board" style="border:10px solid #FFFFFF">
      <b-card>
        <b-card-header>공지사항 등록</b-card-header>
        <b-card-body>
          <b-form-group
            label="제목"
            label-align-sm="left"
            label-for="title"
          >
            <b-form-input name="title" v-model="post.title"></b-form-input>
          </b-form-group>
          <b-form-group
            label="내용"
            label-align-sm="left"
            label-for="content"
          >
            <b-form-textarea name="content" rows="13" v-model="post.content" no-resize></b-form-textarea>
          </b-form-group>
        </b-card-body>
        <b-card-footer>
          <b-button v-on:click="submit">저장</b-button>
        </b-card-footer>
      </b-card>
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
  data() {
    return {
      isUpdate: false,
      post: {
        title: '',
        snum: '',
        content: '',
        writer: '',
        file: ''
      },
      title_state: null
    }
  },
  methods: {
    write: function () {
      this.$router.push({name: 'notice'});
    },
    invalidFeedback: function () {
      return '제목을 입력하세요.'
    },
    check_valid: function () {
      if (this.post.title.length === 0) {
        this.title_state = false;
        return false;
      }
      return true;
    },
    submit: function () {
      console.log(this.post);
      if (this.check_valid()) {
        this.$http.post("http://localhost:3000/notice/write", {post: this.post}).then((res) => {
          if (res.data.success === false) {
            console.log(res);
            this.$router.push({name: 'notice', params: {snum: this.snum}});
          }
        });
      }
    }
  },
  created() {
    this.post.writer = this.$store.state.user.name;
    this.post.snum = this.snum;
  },
  props: {
    snum: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
@import '../style/basicstyle.scss';

.view-board {
  grid-column: 15 / 65;
  grid-row: 23 / 95;
  border-radius: 5px 5px 5px 5px;
  background-color: white;
  box-shadow: 0px 2px 0px lightgray;
  max-width: 100%;
  height: auto !important;
  overflow: auto;
}
.card {
  height:100%;
}
</style>
