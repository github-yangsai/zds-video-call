<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
    padding: 0;
    margin: 0;
}

ul,
li {
    list-style: none;
}

.clearfix::after {
    clear: both;
    overflow: hidden;
    content: "";
    display: block;
}

.video-view {
  width:100%;
  height: calc(50vh - 120px);
  position: relative;
  background: #000;
}
.video-placeholder {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.large .video_body {
  height: 510px;
}
.large .video-view {
  height: auto;
  position: static;
}
.large .video_content,
.large .video-grid {
  position: absolute;
  width: 100%;
  height: 100%;
}

.ocr_modal .ivu-modal-body{
  padding:16px 30px 0!important;
}
.ocr_modal .ivu-modal-footer{
  padding:0;
  border:none;
}
.ocr_modal .ivu-form-item{
  margin-bottom: 20px;
}


</style>
