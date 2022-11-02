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
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
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
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
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
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
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
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
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
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
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
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
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
