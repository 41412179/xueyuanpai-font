<template>
<div class="discuss-content">
    <div class="title-input-wrapper-class">
        <input class="title-input-class" id="myInput" type="text" v-model="title" placeholder="文章标题:请一句话概括文章" />
    </div>
    <div id="editorId">
        <q-editor @changeContent="changeContent" :content="content"></q-editor>
    </div>
    <span>这是一条分割线-------------------------</span>

    
    <div id="btnId" class="editor-btn-submit">
        <button id="cancelBtn" v-on:click='cancel' size="large" style="width:110px; height:38px;" type="primary">取消</button>
        <button id="sumitBtn" v-on:click='getUserInfoThenSubmit' size="large" style="width:110px; height:38px;" type="primary">发布</button>
    </div>
</div>
</template>

<script>
import QEditor from "@/pages/QEditor";
import axios from "axios";
export default {
  data() {
    return {
      content: 'this is vue content',
      userInfo: {
        userName: "",
        userId: ""
      },
      isLogin: false,
      title: "this is vue title"
    };
  },
  components: {
    QEditor
  },
  methods: {
    cancel(){

    },
    changeContent(content){
      this.content = content;
      console.log("parent content = " + content)
    },
    getUserInfo() {
      let self = this;
      axios.get("/api/getUserInfo").then(res => {
        // console.log("getUserInfo:");
        // console.log(res);
        console.log("invoke getUserInfo");
        console.log(res);
        console.log("status = " + res.data.msg);
        if (res.data.msg === "ok") {
          //console.log("发布一条表白信息前获取用户信息成功！");
          this.userInfo.userName = res.data.username;
          this.userInfo.userId = res.data.userId;
          this.isLogin = true;
          console.log("this.isLogin = " + this.isLogin);

          // alert(self.isLogin);
        } else {
          //console.log("发布一条表白信息前获取用户信息失败！");
          this.isLogin = false;
          console.log("this.isLogin = " + this.isLogin);
        }
      });
      //console.log("isLogin："+ self.isLogin);
    },
    submit() {
      console.log("进入到submit方法");
      this.getUserInfo();
      console.log("this.login = " + this.isLogin);
      if (this.isLogin) {
        console.log("login success!!");
        let formData = new FormData();
        formData.append("title", this.title);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        axios.post("api/submit", formData, config).then(res => {
          console.log(res);
        });
      } else {
        console.log("login fail!!");
        this.$router.push("/login");
      }
    },
    getUserInfoThenSubmit() {
      let self = this;
      axios.get("/api/getUserInfo").then(res => {
        // console.log("getUserInfo:");
        // console.log(res);
        console.log("invoke getUserInfo");
        console.log(res);
        console.log("status = " + res.data.msg);
        if (res.data.msg === "ok") {
          //console.log("发布一条表白信息前获取用户信息成功！");
          this.userInfo.userName = res.data.username;
          this.userInfo.userId = res.data.userId;
          this.isLogin = true;
          console.log("this.isLogin = " + this.isLogin);
          if (this.isLogin) {
            console.log("login success!!");
            let formData = new FormData();
            formData.append("title", this.title);
            formData.append("content", this.content);
            let config = {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            };
            axios.post("api/submit", formData, config).then(res => {
              console.log(res);
            });
          } else {
            console.log("login fail!!");
            this.$router.push("/login");
          }
          // alert(self.isLogin);
        } else {
          //console.log("发布一条表白信息前获取用户信息失败！");
          this.isLogin = false;
          console.log("this.isLogin = " + this.isLogin);
        }
      });
    }
  }
};
</script>

<style scoped>
.title-input-wrapper-class{
  position: relative;
  width: 1223px;
  height: 55px;
  
}

.title-input-class{
  position: absolute;
  font-size: 30px;
  width: 1223px;
  height: 55px;
  vertical-align:middel;
}

#cancelBtn{
  position: relative;
  top: 0%;
  left: 58px;
}
#submitBtn {
  /* float: right; */
  position: relative;
  top: 0%;
  right: 50px;
  background-color: #00bc9b;
}

input::-webkit-input-placeholder{
    color: red;
    font-size: 40px;
    line-height: 50px;
}

</style>
