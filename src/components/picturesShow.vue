<template>
    <div class="pictures_box clearfix">
      <div class="pictures_type">
        <ul>
          <li v-for="(item,index) in categoryList" :key="index">
            {{item.name}}
          </li>
        </ul>
        </div>
        
        <div class="pictures_list">
            <ul>
              <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572257345163&di=6801241c5cb67f055eebed33f0794b02&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201208%2F30%2F20120830173930_PBfJE.jpeg" /></li>
              <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572257450784&di=c392822e31b524908618bb7c302b166a&imgtype=0&src=http%3A%2F%2Fwww.forestry.gov.cn%2Fuploadfile%2Fmain%2F2013-6%2Fimage%2F2013-6-19-dbdb3e3f20b644ec959960e9d8308eda.jpg" /></li>
              <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572257345163&di=6801241c5cb67f055eebed33f0794b02&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201208%2F30%2F20120830173930_PBfJE.jpeg" /></li>
              <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572257450784&di=c392822e31b524908618bb7c302b166a&imgtype=0&src=http%3A%2F%2Fwww.forestry.gov.cn%2Fuploadfile%2Fmain%2F2013-6%2Fimage%2F2013-6-19-dbdb3e3f20b644ec959960e9d8308eda.jpg" /></li>
              <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572257345163&di=6801241c5cb67f055eebed33f0794b02&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201208%2F30%2F20120830173930_PBfJE.jpeg" /></li>
              <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572257450784&di=c392822e31b524908618bb7c302b166a&imgtype=0&src=http%3A%2F%2Fwww.forestry.gov.cn%2Fuploadfile%2Fmain%2F2013-6%2Fimage%2F2013-6-19-dbdb3e3f20b644ec959960e9d8308eda.jpg" /></li>
              <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572257345163&di=6801241c5cb67f055eebed33f0794b02&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201208%2F30%2F20120830173930_PBfJE.jpeg" /></li>
              <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572257450784&di=c392822e31b524908618bb7c302b166a&imgtype=0&src=http%3A%2F%2Fwww.forestry.gov.cn%2Fuploadfile%2Fmain%2F2013-6%2Fimage%2F2013-6-19-dbdb3e3f20b644ec959960e9d8308eda.jpg" /></li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  name: 'picturesShow',
  data () {
    return {
      categoryList:[]
    }
  },
  computed:{
    // categoryList(){
    //   // return this.$store.state.videoBody['data'+ this.id].photosCategory
    // }
  },
  mounted(){
    this.queryPhoto();
  },
  methods:{
    queryPhoto(){
      //查询图片分类
      // this.$api.photo.queryPhotoCategory().then(res =>{
      //   // this.$store.commit("setPhotosCategory",res.data);
      //   this.categoryList = res.data;
      // })
    }
  }
}
</script>
<style scoped>
.pictures_type{
  width:40%;
  float: left;
  height:calc(50vh - 50px);
  background: #E4EFF9;
  overflow-y:auto;
}
.pictures_type li{
  height: 42px;
  line-height: 42px;
  cursor: pointer;
  border-bottom:1px #91c8ff solid;
  text-align: center;
  background:#72B8F8;
  color: #fff;
}
.pictures_type li:hover,.pictures_type li.current{
  background: #419CEF;
}
.pictures_list{
  width:60%;
  padding:10px;
  background:#CED0DB;
  height:calc(50vh - 50px);
  overflow-y:auto;
}
.pictures_list li{
  margin-bottom:10px;
}
.pictures_list li img{
  height:85px;
  object-fit: cover;
  width:100%;
  border:1px #57a3f3 dashed;
  vertical-align: top;
  border-radius: 3px;
}

</style>