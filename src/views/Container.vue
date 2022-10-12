<template>
  <div class="home">
    <head-bar />
    <side-bar />
    <chat />
    <div class="content-box">
      <router-view />
      <!-- <el-backtop target=".content"></el-backtop> -->
    </div>

    <el-dialog
      title="dating"
      :visible.sync="dating_visible_state"
      width="600px"
      center
    >
      <el-form :model="dating_form" ref="dating_form" label-width="80px">
        <el-form-item prop="username">
          <el-input
            class="input_form"
            placeholder="username"
            v-model="dating_form.username"
          >
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            class="input_form"
            placeholder="password"
            v-model="dating_form.password"
          >
          </el-input>
        </el-form-item>

        <el-form-item prop="mobile_number">
          <el-input
            class="input_form"
            placeholder="mobile_number"
            v-model="dating_form.mobile_number"
          >
          </el-input>
        </el-form-item>

        <el-form-item prop="email">
          <el-input
            class="input_form"
            placeholder="email"
            v-model="dating_form.email"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <!-- 取消，确定按钮点击事件 -->
      <span slot="footer">
        <el-button size="mini" @click="dating_visible_state = false">cancel</el-button>
        <el-button size="mini" @click="signup()">confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getLoginStatus } from "@/api/user";
import chat from "@/components/chat";
import SideBar from "@/components/SideBar";
import HeadBar from "@/components/HeadBar";

export default {
  name: "Container",
  components: {
    chat,
    HeadBar,
    SideBar
  },
  data: function() {
    return {
      dating_visible_state: false,
      dating_form: {
        username: "",
        password: "",
        mobile_number: "",
        email: ""
      }
    };
  },
  created() {
    this.$router.push({name: "my-profile"});
    /*
    pureget("/login/status").then((res)=>{
      const RSA_key = res.data["data"].publickey;
      sessionStorage.setItem("userid", res.data["data"].userid);
      sessionStorage.setItem("username",res.data["data"].username);
      sessionStorage.setItem("mobile_number", res.data["data"].mobile_number);
      sessionStorage.setItem("email", res.data["data"].email);
      this.$store.commit("setUserid", res.data["data"].userid);
      pre_post("/login/encryption", RSA_key).then(()=>{
        if (this.$route.path === "/") {
          this.$router.push("/my-profile/"+sessionStorage.getItem("userid"));
        }
      })
    },(err)=>{
      const RSA_key = err.response.data["data"].publickey;
      pre_post("/login/encryption", RSA_key).then(()=>{
        this.$router.push({name: "login"});
      });
    });*/
  }
};
</script>
<style scoped>
.content-box {
  position: absolute;
  left: 30%;
  right: 10%;
  width: 60%;
  top: 85px;
  bottom: 0;
  background: transparent;
  color: white;
}
</style>
