<template>
  <div>
    <container-title title="Dates From Me" />
    <dates-from-me-list :dateList="dateList"></dates-from-me-list>
  </div>
</template>

<script>
import ContainerTitle from "../components/ContainerTitle.vue";
import DatesFromMeList from "../components/DatesFromMeList.vue";

export default {
  components: {
    ContainerTitle,
    DatesFromMeList
  },
  data() {
    return {
      dateList: []
    };
  },
  mounted: function() {
    console.log("My likes mounted");
    this.dateList = [
      {
        date: "2016-05-03",
        name: "Tom",
        state: "Rejected",
        city: "Los Angeles",
        address: "No. 189, Grove St, Los Angeles",
        tag: "Home"
      },
      {
        date: "2016-05-02",
        name: "Tom",
        state: "Pending",
        city: "Los Angeles",
        address: "No. 189, Grove St, Los Angeles",
        tag: "Office"
      },
      {
        date: "2016-05-04",
        name: "Tom",
        state: "Accepted",
        city: "Los Angeles",
        address: "No. 189, Grove St, Los Angeles",
        tag: "Home"
      },
      {
        date: "2016-05-01",
        name: "Tom",
        state: "Accepted",
        city: "Los Angeles",
        address: "No. 189, Grove St, Los Angeles",
        tag: "Office"
      }
    ];
  }
};
</script>

<style scoped></style>
