<template>
  <div class="MyProfile">
    <div class="profile_form">
      <div class="form-title">&nbsp;&nbsp;Basic Information</div>
      <el-form
        :model="basic_information"
        class="profile_form_content"
        label-width="0px"
        ref="form"
      >
        <div class="form_left">
          <el-form-item class="input_form" prop="first_name">
            <div class="input_title">First name</div>
            <el-input
              :readonly="profile_readonly"
              class="input_item"
              placeholder="null"
              v-model="basic_information.first_name"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="input_form" prop="gender">
            <div class="input_title">gender</div>
            <el-select
              :disabled="profile_readonly"
              class="input_item"
              v-model="basic_information.gender"
              placeholder="male"
            >
              <el-option
                v-for="item in profile_gender"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="input_form" prop="age">
            <div class="input_title">age</div>
            <el-input
              :readonly="profile_readonly"
              class="input_item"
              placeholder="null"
              v-model="basic_information.age"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="input_form" prop="preferred language">
            <div class="input_title">preferred language</div>
            <el-input
              :readonly="profile_readonly"
              class="input_item"
              placeholder="null"
              v-model="basic_information.preferred_language"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="input_form" prop="education">
            <div class="input_title">education</div>
            <el-input
              :readonly="profile_readonly"
              class="input_item"
              placeholder="null"
              v-model="basic_information.education"
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="form_right">
          <el-form-item class="input_form" prop="last_name">
            <div class="input_title">Last name</div>
            <el-input
              :readonly="profile_readonly"
              class="input_item"
              placeholder="null"
              v-model="basic_information.last_name"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="input_form" prop="nationality">
            <div class="input_title">nationality</div>
            <el-input
              :readonly="profile_readonly"
              class="input_item"
              placeholder="null"
              v-model="basic_information.nationality"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="input_form" prop="birthday">
            <div class="input_title">birthday</div>
            <el-date-picker
              :readonly="profile_readonly"
              v-model="basic_information.birthday"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="1900-01-01"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item class="input_form" prop="relationship status">
            <div class="input_title">relationship status</div>
            <el-input
              :readonly="profile_readonly"
              class="input_item"
              placeholder="null"
              v-model="basic_information.relationship_status"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="input_form" prop="profession">
            <div class="input_title">profession</div>
            <el-input
              :readonly="profile_readonly"
              class="input_item"
              placeholder="null"
              v-model="basic_information.profession"
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="edit-btn">
          <el-button
            @click="edit_profile()"
            :class="{ active: isActive }"
            type="primary"
            >confirm</el-button
          >
        </div>
      </el-form>
      <div id="mapBox" :style="{ height: Height }"></div>
      <div class="map_input_form" :class="{ active: mapisActive }">
        <div class="input_title">city</div>
        <vue-google-autocomplete
          id="map"
          placeholder="Location"
          types="(cities)"
        >
        </vue-google-autocomplete>
      </div>
    </div>

    <div class="looks_form">
      <div class="form-title">&nbsp;&nbsp;Looks</div>
      <el-form
        :model="looks"
        class="looks_form_content"
        label-width="0px"
        ref="form"
      >
        <div class="form_left">
          <el-form-item class="input_form" prop="ethnicity">
            <div class="input_title">Ethnicity</div>
            <el-input
              :readonly="looks_readonly"
              class="input_item"
              placeholder="null"
              v-model="looks.ethnicity"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="input_form" prop="height">
            <div class="input_title">Height</div>
            <el-input
              :readonly="looks_readonly"
              class="input_item"
              placeholder="null"
              v-model="looks.height"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="input_form" prop="hair_color">
            <div class="input_title">Hair color</div>
            <el-input
              :readonly="looks_readonly"
              class="input_item"
              placeholder="null"
              v-model="looks.hair_color"
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="form_right">
          <el-form-item class="input_form" prop="body_type">
            <div class="input_title">Body type</div>
            <el-input
              :readonly="looks_readonly"
              class="input_item"
              placeholder="null"
              v-model="looks.body_type"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="input_form" prop="weight">
            <div class="input_title">Weight</div>
            <el-input
              :readonly="looks_readonly"
              class="input_item"
              placeholder="null"
              v-model="looks.weight"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="input_form" prop="eye_color">
            <div class="input_title">Eye Color</div>
            <el-input
              :readonly="looks_readonly"
              class="input_item"
              placeholder="null"
              v-model="looks.eye_color"
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="edit-btn">
          <el-button
            @click="edit_looks()"
            :class="{ active: isActive }"
            type="primary"
            >confirm</el-button
          >
        </div>
      </el-form>
    </div>

    <div class="covid_form">
      <div class="form-title">&nbsp;&nbsp;Covid information</div>
      <el-form
        :model="covid"
        class="covid_form_content"
        label-width="0px"
        ref="form"
      >
        <div class="form_left">
          <el-form-item class="input_form" prop="vaccination">
            <div class="input_title">vaccination</div>
            <el-input
              :readonly="looks_readonly"
              class="input_item"
              placeholder="null"
              v-model="covid.vaccination"
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="form_right">
          <el-form-item class="input_form" prop="other">
            <div class="input_title">other</div>
            <el-input
              :readonly="looks_readonly"
              class="input_item"
              placeholder="null"
              v-model="covid.other"
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="edit-btn">
          <el-button
            @click="edit_looks()"
            :class="{ active: isActive }"
            type="primary"
            >confirm</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  get_basic_information,
  update_basic_information,
  profile_gender,
  get_looks
} from "@/api/profile";
import { initMap } from "@/api/map"; //引入
import VueGoogleAutocomplete from "vue-google-autocomplete";
export default {
  name: "MyProfile",
  components: { VueGoogleAutocomplete },
  data: function() {
    return {
      isActive: false,
      mapisActive: true,
      profile_readonly: true,
      profile_disabled: true,
      looks_readonly: true,
      looks_disabled: true,
      basic_information: {
        first_name: "",
        last_name: "",
        age: "",
        gender: "",
        preferred_language: "",
        nationality: "",
        birthday: "",
        relationship_status: "",
        profession: "",
        education: ""
      },
      looks: {
        ethnicity: "",
        body_type: "",
        height: "",
        weight: "",
        hair_color: "",
        eye_color: ""
      },
      covid: {
        vaccination: "",
        other: ""
      },
      profile_gender: profile_gender,
      Height: "400px"
    };
  },

  created() {
    if (this.$route.path === "/myprofile") {
      this.$router.push("/myprofile/" + this.$store.getters.getUserId);
    }
    const id = this.$route.path.split("/")[2];
    this.isActive = id !== this.$store.getters.getUserId.toString();
    initMap();
    get_basic_information(id).then(
      res => {
        this.basic_information.first_name = res.data["data"].first_name;
        this.basic_information.last_name = res.data["data"].last_name;
        this.basic_information.age = res.data["data"].age;
        this.basic_information.gender = res.data["data"].gender;
        this.basic_information.preferred_language =
          res.data["data"].preferred_language;
        this.basic_information.nationality = res.data["data"].nationality;
        this.basic_information.birthday = res.data["data"].birthday;
        this.basic_information.relationship_status =
          res.data["data"].relationship_status;
        this.basic_information.profession = res.data["data"].profession;
        this.basic_information.education = res.data["data"].education;
        this.profile_readonly = true;
        this.profile_disabled = true;
      },
      err => {
        this.$message.error(err.response.msg);
      }
    );
    get_looks(id).then(res => {
      this.looks.ethnicity = res.data["data"].ethnicity;
      this.looks.body_type = res.data["data"].body_type;
      this.looks.height = res.data["data"].height;
      this.looks.weight = res.data["data"].weight;
      this.looks.hair_color = res.data["data"].hair_color;
      this.looks.eye_color = res.data["data"].eye_color;
      this.looks_readonly = true;
      this.looks_disabled = true;
    });
  },
  methods: {
    edit_profile() {
      if (this.profile_readonly === true) {
        this.profile_readonly = false;
        this.profile_disabled = false;
        this.Height = "0px";
        this.mapisActive = false;
      } else {
        update_basic_information(this.basic_information);
        this.profile_readonly = true;
        this.profile_disabled = true;
        this.Height = "400px";
        this.mapisActive = true;
      }
    },
    edit_looks() {
      if (this.looks_readonly === true) {
        this.looks_readonly = false;
        this.looks_disabled = false;
      } else {
        //update_basic_information(this.basic_information);
        this.looks_readonly = true;
        this.looks_disabled = true;
      }
    }
  },
  watch: {
    $route(to) {
      if (to.path === "/my-profile") {
        this.$router.push("/my-profile/" + this.$store.getters.getUserId);
      } else {
        const string = to.path.split("/");
        if (string[1] === "my-profile") {
          const id = string[2];
          this.isActive = id !== this.$store.getters.getUserId.toString();
          initMap();
          get_basic_information(id).then(
            res => {
              this.basic_information.first_name = res.data["data"].first_name;
              this.basic_information.last_name = res.data["data"].last_name;
              this.basic_information.age = res.data["data"].age;
              this.basic_information.gender = res.data["data"].gender;
              this.basic_information.preferred_language =
                res.data["data"].preferred_language;
              this.basic_information.nationality = res.data["data"].nationality;
              this.basic_information.birthday = res.data["data"].birthday;
              this.basic_information.relationship_status =
                res.data["data"].relationship_status;
              this.basic_information.profession = res.data["data"].profession;
              this.basic_information.education = res.data["data"].education;
              this.profile_readonly = true;
              this.profile_disabled = true;
            },
            err => {
              this.$message.error(err.response.msg);
            }
          );
          get_looks(id).then(res => {
            this.looks.ethnicity = res.data["data"].ethnicity;
            this.looks.body_type = res.data["data"].body_type;
            this.looks.height = res.data["data"].height;
            this.looks.weight = res.data["data"].weight;
            this.looks.hair_color = res.data["data"].hair_color;
            this.looks.eye_color = res.data["data"].eye_color;
            this.looks_readonly = true;
            this.looks_disabled = true;
          });
        }
      }
    }
  }
};
</script>

<style scoped>
.active {
  display: none;
}
.profile_form {
  position: relative;
  width: 100%;
  background-color: black;
  border-radius: 15px 15px 15px 15px;
  height: 1050px;
}
.looks_form {
  position: relative;
  width: 100%;
  background-color: black;
  border-radius: 15px 15px 15px 15px;
  height: 400px;
}
.covid_form {
  position: relative;
  width: 100%;
  background-color: black;
  border-radius: 15px 15px 15px 15px;
  height: 300px;
}

.form-title {
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  line-height: 60px;
  font-size: 30px;
  color: #ffffff;
  border-bottom: 1px solid gray;
}
.form_left {
  position: absolute;
  width: 40%;
  left: 5%;
  top: 80px;
}
.form_right {
  position: absolute;
  width: 40%;
  left: 55%;
  top: 80px;
}

.edit-btn {
  position: absolute;
  top: 10px;
  right: 30px;
}

::v-deep .el-input__inner,
::v-deep .el-input__inner[disabled] {
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 1px;
  background-color: transparent;
}

.profile_form_content {
  position: relative;
  height: 600px;
}
#mapBox {
  position: relative;
  height: 400px;
}
.map_input_form {
  position: relative;
  height: 100px;
}
#map {
  height: 50px;
  background-color: transparent;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 1px;
  width: 300px;
  color: white;
}
</style>
