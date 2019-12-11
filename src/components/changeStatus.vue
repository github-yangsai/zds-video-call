<template>
  <Modal v-model="flag" title="请选择工单状态" @on-cancel="cancel" :mask-closable="false">
    <div class="change_status">
      <RadioGroup v-model="status">
        <Radio :label="50">转线下</Radio>
        <Radio :label="43">已处理</Radio>
      </RadioGroup>
      <div class="child_box">
        <CheckboxGroup v-model="dealStatus" v-if="status==43">
          <Checkbox :label="42">查勘完成</Checkbox>
          <Checkbox :label="2">标的车定损完成</Checkbox>
          <Checkbox :label="3">三者车定损完成</Checkbox>
          <Checkbox :label="4">单证收集完成</Checkbox>
        </CheckboxGroup>
      </div>
    </div>
    <div slot="footer" style="text-align:right;">
      <Button @click="cancel">暂不提交</Button>
      <Button type="primary" @click="submit" :disabled="status==43&&!isDeal">提交</Button>
    </div>
  </Modal>
</template>
<script>
export default {
  name: "changeStatus",
  props: ["flag", "source", "HasInteractive"],
  data() {
    return {
      registNo: "",
      lastLaunchTime: "",
      status: 50,
      dealStatus: []
    };
  },
  methods: {
    submit() {
      let status = this.status;
      if (this.status == 43) {
        if (
          _.find(this.dealStatus, function(item) {
            return item == 42;
          })
        ) {
          status = 42; //全部定损
        } else {
          status = 43; //部分定损
        }
      }

      if (status == 50) {
        //转线下：当前时间和报案时间在一个小时以内需提示后再调接口
        if (this.basicInfo.reportTime) {
          let reportDate = new Date(this.basicInfo.reportTime);
          let reportTime = reportDate.setHours(reportDate.getHours() + 1);
          let currentTime = new Date().getTime();
          if (currentTime <= reportTime) {
            this.$emit("close");
            this.$Modal.confirm({
              title: "提示",
              content: "是否需将任务退回改派现场查勘员？",
              onOk: () => {
                this.cancel(); //选择否
              },
              onCancel: () => {
                this.submitFinished(status, false);
              }
            });
          } else {
            this.submitFinished(status, true);
          }
        } else {
          this.submitFinished(status, false);
        }
      } else {
        this.submitFinished(status, false);
      }
    },
    submitFinished(status, offlineTimeout) {
      const body = {
        caseId: this.currentTask.id,
        status: status
      };
      this.$api.case.finished(body).then(
        res => {
          if (status == 50) {
            this.$emit("close");
            let data = "";
            if (res.data) {
              data = res.data ? res.data : "";
            }
            if (!offlineTimeout) {
              if (data && data.length != undefined) {
                let falseList = JSON.parse(JSON.stringify(data)).filter(
                  item => {
                    return item.success == false;
                  }
                );
                if (falseList.length) {
                  this.$Message.error(`任务${falseList[0].taskId}失败`);
                } else {
                  this.$Message.success("任务转线下成功");
                }
              }
            }
          }
          //选择了查勘完成之后按需弹出协勘评价
          if (this.evidence.value) {
            this.callback.emit(true);
            if (this.source == "video") {
              if (
                this.currentChat.buserRole &&
                this.currentChat.buserRole == "b-coadjuster"
              ) {
                //对方为协勘
                this.showEvaluation();
              } else {
                this.$emit("evaluationAfter");
              }
            } else {
              if (this.currentTask.coadjustStatus == 30) {
                this.showEvaluation();
              }
            }
          } else {
            this.$emit("close");
          }
        },
        e => {
          this.$emit("close");
          this.$Message.error(e);
        }
      );
      this.currentTask.status = status;
    },
    showEvaluation() {
      // 提交前判断该协勘是否已经被评价
      this.$api.case.existFeedback(this.currentTask.id).then(res => {
        let data = res.data;
        if (!data) {
          this.evaluationFlag = true;
        } else {
          this.$emit("evaluationAfter");
        }
      });
    },
    cancel() {
      if (this.HasInteractive) {
        const status = 44; // 暂不处理
        const body = {
          caseId: this.currentTask.id,
          status: status
        };
        this.$api.case.finished(body).then();
        this.currentTask.status = status;
        // this.store.dispatch(TaskActions.selectTask(this.currentTask));
      }
      this.$emit("close", false);
    }
  },
  computed: {
    currentTask() {
      let data = this.$store.state.videoBody.data;
      let _this = this;
      let result = _.find(data, item => {
        return item.id == _this.id;
      });
      return result.basicInfo ? result.basicInfo : {};
    },
    isDeal() {
      let len = this.dealStatus.length;
      return len ? true : false;
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
.change_status {
  padding: 10px;
}
.child_box {
  padding-top: 20px;
}
</style>
<style>
.change_status .ivu-radio-wrapper {
  margin-right: 30px;
}
.change_status .ivu-checkbox-wrapper {
  margin-right: 30px;
  margin-bottom: 5px;
}
</style>