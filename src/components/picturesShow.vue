<template>
  <div class="pictures_box clearfix">
    <div class="pictures_type">
      <ul class="level1_ul">
        <li
          v-for="(item,index) in categoryList"
          :key="index"
          @click="picturesTab(item,index)"
          :class="{'current':item.selected,'show':item.isShow,'level2':item.parentId != 0}"
          @drop="drop(item,$event)"
        >
          {{item.name}} ({{getCount(item)}})
          <Icon type="ios-arrow-forward" v-if="item.id!=5 && item.children && !item.isExpend" />
          <Icon type="ios-arrow-down" v-if="item.id!=5 && item.children && item.isExpend" />
        </li>
      </ul>
    </div>

    <div class="pictures_list" :id="'pictures_list'+id">
      <ul>
        <li
          v-for="(item,index) in currentPhotoList"
          :key="index"
          @dblclick="viewLarge(item)"
          draggable="true"
          @dragstart="dragStart(index,$event)"
        >
          <img :src="item.attachmentPath" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "picturesShow",
  props:["id"],
  data() {
    return {
      test:new Date(),
      categoryList: [],
      dragItem: null,
      dragIdx:0,
      selectedId: 1,
      currentPhotoList: [],
      photoList: [
        {
          id: 1,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 1,
          fileName: "(null)",
          description: null,
          attachmentPath:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571647121204&di=1771bf0959bec75b23f0b136dca1c185&imgtype=0&src=http%3A%2F%2Fpic34.nipic.com%2F20131030%2F2455348_194508648000_2.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T07:50:50.346084Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 2,
          caseId: "5dae774c7904e200012d4485",
          categoryId: 1,
          fileName: "2d4e47c2-2936-479f-a9e8-7a2fb3a6234b.jpg",
          description: null,
          attachmentPath:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571824828449&di=09ad9ded591bf8485ceed8e337bfed6e&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171008%2Fbcf443eed1ed41ceab65c2f605d979f7.jpeg",
          uploadFlag: 0,
          createdOn: "2019-09-02T08:56:55.120797Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 3,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 1,
          fileName: "caec5cd9-9477-46bb-9d3a-94a0428f6e67.jpg",
          description: null,
          attachmentPath:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571647180807&di=4358e8951d58bcaf353fff24c760f661&imgtype=0&src=http%3A%2F%2Fwww.sh.xinhuanet.com%2F135725292_14752141303891n.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T09:00:04.873433Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 4,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 1,
          fileName: "2141b5ec-9155-4c16-8a3f-1fd2aa5b5c61.jpg",
          description: null,
          attachmentPath: "2019/0902/2141b5ec-9155-4c16-8a3f-1fd2aa5b5c61.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T09:01:31.480436Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 5,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 3,
          fileName: "1476db38-e2ca-4ba7-b012-d5b15e0ce8ff.jpg",
          description: null,
          attachmentPath: "2019/0902/1476db38-e2ca-4ba7-b012-d5b15e0ce8ff.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T09:01:49.047228Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 6,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 1,
          fileName: "895c6fda-e652-4ae9-8ffc-e82491874cac.jpg",
          description: null,
          attachmentPath: "2019/0902/895c6fda-e652-4ae9-8ffc-e82491874cac.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T09:26:16.309111Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 7,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 12,
          fileName: "6dbc0739-f089-4c63-a4d9-b6142f1bfcb2.jpg",
          description: null,
          attachmentPath: "2019/0902/6dbc0739-f089-4c63-a4d9-b6142f1bfcb2.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T09:26:39.543272Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 8,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 11,
          fileName: "a5812c85-49b3-460d-bf53-9c6121453bfc.jpg",
          description: null,
          attachmentPath: "2019/0902/a5812c85-49b3-460d-bf53-9c6121453bfc.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T09:49:48.603769Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 9,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 6,
          fileName: "15de6b1d-7207-46d1-9a9a-4c5d2b127d84.jpg",
          description: null,
          attachmentPath: "2019/0902/15de6b1d-7207-46d1-9a9a-4c5d2b127d84.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T09:53:32.109425Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 10,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 6,
          fileName: "6ad385e9-7f43-469a-a35b-59b129a6616e.jpg",
          description: null,
          attachmentPath:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571647121207&di=293c3a1210631d71f1a6feff98aa9ea2&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T09:53:50.091506Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 11,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 13,
          fileName: "6e08491e-9e66-4d87-b777-d074e21772c9.jpg",
          description: null,
          attachmentPath: "2019/0902/6e08491e-9e66-4d87-b777-d074e21772c9.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T09:56:29.578726Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 12,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 13,
          fileName: "2579921a-1147-4b0b-b427-83834da97fbf.jpg",
          description: null,
          attachmentPath: "2019/0902/2579921a-1147-4b0b-b427-83834da97fbf.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T09:56:49.61691Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 13,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 14,
          fileName: "643a19fa-b51e-406d-8b8b-fb7ea48216ac.jpg",
          description: null,
          attachmentPath: "2019/0902/643a19fa-b51e-406d-8b8b-fb7ea48216ac.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T09:58:30.265564Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 14,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 14,
          fileName: "ca000f00-90f2-4735-87a6-7785a7d4027b.jpg",
          description: null,
          attachmentPath: "2019/0902/ca000f00-90f2-4735-87a6-7785a7d4027b.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T10:03:30.90091Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 15,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 14,
          fileName: "c2664792-5b80-4135-8361-8748428d91d1.jpg",
          description: null,
          attachmentPath: "2019/0902/c2664792-5b80-4135-8361-8748428d91d1.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T10:04:22.040632Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 16,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 14,
          fileName: "9bdb91da-5da5-4e8f-9f95-8311a1faf2b7.jpg",
          description: null,
          attachmentPath: "2019/0902/9bdb91da-5da5-4e8f-9f95-8311a1faf2b7.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T10:04:38.598442Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 17,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 7,
          fileName: "603958dd-ddcb-47a0-8705-19431a19ea24.jpg",
          description: null,
          attachmentPath: "2019/0902/603958dd-ddcb-47a0-8705-19431a19ea24.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T10:08:36.467088Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 18,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 8,
          fileName: "4e2335b3-9f2e-43f2-af28-b01db57e00ba.jpg",
          description: null,
          attachmentPath: "2019/0902/4e2335b3-9f2e-43f2-af28-b01db57e00ba.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T10:09:38.482454Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 23,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 11,
          fileName: "27ed9b27-c6fe-44f1-8564-311b9cb54c66.jpg",
          description: null,
          attachmentPath: "2019/0902/27ed9b27-c6fe-44f1-8564-311b9cb54c66.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T10:13:27.771434Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 24,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 11,
          fileName: "4333f90c-019c-4e1a-9c97-bed87195081d.jpg",
          description: null,
          attachmentPath: "2019/0902/4333f90c-019c-4e1a-9c97-bed87195081d.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T10:25:45.394587Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 25,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 11,
          fileName: "fea0cfb7-dfe1-4337-84d2-887b46e191d5.jpg",
          description: null,
          attachmentPath: "2019/0902/fea0cfb7-dfe1-4337-84d2-887b46e191d5.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T10:26:05.504032Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 26,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 6,
          fileName: "33b5c759-bfe7-4704-a91d-e5d50a9d7574.jpg",
          description: null,
          attachmentPath: "2019/0902/33b5c759-bfe7-4704-a91d-e5d50a9d7574.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T11:07:54.327896Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 27,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 6,
          fileName: "9e2e8e69-127f-4282-a44f-88b5fabebaac.jpg",
          description: null,
          attachmentPath: "2019/0902/9e2e8e69-127f-4282-a44f-88b5fabebaac.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T11:08:32.504747Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 28,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 6,
          fileName: "59dec59d-f4e0-4519-be4a-f8971b056eb6.jpg",
          description: null,
          attachmentPath: "2019/0902/59dec59d-f4e0-4519-be4a-f8971b056eb6.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T11:09:02.058891Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 29,
          caseId: "5dae774c7904e200012d4485",
          categoryId: 1,
          fileName: "7a5d5409-7997-4f72-8c89-2a0318ce6e93.jpg",
          description: null,
          attachmentPath:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571821797693&di=205f8df5677d5f00335365b2004841ba&imgtype=0&src=http%3A%2F%2Fy1.ifengimg.com%2Fcmpp%2F2014%2F05%2F14%2F15%2F67df2582-470a-48cb-acc4-3bfdc169daeb.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T11:11:13.136646Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 30,
          caseId: "5dae774c7904e200012d4485",
          categoryId: 1,
          fileName: "64b7facf-d0df-4337-8bed-abe77f6c6ecf.jpg",
          description: null,
          attachmentPath:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571820900746&di=30f81f533c981ceb97740619ee8a5268&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fq_70%2Cc_zoom%2Cw_640%2Fupload%2F20160708%2Fe13ddede648e401ebb24aeef1a8370c8_th.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T11:23:03.574531Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 31,
          caseId: "5dae774c7904e200012d4485",
          categoryId: 1,
          fileName: "63944d2a-d2ce-409f-91c3-32c32e3ee228.jpg",
          description: null,
          attachmentPath:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571820027489&di=7ee0b0a0f5f00800d22426956b82e0e3&imgtype=0&src=http%3A%2F%2Fwww.shg.com.cn%3A9000%2Fcom.dongrensm.shgadmin%2FfileLoad%2Fupload%2FroutePhoto%2F1436526543652.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T11:24:15.44895Z",
          createdBy: "579570680a506e1320bd2a43"
        },
        {
          id: 32,
          caseId: "5d6cb15be5043000014250d7",
          categoryId: 1,
          fileName: "903bc0d9-ecfe-4791-9fb2-292953998242.jpg",
          description: null,
          attachmentPath:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571819811162&di=7ec992a1645dc36691e231818baf4a6e&imgtype=0&src=http%3A%2F%2Fy3.ifengimg.com%2Fnews_spider%2Fdci_2013%2F06%2F60b16c5639cfde641b4923e86a8ecd53.jpg",
          uploadFlag: 0,
          createdOn: "2019-09-02T11:27:23.438958Z",
          createdBy: "579570680a506e1320bd2a43"
        }
      ]
    };
  },
  computed: {},
  mounted() {
    document.addEventListener("dragover",function(e){
      e.preventDefault();
    })
    this.queryPhotoCategory();
    this.queryPhotos();

//     setInterval(() => {
//       this.currentPhotoList.push({
// 	"id": 1,
// 	"caseId": "5d6cb15be5043000014250d7",
// 	"categoryId": 1,
// 	"fileName": "(null)",
// 	"description": null,
// 	"attachmentPath": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571647121204&di=1771bf0959bec75b23f0b136dca1c185&imgtype=0&src=http%3A%2F%2Fpic34.nipic.com%2F20131030%2F2455348_194508648000_2.jpg",
// 	"uploadFlag": 0,
// 	"createdOn": "2019-09-02T07:50:50.346084Z",
// 	"createdBy": "579570680a506e1320bd2a43"
// });
//  let historyDiv = document.getElementById("pictures_list"+this.id);
//       let scrollHeight = historyDiv.scrollHeight;
//       this.$nextTick(() => {
//       document.getElementById("pictures_list"+this.id).scrollTo({top:scrollHeight});
//        })
//     }, 5000);
    
  },
  watch:{
    currentPhotoList(){
      
    }
  },
  methods: {
    drop(target) {
      if (target.children) {
        this.$Message.warning("不能拖放至一级菜单");
        return false;
      }
      let data = [{ id: this.dragItem.id, categoryId: target.id }];
     
      this.$api.photo.updatePhoto(data).then(res => {
        console.log(res);
         this.dragItem.categoryId = target.id;
       this.currentPhotoList.splice(this.dragIdx,1);
       this.dragIdx = 0;
         this.$Message.success(`图片已成功移动至${target.name}！`);
      }).catch(e=>{
         this.$Message.error(e);
      });
    },
    dragStart(index, e) {
      this.dragItem = this.currentPhotoList[index];
      this.dragIdx = index;
    },
    viewLarge(item) {
      //查看大图
      this.$emit("openImageModal", item);
    },
    picturesTab(item, index) {
      if (item.id == 5) {
        return false;
      }
      this.selectedId = item.id;
      this.currentPhotoList = this.filterPhotos(item.id);
      //展开和高亮
      if (item.children) {
        //带子级的一级菜单
        this.categoryList[index].isExpend = !item.isExpend;
        for (let i = 0; i < this.categoryList.length; i++) {
          if (item.id != this.categoryList[i].id) {
            if (this.categoryList[i].parentId == item.id) {
              if (
                item.children[0].id == this.categoryList[i].id &&
                this.categoryList[index].isExpend
              ) {
                //展开一级菜单时默认选择第一个子项
                this.setSelected(i);
              }
              this.categoryList[i].isShow = !this.categoryList[i].isShow;
            }
          }
        }
        this.$forceUpdate();
      } else {
        this.setSelected(index);
      }
    },
    setSelected(index) {
      //设置分类菜单高亮
      for (let i = 0; i < this.categoryList.length; i++) {
        this.$set(this.categoryList[i], "selected", false);
      }
      this.$set(this.categoryList[index], "selected", true);
    },
    initCategoryList() {
      let level2 = this.categoryList.filter(item => {
        return item.parentId != 0;
      });
      for (let i = 0; i < this.categoryList.length; i++) {
        if (this.categoryList[i].id == this.selectedId) {
          this.setSelected(i);
        }
        if (this.categoryList[i].parentId == 0) {
          this.categoryList[i].isShow = true;
          for (let j = 0; j < level2.length; j++) {
            if (level2[j].parentId == this.categoryList[i].id) {
              if (!this.categoryList[i].children) {
                this.categoryList[i].children = [];
              }
              this.categoryList[i].children.push(level2[j]);
            }
          }
        } else if (this.categoryList[i].parentId == 5) {
          this.categoryList[i].isShow = true;
        }
      }
    },
    filterPhotos(categoryId) {
      return this.photoList.filter(item => {
        return item.categoryId == categoryId;
      });
    },
    getCount(categoryItem) {
      //分别得到图片各分类数量
      let currentList = this.photoList.filter(item => {
        return item.categoryId == categoryItem.id;
      });
      return currentList.length;
    },
    queryPhotoCategory() {
      //查询图片分类
      this.$api.photo.queryPhotoCategory().then(res => {
        this.categoryList = res.data;
        this.initCategoryList();
      });
    },
    queryPhotos() {
      //查询所有图片
      this.currentPhotoList = this.filterPhotos(this.selectedId);
    }
  }
};
</script>
<style scoped>
.pictures_type {
  width: 50%;
  float: left;
  height: calc(50vh - 50px);
  background: #e4eff9;
  overflow-y: auto;
}
.pictures_type li {
  height: 42px;
  line-height: 42px;
  cursor: pointer;
  border-bottom: 1px #aed6ff solid;
  text-align: left;
  padding: 0 15px;
  background: #72b8f8;
  color: #fff;
  position: relative;
  display: none;
}
.pictures_type li:hover,
.pictures_type li.current {
  background: #419cef;
}
.pictures_type li i {
  position: absolute;
  right: 8px;
  top: 14px;
}
.pictures_type li.show {
  display: block;
}
.pictures_type li.level2 {
  background: #fff;
  color: #0d3f6b;
}
.pictures_type li.level2.current {
  background: #d0e7ff;
}
.pictures_list {
  width:50%;
  padding: 10px;
  background: #ced0db;
  height: calc(50vh - 50px);
  overflow-y: auto;
}
.pictures_list li {
  margin-bottom: 10px;
}
.pictures_list li img {
  height: 85px;
  object-fit: cover;
  width: 100%;
  border: 1px #57a3f3 dashed;
  vertical-align: top;
  border-radius: 3px;
}
</style>