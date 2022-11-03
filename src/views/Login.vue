<template>
  <div class="login-wrap">
    <div class="login-form">
      <div class="form-title">dating app</div>
      <div class="form-subtitle">Login to your account</div>
      <el-form
        :model="login_form"
        :rules="rules"
        class="login-form-content"
        label-width="0px"
        ref="form"
      >
        <el-form-item prop="username" label="username">
          <el-input
            class="input_form"
            placeholder="username"
            v-model="login_form.username"
          >
          </el-input>
        </el-form-item>

        <el-form-item prop="password" label="password">
          <el-input
            @keyup.enter.native="submit()"
            placeholder="password"
            type="password"
            v-model="login_form.password"
            class="input_form"
          >
          </el-input>
        </el-form-item>

        <div class="login-btn">
          <el-button @click="submit_login()" type="primary">Confirm</el-button>
          <el-button @click="signup_visible_state = true" type="primary"
            >Signup</el-button
          >
        </div>
      </el-form>
    </div>

    <el-dialog
      title="verification"
      :visible.sync="verification_visible_state"
      width="400px"
      center
    >
      <el-form :model="verify_form" ref="loginForm" label-width="80px">
        <el-form-item prop="email" label="email">
          <el-input
            class="input_form"
            :readonly="true"
            placeholder="email"
            v-model="verify_form.email"
          >
          </el-input>
        </el-form-item>

        <el-form-item prop="code" label="code" style="width:250px">
          <el-input
            @keyup.enter.native="submit_verification()"
            placeholder="code"
            type="password"
            v-model="verify_form.code"
            class="input_form"
          >
          </el-input>
        </el-form-item>
        <el-button class="update_code" size="mini" @click="update_code()"
          >update</el-button
        >
      </el-form>
      <!-- 取消，确定按钮点击事件 -->
      <span slot="footer">
        <el-button size="mini" @click="verification_visible_state = false"
          >cancel</el-button
        >
        <el-button size="mini" @click="submit_verification()">login</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="Signup"
      :visible.sync="signup_visible_state"
      width="600px"
      center
    >
      <el-form :model="signup_form" ref="registerForm" label-width="120px">
        <el-form-item prop="username" label="Username">
          <el-input placeholder="username" v-model="signup_form.username">
          </el-input>
        </el-form-item>

        <el-form-item prop="password" label="Password">
          <el-input placeholder="password" v-model="signup_form.password">
          </el-input>
        </el-form-item>

        <el-form-item prop="email" label="Email">
          <el-input placeholder="email" v-model="signup_form.email"> </el-input>
        </el-form-item>
        <el-form-item prop="first_name" label="First Name">
          <el-input placeholder="first name" v-model="signup_form.first_name">
          </el-input>
        </el-form-item>
        <el-form-item prop="last_name" label="Last Name">
          <el-input placeholder="last name" v-model="signup_form.last_name">
          </el-input>
        </el-form-item>
        <el-form-item prop="gender" class="register-gender" label="Gender">
          <el-radio v-model="signup_form.gender" :label="0">Male</el-radio>
          <el-radio v-model="signup_form.gender" :label="1">Female</el-radio>
        </el-form-item>
        <el-form-item prop="age" label="Age">
          <el-input-number
            v-model="signup_form.age"
            controls-position="right"
            :min="18"
            :max="150"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <!-- 取消，确定按钮点击事件 -->
      <span slot="footer">
        <el-button size="mini" @click="signup_visible_state = false"
          >cancel</el-button
        >
        <el-button size="mini" @click="submit_signup()">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { login, verify, signup, apply_code } from "@/api/user";
import Config from "@/common/config";
import crypto from "crypto";

export default {
  data: function() {
    return {
      verification_visible_state: false,
      signup_visible_state: false,
      login_form: {
        username: "",
        password: ""
      },
      verify_form: {
        email: "",
        code: ""
      },
      signup_form: {
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
        gender: 1,
        age: 0
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submit_login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const hash = crypto.createHash("md5");
          hash.update(this.login_form.password);
          const data = {
            username: this.login_form.username,
            password: hash.digest("base64")
          };
          login(data).then(res => {
            if (Config.verify === true) {
              if (res.data.code === 200) {
                this.verification_visible_state = true;
                console.log("email", res.data.data.email);
                this.verify_form.email = res.data.data.email;
              } else {
                this.$message.error(res.data.message);
              }
            } else {
              this.$router.push({ name: "container" });
            }
          });
        }
      });
    },
    submit_verification() {
      verify(this.verify_form.code).then(res => {
        if (res.data.code === 200) {
          sessionStorage.setItem("userid", res.data.data._uid);
          sessionStorage.setItem("username", res.data.data.username);
          this.$message.success(
            "welcome:   " + sessionStorage.getItem("username")
          );
          this.$router.push({ name: "container" });
          this.$message.success(res.data.message);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    submit_signup() {
      // TODO: check null input
      // TODO: hash the password
      signup(this.signup_form).then(res => {
        this.signup_visible_state = false;
        console.log(res);
        if (res) {
          if (res.data.code === 200) {
            this.$message.success(res.data.message);
          }
        }
      });
    },
    update_code() {
      apply_code().then(res => {
        if (res) {
          if (res.data.code === 200) {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../assets/login-background.jpg");
  background-size: 100% 100%;
}

.form-title {
  position: relative;
  top: 60px;
  left: 10%;
  height: 90px;
  width: 80%;
  line-height: 80px;
  text-align: center;
  font-size: 40px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}

.form-subtitle {
  position: relative;
  top: 50px;
  left: 10%;
  height: 60px;
  width: 80%;
  line-height: 100px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}

.login-form {
  position: absolute;
  left: 45%;
  top: 240px;
  height: 580px;
  width: 500px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

.login-form-content {
  position: relative;
  margin-top: 5px;
  padding: 45px 45px;
}

::v-deep .input_form .el-input__inner {
  position: relative;
  top: 0;
  margin-top: 0;
  height: 40px;
  border-radius: 30px;
}

.login-btn {
  position: relative;
  top: 20px;
  text-align: center;
}

.login-btn > * {
  border-radius: 60px;
  background: deeppink;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  margin-left: 0;
}

.el-form-item > * {
  width: 50%;
}

.register-gender {
  margin-top: 10px;
}

.el-radio {
  color: black;
}
.update_code {
  position: absolute;
  top: 142px;
  right: 42px;
}
</style>
