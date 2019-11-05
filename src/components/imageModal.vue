<template>
    <div class="image_modal">
        <div class="image_box">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572257345163&di=6801241c5cb67f055eebed33f0794b02&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201208%2F30%2F20120830173930_PBfJE.jpeg" />
        </div>
    </div>
</template>
<script>
export default {
  name: 'imageModal',
  data () {
    return {
    }
  },
  props:[],
  computed:{
    
  },
  methods:{
    
  }
}
</script>
<style scoped>
.image_modal{
  position:absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;
  display: flex;
  align-items: center;
}
.image_modal::after{
  content:"";
  display:block;
  width:100%;
  height:100%;
  left:0;
  top:0;
  background:#000;
  opacity: 0.3;
  z-index: 1;
}
.image_box{
  width:520px;
  height:150px;
  position: absolute;
  z-index: 2;
}
.image_box img{
  width:100%;
  height:150px;
  object-fit: cover;
}
</style>