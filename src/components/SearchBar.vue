<template>
  <div class="search-bar">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="Gender">
        <el-select
          v-model="formInline.gender"
          placeholder="Gender"
          class="gender-select"
        >
          <el-option key="male" label="Male" value="Male"> </el-option>
          <el-option key="female" label="Female" value="Female"> </el-option>
          <el-option key="all" label="All" value="All"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Age">
        <el-input-number
          v-model="formInline.age.min"
          controls-position="right"
          placeholder="min"
          :min="14"
          :max="150"
          class="age-input"
        ></el-input-number>
        <el-input-number
          v-model="formInline.age.max"
          controls-position="right"
          :min="14"
          :max="150"
          class="age-input"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="City">
        <el-select
          v-model="formInline.city"
          placeholder="City"
          class="city-select"
        >
          <el-option label="Shanghai" value="shanghai"></el-option>
          <el-option label="Beijing" value="beijing"></el-option>
          <el-option label="Adelaide" value="Adelaide"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-popover
          placement="bottom-end"
          width="500"
          trigger="manual"
          v-model="advancedFilterVisible"
        >
          <el-tabs
            v-model="advancedFilterDefaultActive"
            @tab-click="handleClick"
            class="advanced-filter-tab-bar"
          >
            <el-tab-pane label="COVID" name="COVID">
              <el-checkbox
                v-model="formInline.advancedFilter.covid.vaccinated"
                label="Vaccinated"
                border
              ></el-checkbox>
            </el-tab-pane>
            <el-tab-pane label="Hobby" name="Hobby" class="hobby"
              ><el-checkbox
                v-model="formInline.advancedFilter.hobby.sport"
                label="Sport"
                border
              ></el-checkbox>
              <el-checkbox
                v-model="formInline.advancedFilter.hobby.movie"
                label="Movie"
                border
              ></el-checkbox>
              <el-checkbox
                v-model="formInline.advancedFilter.hobby.reading"
                label="Reading"
                border
              ></el-checkbox>
              <el-checkbox
                v-model="formInline.advancedFilter.hobby.dancing"
                label="Dancing"
                border
              ></el-checkbox>
              <el-checkbox
                v-model="formInline.advancedFilter.hobby.music"
                label="Music"
                border
              ></el-checkbox>
            </el-tab-pane>
          </el-tabs>
          <el-button
            slot="reference"
            @click="advancedFilterVisible = !advancedFilterVisible"
            >Advanced Filters</el-button
          >
        </el-popover>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Query</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        gender: "",
        region: "",
        city: "",
        age: { min: 18, max: 150 },
        advancedFilter: {
          covid: {
            vaccinated: false
          },
          hobby: {
            sport: false,
            movie: false,
            reading: false,
            dancing: false,
            music: false
          }
        }
      },
      advancedFilterVisible: false,
      advancedFilterDefaultActive: "COVID"
    };
  },
  methods: {
    onSubmit() {
      console.log("get user list with filter");
      this.$emit('queryWithFilter', this.formInline);
    }
  }
};
</script>

<style scoped>
.search-bar {
  background-color: rgb(230, 230, 230);
  padding: 20px 30px 0;
  margin: 0 20px 20px 0;
  border-radius: 5px;
}

.gender-select {
  width: 100px;
  margin-right: 10px;
}

.age-input {
  width: 100px;
  margin-right: 5px;
}

.city-select {
  width: 100px;
  margin-right: 10px;
}

.advanced-filter-tab-bar {
  margin: 0px 10px;
}

.hobby > * {
  margin-bottom: 10px;
}

.hobby:first-child {
  margin-left: 20px;
}
</style>
