<template>
  <div class="loss_opinion">
    <Collapse v-model="tabVal">
        <Panel name="1">
            电子定损单
            <div slot="content">
              <evidence-bill :id="id"></evidence-bill>
            </div>
        </Panel>
        <Panel name="2">
            查勘单
           <div slot="content">
              <evidence-bill :id="id"></evidence-bill>
            </div>
        </Panel>
        <Panel name="3">
            责任协议书
           <div slot="content">
              <evidence-bill :id="id"></evidence-bill>
            </div>
        </Panel>
        <Panel name="4">
            转账授权书
            <div slot="content">
              <evidence-bill :id="id"></evidence-bill>
            </div>
        </Panel>
        <Panel name="5">
            补充资料单
           <div slot="content">
              <evidence-bill :id="id"></evidence-bill>
            </div>
        </Panel>
        <Panel name="6">
            赔款转账授权书
            <div slot="content">
              <evidence-bill :id="id"></evidence-bill>
            </div>
        </Panel>
    </Collapse>
  </div>
</template>

<script>
import evidenceBill from '@/components/lossOrder/lossOpinion/evidenceBill'
export default {
  name: "lossOpinion",
  components: {
    evidenceBill
  },
  props:["id"],
  data() {
    return {
       tabVal: '1',
    };
  },
};
</script>

<style scoped>
.loss_opinion{
  height:100%;
  overflow-y: auto;
}
</style>
