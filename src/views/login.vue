<template>
  <div class="login_box clearfix">
    <Form ref="formValidate" :model="data" :rules="ruleValidate" :label-width="80">
      <FormItem label="用户名" prop="account">
        <Input type="text" v-model="data.account" placeholder="用户名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input type="password" v-model="data.password" placeholder="密码"  @on-keyup="enterLogin">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="login" style="width:100%;">登 录</Button>
        <textarea id="pubKey" style="display:none;">-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0eVZr7y1Fs5PM6AU1zJjpad2M
clIhHnHKuClBfdtOfMAzOOMAym9xkxk+6cDwdUMOMbZm2tQXeuWYiCgDKNX7Ig8Y
FVunW1zEGws0FYcYRzqS8QSc1MF3mzlyUKv0u/3Oqgm+DFiZVay+T8/fA/EzUigR
oNn1kGItyZ6y4U2HRwIDAQAB
-----END PUBLIC KEY-----</textarea>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { JSEncrypt } from 'jsencrypt'
export default {
  name: "login",
  components: {},
  data() {
    return {
      data: {
        account: "",
        password: ""
      },
      ruleValidate: {
        account: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.checkBrowser();
  },
  methods: {
    checkBrowser() {
      // chrome 70以上
      const userAgent = window.navigator.userAgent;
      if (-1 !== userAgent.indexOf("Chrome")) {
        const strStart = userAgent.indexOf("Chrome");
        const strStop = userAgent.indexOf(" Safari");
        const version = parseInt(
          userAgent.substring(strStart, strStop).split("/")[1],
          10
        );
        this.isValidBrowser = version >= 70;
      }
      if (!this.isValidBrowser) {
        this.store.dispatch(
          StatusActions.setModal({
            isShow: true,
            title: "提示",
            content: `本系统只支持Chrome 70及以上版本浏览器。`,
            callBack: () => {}
          })
        );
      }
    },
    encryptPassword(str) {
      const pubKey = document.getElementById("pubKey").innerText;

      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(pubKey);
      return encrypt.encrypt(str);
    },
    getCurrentUser() {
      this.$api.common.getCurrentUser().then(res => {
        const currentUser = res.data;
        currentUser.account = this.data.account;
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
        this.$router.push({ name: "index" });
      });
    },
    enterLogin(e){
        if(e.keyCode == 13){
            this.login();
        }
    },
    login() {
      if (!this.data.account || !this.data.password) {
        return false;
      }
      const body = {
        account: this.data.account,
        password: this.data.password
      };

      body.password = this.encryptPassword(body.password);

      this.$api.common
        .login(body)
        .then(res => {
          console.log(res.data);
          const tokenInfo = res.data;
          sessionStorage.setItem("token", tokenInfo.token);
          this.getCurrentUser();
        }).catch((e) => {
           console.log(e)
        //   let msg = "";
        //   let data = e;
        //   switch (data.message) {
        //     case "请提供正确的数据":
        //       msg = "MESSAGES.actPwdError"; // 账号或密码错误！
        //       break;
        //     default:
        //       msg = data.message;
        //   }
        //   if (!msg && data.errors && data.errors.length) {
        //     var err = data.errors[0];
        //     if (err.errors && err.errors.length) {
        //       msg = err.errors[0];
        //     }
        //   }
        });
    }
  }
};
</script>
<style scoped>
.login_box {
  width: 500px;
  margin: 10% auto;
}
</style>