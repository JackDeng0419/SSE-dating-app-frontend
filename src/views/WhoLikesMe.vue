<template>
  <div>
    <container-title title="Who Likes Me" />
    <users-wall :userList="whoLikedMeUserList"></users-wall>
  </div>
</template>

<script>
import ContainerTitle from "../components/ContainerTitle.vue";
import UsersWall from "../components/UsersWall.vue";

export default {
  components: {
    ContainerTitle,
    UsersWall
  },
  data() {
    return {
      whoLikedMeUserList: []
    };
  },
  mounted: function() {
    this.whoLikedMeUserList = [
      {
        avatar:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
        username: "zhengjie-deng",
        userId: "123456",
        firstName: "Zhengjie",
        lastName: "Deng",
        age: "22",
        gender: "Male",
        location: "Adelaide"
      },
      {
        avatar:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
        username: "zhengjie-deng",
        userId: "123456",
        firstName: "Zhengjie",
        lastName: "Deng",
        age: "22",
        gender: "Male",
        location: "Adelaide"
      },
      {
        avatar:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
        username: "zhengjie-deng",
        userId: "123456",
        firstName: "Zhengjie",
        lastName: "Deng",
        age: "22",
        gender: "Male",
        location: "Adelaide"
      },
      {
        avatar:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
        username: "zhengjie-deng",
        userId: "123456",
        firstName: "Zhengjie",
        lastName: "Deng",
        age: "22",
        gender: "Male",
        location: "Adelaide"
      },
      {
        avatar:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
        username: "zhengjie-deng",
        userId: "123456",
        firstName: "Zhengjie",
        lastName: "Deng",
        age: "22",
        gender: "Male",
        location: "Adelaide"
      },
      {
        avatar:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
        username: "zhengjie-deng",
        userId: "123456",
        firstName: "Zhengjie",
        lastName: "Deng",
        age: "22",
        gender: "Male",
        location: "Adelaide"
      }
    ];
  }
};
</script>

<style scoped></style>
