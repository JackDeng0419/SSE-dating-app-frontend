<template>
  <div class="sidebar">
    <el-image
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      class="nav-image"
    ></el-image>
    <div :class="{ hidden: isHidden }" class="like-date">
      <el-button id="button1" @click="dating()" type="primary">like</el-button>
      <el-button id="button1" @click="dating()" type="primary">dislike</el-button>
      <br />
      <el-button id="button1" @click="dating()" type="primary">date</el-button>
      <el-button id="button1" @click="message()" type="primary">message</el-button>
    </div>
    <el-menu
      :default-active="this.$router.path"
      active-text-color="#20a0ff"
      background-color="transparent"
      class="sidebar-el-menu"
      router
      text-color="#ffffff"
    >
      <el-menu-item class="item" :index="profileIndex" key="/myProfile">
        <i class="el-icon-fa fa-bar-chart"></i>
        <span slot="title">My Profile</span>
      </el-menu-item>
      <el-submenu class="item" index="/my-date" key="/my-date">
        <template slot="title">
          <i class="el-icon-fa fa-bar-chart"></i>
          <span slot="title">My Dates</span>
        </template>
        <el-menu-item class="item" index="/date-from-me" key="/date-from-me">
          <i class="el-icon-fa fa-bar-chart"></i>
          <span slot="title">Dates From Me</span>
        </el-menu-item>
        <el-menu-item class="item" index="/date-to-me" key="/date-to-me">
          <i class="el-icon-fa fa-bar-chart"></i>
          <span slot="title">Dates To Me</span>
        </el-menu-item>
      </el-submenu>

      <hr />
      <el-menu-item class="item" index="/search-mate" key="/search-mate">
        <i class="el-icon-fa fa-bar-chart"></i>
        <span slot="title">Search Mate</span>
      </el-menu-item>

      <el-menu-item class="item" index="/who-liked-me" key="/who-liked-me">
        <i class="el-icon-fa fa-bar-chart"></i>
        <span slot="title">Who Likes Me</span>
      </el-menu-item>

      <!-- <el-menu-item class="item" index="/mutual-liked" key="/mutual-liked">
        <i class="el-icon-fa fa-bar-chart"></i>
        <span slot="title">Mutual Likes</span>
      </el-menu-item> -->

      <el-menu-item class="item" index="/my-liked" key="/my-liked">
        <i class="el-icon-fa fa-bar-chart"></i>
        <span slot="title">My Likes</span>
      </el-menu-item>

      <el-menu-item class="item" index="/my-disliked" key="/my-disliked">
        <i class="el-icon-fa fa-bar-chart"></i>
        <span slot="title">My Dislike</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import {check_key, check_status} from "@/common/ajax";

export default {
  name: "SideBar",
  data: function() {
    return {
      isHidden: true,
      profileIndex: "/my-profile/" + sessionStorage.getItem("userid")
    };
  },
  async created() {
    await check_key();
    await check_status()
    console.log("sidebaruserid", sessionStorage.getItem("userid"))
    this.profileIndex = "/my-profile/" + sessionStorage.getItem("userid");
  },
  methods: {
    dating() {
      this.$parent.dating_visible_state = true;
    },
    message(){
      console.log(this.$parent.$children[2]);
      this.$parent.$children[2].chat_visible = true;
    }
  },
  watch: {
    $route(to) {
      const string = to.path.split("/");
      if (string.length === 3) {
        if (string[1] === "my-profile") {
          const id = string[2];

          // if is current user id, set isHidden to true
          this.isHidden = id === sessionStorage.getItem("userid");
        }
      } else {
        // if is in other nav, set isHidden to true
        console.log(string.length);
        this.isHidden = true;
      }
    }
  }
};
</script>

<style scoped>
.hidden {
  display: none;
}
.sidebar {
  display: block;
  position: absolute;
  left: 10%;
  top: 85px;
  bottom: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.sidebar > ul {
  height: 100%;
}

.sidebar-el-menu {
  border: 0 !important;
  margin-top: 20px;
}

.nav-image {
  margin: 30px;
  border-radius: 5px;
}

.like-date {
  margin-left: 30px;
}

.date-btn {
  /* margin: 0 5px; */
  margin-top: 20px;
  width: 180px;
}
</style>
