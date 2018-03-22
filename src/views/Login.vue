<template>
  <div class="login-container">
    <div class="backcolor"></div>
    <div style="position: relative;z-index: 9;">
        <div class="headtxt">
            <span>{{$store.state.common.name}}智慧食安云平台</span>
        </div>
        <div class="textbox">
            <h2>欢迎登录</h2>
            <p>欢迎来到{{$store.state.common.name}}智慧食安云平台，请输入手机号或用户名登录</p>
        </div>
        <div class="ipubox">
            <el-form autoComplete="on" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
                <el-form-item prop="email">
                    <el-input name="email" type="text" autoComplete="on" v-model="loginForm.login" placeholder="请输入手机号或用户名" @keyup.enter.native="submit();"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" type="password" autoComplete="on" v-model="loginForm.password" placeholder="请输入密码" @keyup.enter.native="submit();"></el-input>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button type="primary" @click="submit()">
                      登录
                    </el-button>
                    <a href="javascript:;" @click="forgetPassword"><span class="wjpass">忘记登录密码了？</span></a>
                </el-form-item>
            </el-form>
        </div>
    </div>

    <div class="bottxt">
        <p>Copyright&copy;-2018 成都顺点科技有限公司 All Rights Reserved.</p>
        <p>蜀ICP备14030915号-1</p>
    </div>
    <!-- <el-dialog title="第三方验证">
      邮箱登录成功,请选择第三方验证
      <social-sign></social-sign>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        login: "",
        password: ""
      }
    };
  },
  methods: {
    submit() {
      let params = this.$route.params;
      let to = {
        path: "/"
      };
      if (params.name) {
        to = {
          path: params.path,
          name: params.name,
          params: params.params
        };
      }
      this.$store.dispatch("login", this.loginForm).then(
        result => {
          this.$router.push(to);
        },
        result => {}
      );
    },
    // 忘记密码页面
    forgetPassword() {
      this.$router.push({
        name: "sys.password",
        query: { type: "reset", step: 1 }
      });
    }
  }
};
</script>

<style lang="scss">
body,
html {
  height: 100%;
}
.login-container {
  height: 100%;
  position: relative;
  background-image: url(../assets/img/image.jpg);
  background-repeat: no-repeat;
  /*background-size: 100%;*/
  .backcolor {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.4;
    background: #2e3034;
  }
}
.headtxt {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #394145;
  font-size: 16px;
  color: #ffffff;
  span {
    margin-left: 240px;
  }
}
.textbox {
  width: 240px;
  color: #fff;
  margin: 6vh auto 0;
  h2 {
    font-size: 36px;
    margin-bottom: 20px;
    margin-left: -80px;
  }
  p {
    font-size: 16px;
    line-height: 24px;
    margin-left: -80px;
    width: 420px;
  }
}
.ipubox {
  width: 400px;
  margin: 50px auto 40px;
  padding: 5vh 30px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 8px 16px 0 rgba(36, 37, 40, 0.16);
  border-radius: 10px;
  input {
    width: 340px;
    height: 48px;
    background: rgba(138, 141, 146, 0.12);
    border-radius: 4px;
    border: none;
  }
  .btn {
    margin-top: 40px;
    margin-bottom: 0;
    button {
      background-image: linear-gradient(-53deg, #1099f2 0%, #1ec5f6 97%);
      box-shadow: 0 4px 12px 0 rgba(26, 183, 237, 0.53);
      border-radius: 100px;
      width: 130px;
      height: 48px;
      font-size: 20px;
      color: #fff;
    }
    .wjpass {
      font-size: 14px;
      color: #6d7787;
      float: right;
    }
  }
}
.bottxt {
  position: absolute;
  bottom: 20px;
  opacity: 0.8;
  text-align: center;
  font-size: 12px;
  color: #ffffff;
  line-height: 18px;
  width: 100%;
  z-index: 9;
}
</style>
