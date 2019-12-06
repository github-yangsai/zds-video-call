<template>
  <div>
    <Modal v-model="flag" title="请选择工单状态" @on-ok="submit" @on-cancel="cancel" :mask-closable="false">
      <div class="change_status">
        
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "changeStatus",
  props: ["flag", "source"],
  data() {
    return {
      registNo: "",
      lastLaunchTime: ""
    };
  },
  methods: {
    submit() {
      
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    }
  },
  watch: {}
};
</script>
<style scoped>
</style>