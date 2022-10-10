<template>
  <el-table :data="dateList" style="width: 95%" class="date-list">
    <el-table-column fixed prop="date" label="Date" width="150">
    </el-table-column>
    <el-table-column prop="name" label="Name" width="120"> </el-table-column>
    <el-table-column prop="city" label="City" width="120"> </el-table-column>
    <el-table-column prop="address" label="Address" width="300">
    </el-table-column>
    <el-table-column prop="state" label="State" width="120">
      <template slot-scope="scope">
        <el-tag :type="tagType(scope.row.state)" disable-transitions>{{
          scope.row.state
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="Operations" width="120">
      <template slot-scope="scope">
        <el-popconfirm
          title="Are you sure to cancel this?"
          confirm-button-text="Yes"
          cancel-button-text="No"
          :ref="`popover-${scope.$index}`"
        >
          <el-button
            slot="reference"
            type="text"
            size="small"
            @click="handleClick"
            >Cancel</el-button
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
    return {};
  }
};
</script>

<style scoped>
.date-list {
  border-radius: 5px;
}
</style>
