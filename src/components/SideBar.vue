<template>
  <div class="sidebar">
    <el-image
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      class="nav-image"
    ></el-image>
    <div :class="{ hidden: isHidden }" class="like-date">
      <div class="like">
        <el-button
          id="button1"
          @click="like()"
          :type="likeBtnType"
          circle
          icon="el-icon-star-on"
          class="like-icon"
        ></el-button>
        <el-button
          id="button1"
          @click="dislike()"
          :type="dislikeBtnType"
          circle
          icon="el-icon-error"
          class="like-icon"
        ></el-button>
      </div>
      <br />
      <el-button id="button1" @click="dating()" type="primary">date</el-button>
      <el-button id="button1" @click="message()" type="primary"
        >message</el-button
      >
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
import { likeUser, dislikeUser, normalUser, getLikeStatus } from "@/api/like";
import {check_key, check_status} from "@/common/ajax";

export default {
  name: "SideBar",
  data: function() {
    return {
      isHidden: true,
      profileIndex: "/my-profile/" + sessionStorage.getItem("userid"),
      likeStatus: 0,
      currentUserId: null,
      likeBtnType: "default",
      dislikeBtnType: "default"
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
      this.$parent.dating_form.toId = this.currentUserId;
    },
    like() {
      if (this.likeStatus == 1) {
        this.normal(1);
      } else {
        likeUser(this.currentUserId).then(res => {
          if (res) {
            console.log(res);
            if (res.data.code == 200) {
              this.$message({
                message: "Liked",
                type: "success"
              });
              this.likeStatus = res.data.data.likeStatus;
            }
          }
        });
      }
    },
    dislike() {
      if (this.likeStatus == 2) {
        this.normal(2);
      } else {
        dislikeUser(this.currentUserId).then(res => {
          if (res) {
            if (res.data.code == 200) {
              this.$message({
                message: "Disliked",
                type: "success"
              });
              this.likeStatus = res.data.data.likeStatus;
            }
          }
        });
      }
    },
    normal(oldStatus) {
      normalUser(this.currentUserId).then(res => {
        if (res) {
          if (res.data.code == 200) {
            if (oldStatus == 1) {
              this.$message({
                message: "Like canceled",
                type: "success"
              });
            } else if (oldStatus == 2) {
              this.$message({
                message: "Dislike canceled",
                type: "success"
              });
            }
            this.likeStatus = res.data.data.likeStatus;
          }
        }
      });
    },
    message() {
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
          this.currentUserId = id;
          // if is current user id, set isHidden to true
          this.isHidden = id === sessionStorage.getItem("userid");
        }
      } else {
        // if is in other nav, set isHidden to true
        console.log(string.length);
        this.isHidden = true;
      }
    },
    isHidden(isHidden) {
      console.log(isHidden);
      if (!isHidden) {
        getLikeStatus(this.currentUserId).then(({ data }) => {
          console.log(data);
          if (data != null) {
            if (data.code == 200) {
              this.likeStatus = data.data.likeStatus;
            } else {
              this.$message.error(data.message);
            }
          }
        });
      }
    },
    likeStatus(likeStatus) {
      if (likeStatus == 1) {
        this.likeBtnType = "danger";
        this.dislikeBtnType = "default";
      } else if (likeStatus == 0) {
        this.likeBtnType = "default";
        this.dislikeBtnType = "default";
      } else if (likeStatus == 2) {
        this.likeBtnType = "default";
        this.dislikeBtnType = "info";
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
  margin-bottom: 10px;
  border-radius: 5px;
}

.like-date {
  margin-left: 30px;
  /* display: flex; */
}

.like {
  display: flex;
  justify-content: center;
  margin-left: -40px;
}

.like-icon {
  font-size: 30px;
  margin: 0 10px;
}

.date-btn {
  /* margin: 0 5px; */
  margin-top: 20px;
  width: 180px;
}
</style>
