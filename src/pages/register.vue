<template>
  <div class="login-content">
    <div class="login-wrap">
      <h2>注册学院派</h2>
      <h3>享受快捷美好的校园生活</h3>
      <i-form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <Form-item label="昵称" prop="username">
          <i-input type="text" v-model="formCustom.username"></i-input>
        </Form-item>
        <Form-item label="密码" prop="passwd">
          <i-input type="password" v-model="formCustom.passwd"></i-input>
        </Form-item>
        <Form-item label="确认密码" prop="passwdCheck">
          <i-input type="password" v-model="formCustom.passwdCheck"></i-input>
        </Form-item>
        <Form-item label="邮箱" prop="email">
          <i-input type="text" v-model="formCustom.email"></i-input>
        </Form-item>
        <Form-item label="手机" prop="phone">
          <i-input type="text" v-model="formCustom.phone"></i-input>
        </Form-item>
        <Form-item>
          <Checkbox v-model="formCustom.rememberme">记住登录</Checkbox>

            <div style="text-align:center">
              <i-button style="width:135px;" type="primary" @click="handleSubmit('formCustom')">提交注册</i-button>
              <i-button style="width:135px;" type="ghost" @click="handleReset('formCustom')" >重置信息</i-button>
            </div>

        </Form-item>
      </i-form>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {

      const validateUsr = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }
          callback();
      };

      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formCustom.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('passwdCheck');
          }
          callback();
        }
      };

      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formCustom.passwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      const validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('邮箱不能为空'));
        } else {
          var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
          if(!emailReg.test(value)){
            callback(new Error('邮箱格式没有通过校验，有问题请联系qq：1593028064'));
          }else{callback();}
          
        }
      };

      const validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('手机号不能为空'));
        } else {
          console.log("value= " + value);
          if(!(/^1[34578]\d{9}$/.test(value))){
              callback(new Error('手机号没有通过我们的格式校验！有问题请联系qq：1593028064'));
           }else{
             callback();
          }
          
        }
      };



      return {
        isLogin: false,
        formCustom: {
          username: '',
          passwd: '',
          passwdCheck: '',
          email: '',
          phone: '',
          rememberme: ''
        },
        ruleCustom: {
          username: [
            { validator: validateUsr, trigger: 'blur' }
          ],
          passwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          passwdCheck: [
            { validator: validatePassCheck, trigger: 'blur' }
          ],
          email: [
            { validator: validateEmail, trigger: 'blur' }
          ],
          phone: [
            { validator: validatePhone, trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      getUserInfo () {
        var self = this;
        axios.get('/api/getUserInfo')
          .then((res) => {
            console.log("getUserInfo:");
            console.log(res);
            if(res.data.msg === 'ok'){
              console.log("获取用户信息成功！");
              self.$emit("loginSuccess", res.data.username,res.data.userId);
              isLogin = true;
            }else{
              isLogin = false;

            }
          })
      },

      handleSubmit (name) {
        var self = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            let formData = new FormData();
            formData.append('username',this.formCustom.username);
            formData.append('password',this.formCustom.passwd);
            formData.append('rememberme',this.formCustom.rememberme);
            formData.append('email',this.formCustom.email);
            formData.append('phone',this.formCustom.phone);
            formData.append('confirmPassword',this.formCustom.passwdCheck);
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            };

            axios.post('/api/reg',formData,config)
              .then((res) => {
                if(res.data.msg === 'fail'){
                  this.$Message.error('注册失败!');
                  return;
                }
                if(res.data.msg != 'ok'){
                  this.$Message.error(res.data.msg);
                  this.isLogin = true;
                  return;
                }
                console.log("注册");
                console.log(res);

                if(this.isLogin){
                  this.$Message.success('提交成功!');
                  self.$router.push('/');
                  this.getUserInfo();
                }else{
                  this.$Message.success('注册失败');
                }
              })
              // .catch((error) => {
              //   console.log(error);
              // });

          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },

      handleReset (name) {
        this.$refs[name].resetFields();
      }

    }
  }
</script>

<style scoped>
  .login-content {
    height: 700px;
    width: 100%;
    margin: 0 auto;
    background: url("../assets/login-bg.jpg");
    background-size: 100%, 100%;
    overflow:hidden;
    position: relative;
  }
  .login-content .login-wrap {
    width: 400px;
    margin: 80px auto;
    padding: 20px 20px;
    background: white;
    border-radius: 5px;
    box-shadow: 1px 1px 20px 5px #00000052;
    position: absolute;
    left: 200px;
  }
  h2 {
    font-size: 30px;
    display: inline-block;
    margin-top: 20px;
    margin-left: 10px;
  }
  h3 {
    font-size: 20px;
    display: inline-block;
    margin-top: 20px;
    margin-bottom: 30px;
    margin-left: 10px;
  }
</style>
