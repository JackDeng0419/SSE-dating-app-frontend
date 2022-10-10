<template>
  <div class="home">
    <head-bar />
    <side-bar />

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
        <el-button size="mini" @click="dating_visible_state = false"
          >cancel</el-button
        >
        <el-button size="mini" @click="signup()">confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getLoginStatus } from "@/api/user";
import SideBar from "@/components/SideBar";
import HeadBar from "@/components/HeadBar";

export default {
  name: "Container",
  components: {
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
    getLoginStatus().then(
      () => {
        if (this.$route.path === "/") {
          this.$router.push({ name: "my-profile" });
        }
      },
      () => {
        this.$router.push({ name: "login" });
      }
    );
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
