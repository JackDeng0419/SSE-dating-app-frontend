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
        <el-form-item prop="date">
          <el-date-picker
            v-model="dating_form.dateTime"
            type="datetime"
            value-format="yyyy/MMM/dd/HH"
            placeholder="Select date and time"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item prop="city">
          <el-input
            class="input_form"
            placeholder="city"
            v-model="dating_form.city"
          >
          </el-input>
        </el-form-item>

        <el-form-item prop="location">
          <el-input
            class="input_form"
            placeholder="location"
            v-model="dating_form.location"
          >
          </el-input>
        </el-form-item>

        <el-form-item prop="maskRequirement">
          <el-checkbox v-model="dating_form.maskRequired" class="input_form"
            >Mask Required</el-checkbox
          >
        </el-form-item>
      </el-form>
      <!-- 取消，确定按钮点击事件 -->
      <span slot="footer">
        <el-button size="mini" @click="dating_visible_state = false"
          >cancel</el-button
        >
        <el-button size="mini" @click="submitDate()">confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import chat from "@/components/chat";
import SideBar from "@/components/SideBar";
import HeadBar from "@/components/HeadBar";
import { check } from "@/common/ajax";
import { sendDate } from "@/api/date";

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
        toId: "",
        city: "",
        dateTime: "",
        location: "",
        maskRequired: "false"
      }
    };
  },
  methods: {
    submitDate() {
      console.log(this.dating_form);
      sendDate({ ...this.dating_form }).then(({ data }) => {
        console.log(data);
        if (data.code == 200) {
          this.$message({
            message: "Date sent",
            type: "success"
          });
        } else {
          this.$message({
            message: "Date sending failed",
            type: "error"
          });
        }
        this.dating_visible_state = false;
      });
    }
  },
  async created() {
    await check();
    if (sessionStorage.getItem("userid") !== null) {
      await this.$router.push(
        "/my-profile/" + sessionStorage.getItem("userid")
      );
    }
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
