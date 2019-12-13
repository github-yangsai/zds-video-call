<template>
  <Modal v-model="flag" title="协勘评价" :closable="false" :mask-closable="false">
    <div class="collaborative">
      <h5>请给协勘人员打分</h5>
      <div class="rate_box">
        <Rate show-text allow-half v-model="data.level">
          <span style="padding-left:10px;color:#1f98ff;font-weight:bold;">{{ level }}</span>
        </Rate>
      </div>
      <Input
        v-model="data.comment"
        type="textarea"
        :autosize="{minRows: 2,maxRows: 5}"
        placeholder="请对协勘人员作出评价"
      />
    </div>
    <div slot="footer" style="text-align:right;">
      <Button type="primary" @click="submit" :loading="isLoading">提交</Button>
    </div>
  </Modal>
</template>
<script>
export default {
  name: "collaborativeEvaluation",
  props: ["flag", "caseId"],
  data() {
    return {
      data: {
        level: undefined,
        comment: ""
      },
      isLoading:false
    };
  },
  methods: {
    close(){
      this.$emit("close");
    },
    submit() {
      if (this.data.level == undefined) {
        this.$Message.warning("请先打分");
        return false;
      }
      if (!this.data.comment) {
        this.$Message.warning("请先作出评价");
        return false;
      }
      this.isLoading = true;
      let data = JSON.parse(JSON.stringify(this.data));
      data.level = this.level;
      data.caseId = this.caseId;
      this.$api.caseInfo.submitFeedback(data).then(
        (res) => {
          this.$Message.success("评价成功！");
          this.isLoading = false;
          this.close();
        },
        e => {
          this.isLoading = false;
          this.$Message.error(e);
        }
      );
    }
  },
  computed: {
    level() {
      let level = this.data.level;
      return level * 2 + "";
    }
  },
  watch: {
    status(status) {
      if (status == 50) {
        this.dealStatus = [];
      }
    }
  }
};
</script>
<style scoped>
.collaborative {
  padding: 10px;
}
</style>