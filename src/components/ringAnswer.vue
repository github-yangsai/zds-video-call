<template>
    <div>
        <!--接听框-->
    <Modal v-model="flag" width="360">
      <p slot="header" style="color:#f60;text-align:center">新提醒</p>
      <div>
        <p>您有视频通话接入</p>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="error" @click="joinCall">立即接听</Button>
      </div>
    </Modal>
    </div>
</template>
<script>
export default {
    name:"ringAnswer",
    props:["flag"],
    data(){
        return {

        }
    },
    methods:{
        joinCall(){
            this.$emit("close");
            this.$emit("join");
        }
    }
}
</script>
<style scoped>

</style>