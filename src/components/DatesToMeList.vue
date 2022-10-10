<template>
  <el-table :data="dateList" style="width: 95%" class="date-list">
    <el-table-column fixed prop="date" label="Date" width="150">
    </el-table-column>
    <el-table-column prop="name" label="Name" width="120"> </el-table-column>
    <el-table-column prop="city" label="City" width="120"> </el-table-column>
    <el-table-column prop="address" label="Address" width="300">
    </el-table-column>
    <el-table-column prop="state" label="State" width="80">
      <template slot-scope="scope">
        <el-tag :type="tagType(scope.row.state)" disable-transitions>{{
          scope.row.state
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="Operations" width="180">
      <template slot-scope="scope" class="operations">
        <el-popconfirm
          title="Are you sure to accept this date?"
          confirm-button-text="Yes"
          cancel-button-text="No"
          :ref="`popover-${scope.$index}`"
        >
          <el-button
            class="operation-button"
            slot="reference"
            type="primary"
            size="small"
            @click="handleClick"
            >Accept</el-button
          >
        </el-popconfirm>
        <el-popconfirm
          title="Are you sure to reject this date?"
          confirm-button-text="Yes"
          cancel-button-text="No"
          :ref="`popover-${scope.$index}`"
        >
          <el-button
            class="operation-button"
            slot="reference"
            type="danger"
            size="small"
            link
            @click="handleClick"
            >Reject</el-button
          >
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  methods: {
    handleClick() {
      console.log("click");
    },
    tagType(tagName) {
      switch (tagName) {
        case "Pending":
          return "primary";
        case "Rejected":
          return "danger";
        case "Accepted":
          return "success";
        default:
          break;
      }
    }
  },
  props: {
    dateList: []
  },
  data() {
    return {
      tableData: [
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
      ]
    };
  }
};
</script>

<style scoped>
.date-list {
  border-radius: 5px;
}

.operation-button {
  margin-right: 10px;
}
</style>
