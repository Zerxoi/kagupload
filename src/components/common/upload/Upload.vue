<template>
  <div>
    <div>
      <!-- accept 属性有用? -->
      <input multiple id="file-input" type="file" accept="image/*" @change="getFile" ref="file" />
      <label for="file-input" id="inputlabel">选择文件</label>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Upload",
  methods: {
    getFile(e) {
      this.$emit("get-file", e.target.files);
      e.target.value = null;
    }
  }
};
</script>

<style>
#file-input {
  display: none;
}
#inputlabel {
  background-color: #409eff;
  color: #ffffff;
  border-radius: 5px;
  display: inline-block;
  padding: 10px;
  cursor: pointer;
}
</style>