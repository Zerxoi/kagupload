<template>
  <div>
    <upload @get-file="getFileHandle">
      <upload-progress
        v-for="(item, index) in progressList"
        :key="item.name"
        :index="index"
        :progress="item"
        @continue-progress="continueHandle"
        @suspend-progress="suspendHandle"
        @delete-progress="deleteHandle"
      />
    </upload>
  </div>
</template>

<script>
import Client from "@/api/alioss.js";
import Upload from "@/components/common/upload/Upload";
import UploadProgress from "@/components/common/upload/UploadProgress";

export default {
  name: "VideoUpload",
  components: {
    Upload,
    UploadProgress
  },
  data() {
    return {
      progressList: [] // progress {name: String, percentage: Number, tempCheckpoint: Object}
    };
  },
  methods: {
    getFileHandle(files) {
      for (let i in files) {
        if (i < files.length) {
          const file = files[i];
          if (!file.type.match("image.*")) {
            this.$message.error("不支持 " + file.name + " 文件类型的上传");
            return;
          }
          if (this.progressList.some(({ name }) => name === file.name)) {
            this.$message.error("名为 " + file.name + " 的文件已存在.");
            return;
          }
          const progress = {};
          progress.file = file;
          progress.percentage = 0;
          progress.tempCheckpoint = null;
          progress.client = Client();
          progress.status = "uploading";
          progress.client
            .multipartUpload(file.name, file, {
              progress: function(p, checkpoint) {
                // 保存断点
                progress.tempCheckpoint = checkpoint;
                progress.percentage = Math.round(p * 100);
              }
            })
            // 取消任务之后解除加载状态
            .catch(e => {
              if (e.name === "cancel") {
                console.log("成功取消 " + progress.file.name + " 文件上传任务");
                return;
              }
              progress.status = "error";
            });
          this.progressList.push(progress);
        }
      }
    },
    suspendHandle(index) {
      const progress = this.progressList[index];
      progress.client.cancel();
    },
    continueHandle(index) {
      const progress = this.progressList[index];
      progress.client = Client();
      progress.client
        .multipartUpload(progress.file.name, progress.file, {
          progress: function(p, checkpoint) {
            progress.tempCheckpoint = checkpoint;
            progress.percentage = Math.round(p * 100);
          },
          checkpoint: progress.tempCheckpoint
        })
        // 取消任务之后解除加载状态
        .catch(e => {
          if (e.name === "cancel") {
            console.log("成功取消 " + progress.file.name + " 文件上传任务");
            return;
          }
          progress.status = "error";
        });
    },
    deleteHandle(index) {
      const progress = this.progressList[index];
      progress.client.cancel();
      this.progressList.splice(index, 1);
    }
  }
};
</script>

<style>
</style>