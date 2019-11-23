<template>
  <div>
    <div v-if="status === 'upload'" v-loading="progress.loading">
      <div class="file-name">{{progress.file.name}}</div>
      <span @click="suspendHandle(index)" class="suspend-btn" v-show="progress.percentage<100">暂停</span>
      <span @click="deleteHandle(index)" class="delete-btn">删除</span>
      <el-progress :percentage="progress.percentage<100?progress.percentage:100" class="progress"></el-progress>
    </div>
    <div v-if="status === 'suspend'" v-loading="progress.loading">
      <div class="file-name">{{progress.file.name}}</div>
      <span @click="continueHandle(index)" class="continue-btn">继续</span>
      <span @click="deleteHandle(index)" class="delete-btn">删除</span>
      <el-progress
        :percentage="progress.percentage<100?progress.percentage:100"
        status="warning"
        class="progress"
      ></el-progress>
    </div>
    <div v-if="status === 'error'" v-loading="progress.loading">
      <div class="file-name">{{progress.file.name}}</div>
      <span @click="continueHandle(index)" class="continue-btn">重传</span>
      <span @click="deleteHandle(index)" class="delete-btn">删除</span>
      <el-progress
        :percentage="progress.percentage<100?progress.percentage:100"
        status="exception"
        class="progress"
      ></el-progress>
    </div>
    <div v-if="status === 'success'" v-loading="progress.loading">
      <div class="file-name">{{progress.file.name}}</div>
      <span @click="deleteHandle(index)" class="delete-btn">删除</span>
      <el-progress
        :percentage="progress.percentage<100?progress.percentage:100"
        status="success"
        class="progress"
      ></el-progress>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadProgress",
  props: {
    index: Number,
    progress: Object
  },
  data() {
    return {
      status: "upload" // upload/suspend/exception/success
    };
  },
  methods: {
    continueHandle(index) {
      this.status = "upload";
      this.$emit("continue-progress", index);
    },
    suspendHandle(index) {
      this.status = "suspend";
      this.$emit("suspend-progress", index);
    },
    deleteHandle(index) {
      this.$emit("delete-progress", index);
    }
  },
  watch: {
    "progress.percentage": function(newValue) {
      console.log(newValue);
      if (newValue >= 100) {
        this.status = "success";
      }
    }
  }
};
</script>

<style>
.progress {
  width: 500px;
}
.file-name {
  font-size: 1.2em;
  width: 365px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.continue-btn {
  background-color: #67c23a;
  color: #ffffff;
  padding: 2px;
  border-radius: 2px;
  cursor: pointer;
  margin: 0 5px;
}
.suspend-btn {
  background-color: #e6a23c;
  color: #ffffff;
  padding: 2px;
  border-radius: 2px;
  cursor: pointer;
  margin: 0 5px;
}
.delete-btn {
  background-color: #f56c6c;
  color: #ffffff;
  padding: 2px;
  border-radius: 2px;
  cursor: pointer;
}
</style>