<template>
  <div>
    <container-title title="Search Mate" />
    <search-bar />
    <users-wall :userList="myDislikedUserList"></users-wall>
  </div>
</template>

<script>
import ContainerTitle from "../components/ContainerTitle.vue";
import SearchBar from "../components/SearchBar.vue";
import UsersWall from "../components/UsersWall.vue";

export default {
  components: {
    ContainerTitle,
    UsersWall,
    SearchBar
  },
  data() {
    return {
      myDislikedUserList: []
    };
  },
  mounted: function() {
    console.log("My likes mounted");
    this.myDislikedUserList = [
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
