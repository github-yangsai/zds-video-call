<template>
  <div class="image_modal">
    <div class="image_box">
      <img :src="data.attachmentPath" />
      <a href="javascript:void(0)" class="del_btn" @click="delPicture(data.id)">删除</a>
      <a href="javascript:void(0)" class="download_btn" @click="downPicture(data)">下载</a>
       <a href="javascript:void(0)" class="close_btn" @click="closeModal">
         <Icon type="md-close" />
       </a>
      <div class="ocr_btn">
        <ocr-body :data="data"></ocr-body>
      </div>
    </div>
  </div>
</template>
<script>
import ocrBody from "@/components/ocrBody";
export default {
  name: "imageModal",
  props: ["data"],
  components: {
    ocrBody
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    closeModal(){
      this.$emit("close");
    },
    delPicture(id) {
      this.$Modal.confirm({
        title: "你确定要删除照片吗?",
        content: "",
        onOk: () => {
          this.$api.photo
            .delPhoto(id)
            .then(res => {
              console.log(res);
              this.$Message.success("删除成功");
            })
            .catch(e => {
              this.$Message.error("删除失败");
            });
        }
      });
    },
    downPicture(picture) {
      //照片下载
      const elink = document.createElement("a");
      elink.download = picture.fileName;
      elink.style.display = "none";
      elink.href = picture.attachmentPath;
      document.body.appendChild(elink);
      elink.click();
      console.log(elink);
      document.body.removeChild(elink);
    }
  }
};
</script>
<style scoped>
.image_modal {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.image_modal::after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #000;
  opacity: 0.5;
  z-index: 1;
}
.image_box {
  width: 520px;
  height: 260px;
  position: absolute;
  z-index: 2;
  left: 50%;
  margin-left: -260px;
  top: 50%;
  margin-top: -130px;
}
.image_box img {
  width: 100%;
  height: 260px;
  object-fit: cover;
}
.image_box > a {
  display: block;
  position: absolute;
  top: 0;
  height: 24px;
  line-height: 24px;
  text-align: center;
  text-decoration: none;
  color: #fff;
  padding: 0 10px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.del_btn {
  background: #f61212;
  right: 70px;
}
.download_btn {
  background: #419cef;
  right: 10px;
}
.image_box a.close_btn{
  background: #424242;
  border-radius: 0;
  right:-36px;
  font-size:16px;
}
.image_box a:hover {
  opacity: 0.7;
}
.ocr_btn {
  position: absolute;
  left:5px;
  top: 0;
}
</style>