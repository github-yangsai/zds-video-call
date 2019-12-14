
<template>
  <div class="bill_header">
    <img class="logo" src="static/images/tplogo.jpg" alt />
    <div class="title">
      <h2>太平财产保险有限公司</h2>
      <h5>TAIPING GENERAL INSURANCE CO.,LTD.</h5>
      <h2>{{title}}</h2>
    </div>
    <div class="qr">
      <img src="static/images/qr.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "billHeader",
  components: {},
  props:["title"],
  data() {
    return {};
  }
};
</script>

<style scoped>
img.logo {
  height: 70px;
}

.title {
  text-align: center;
}

.qr {
  position: absolute;
  right: 0;
  bottom: 0;
}

.qr>img {
  height: 80px;
}

</style>
