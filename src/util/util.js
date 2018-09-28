import axios from 'axios'
export function getUserInfo () {
  var self = this;
  axios.get('/api/getUserInfo')
    .then((res) => {
      console.log("getUserInfo:");
      console.log(res);
      if(res.data.msg === 'ok'){
        console.log("获取用户信息成功！");
        self.$emit("loginSuccess", res.data.username,res.data.userId);
      }
    })
}
