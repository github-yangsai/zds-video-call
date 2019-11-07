<template>
  <div class="ocr_box">
    <div class="ocr_bar">
      <a href="javascript:void(0)" @click="toOcr($event,2)">驾驶证</a>
      <a href="javascript:void(0)" @click="toOcr($event,3)">行驶证</a>
      <a href="javascript:void(0)" @click="toOcr($event,1)">身份证</a>
      <a href="javascript:void(0)" @click="toOcr($event,4)">银行卡</a>
    </div>
    <Modal v-model="ocrFlag" width="850" class-name="ocr_modal" :loading="isOkloading">
      <p slot="header">{{ocrType}}识别结果</p>
      <div class="result_content">
        <div class="check_img" v-if="data.attachmentPath">
          <img :src="data.attachmentPath" />
        </div>
        <Form ref="checkResult" :model="modelData" :rules="ruleValidate" :label-width="120">
          <!--身份证识别结果-->
          <div class="discern_result" v-if="ocrId==1">
            <Row>
              <Col span="11">
                <FormItem label="姓名" prop="name">
                  <Input v-model="idcardResult.name"></Input>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="身份证号码" prop="num">
                  <Input v-model="idcardResult.num"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="11">
                <FormItem label="民族" prop="nationality">
                  <Input v-model="idcardResult.nationality"></Input>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="性别" prop="sex">
                  <Input v-model="idcardResult.sex"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="11">
                <FormItem label="出生日期" prop="birth">
                  <Input v-model="idcardResult.birth"></Input>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="住址" prop="address">
                  <Input v-model="idcardResult.address"></Input>
                </FormItem>
              </Col>
            </Row>
          </div>
          <!--驾驶证识别结果-->
          <div class="discern_result" v-if="ocrId==2">
            <Row>
              <Col span="11">
                <FormItem label="姓名" prop="name">
                  <Input v-model="driverLicResult.name"></Input>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="身份证号码" prop="num">
                  <Input v-model="driverLicResult.num"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="11">
                <FormItem label="性别" prop="sex">
                  <Input v-model="driverLicResult.sex"></Input>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="住址" prop="addr">
                  <Input v-model="driverLicResult.addr"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="11">
                <FormItem label="准驾车型" prop="vehicleType">
                  <Input v-model="driverLicResult.vehicleType"></Input>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="初次领证日期" prop="issueDate">
                  <Input v-model="driverLicResult.issueDate"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="11">
                <FormItem label="有效期限起" prop="startDate">
                  <Input v-model="driverLicResult.startDate"></Input>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="有效期限止" prop="endDate">
                  <Input v-model="driverLicResult.endDate"></Input>
                </FormItem>
              </Col>
            </Row>
          </div>
          <!--行驶证识别结果-->
          <div class="discern_result" v-if="ocrId==3">
            <Row>
              <Col span="11">
                <FormItem label="所有人" prop="owner">
                  <Input v-model="vehicleLicResult.owner"></Input>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="号牌号码" prop="plateNum">
                  <Input v-model="vehicleLicResult.plateNum"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="11">
                <FormItem label="车辆类型" prop="vehicleType">
                  <Input v-model="vehicleLicResult.vehicleType"></Input>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="使用性质" prop="useCharacter">
                  <Input v-model="vehicleLicResult.useCharacter"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="11">
                <FormItem label="车辆识别代号" prop="vin">
                  <Input v-model="vehicleLicResult.vin"></Input>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="注册登记日期" prop="registerDate">
                  <Input v-model="vehicleLicResult.registerDate"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="11">
                <FormItem label="发证日期" prop="issueDate">
                  <Input v-model="vehicleLicResult.issueDate"></Input>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="号牌号码" prop="plateNum">
                  <Input v-model="vehicleLicResult.plateNum"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="11">
                <FormItem label="发动机号码" prop="engineNum">
                  <Input v-model="vehicleLicResult.engineNum"></Input>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="住址" prop="addr">
                  <Input v-model="vehicleLicResult.addr"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="11">
                <FormItem label="品牌型号" prop="model">
                  <Input v-model="vehicleLicResult.model"></Input>
                </FormItem>
              </Col>
            </Row>
          </div>
          <!--银行卡识别结果-->
          <div class="discern_result" v-if="ocrId==4">
            <Row>
              <Col span="11">
                <FormItem label="银行名称" prop="bankName">
                  <Input v-model="bankCardResult.bankName"></Input>
                   <p class="highlights_color" v-if="bandCardTips">提示：您的银行卡可能已过期</p>
                </FormItem>
              </Col>
              <Col span="11" offset="1">
                <FormItem label="卡号" prop="cardNum">
                  <Input v-model="bankCardResult.cardNum"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="11">
                <FormItem label="有效期" prop="validDate">
                  <Input v-model="bankCardResult.validDate"></Input>
                </FormItem>
              </Col>
            </Row>
          </div>
          <Row>
            <Col span="11" offset="12" style="text-align:right">
              <FormItem>
                <Button @click="cancelSave">取消</Button>
                <Button type="primary" @click="saveData('checkResult')" style="margin-left: 8px">确定</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer" style="border:none;padding:0;"></div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "ocrBody",
  props: ["data"],
  data() {
    return {
      bandCardTips:false,
      isOkLoading:false,
      ocrId: 0,
      ocrType: "",
      ocrFlag: false,
      idcardResult: {
        name: "",
        num: "",
        nationality: "",
        sex: "",
        birth: "",
        address: ""
      },
      driverLicResult: {
        name: "",
        num: "",
        vehicleType: "",
        sex: "",
        birth: "",
        addr: "",
        issueDate: "",
        startDate: "",
        endDate: ""
      },
      vehicleLicResult: {
        owner: "",
        plateNum: "",
        vehicleType: "",
        useCharacter: "",
        vin: "",
        registerDate: "",
        issueDate: "",
        engineNum: "",
        addr: "",
        model: ""
      },
      bankCardResult: {
        bankName: "",
        cardNum: "",
        validDate: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "此项为必填项",
            trigger: "blur"
          }
        ],
        num: [
          {
            required: true,
            message: "此项为必填项",
            trigger: "blur"
          }
        ],
        nationality: [
          {
            required: true,
            message: "此项为必填项",
            trigger: "blur"
          }
        ],
        sex: [{ required: true, message: "此项为必填项", trigger: "blur" }],
        birth: [{ required: true, message: "此项为必填项", trigger: "blur" }],
        address: [{ required: true, message: "此项为必填项", trigger: "blur" }],
        addr: [{ required: true, message: "此项为必填项", trigger: "blur" }]
      }
    };
  },
  computed: {
    modelData() {
      let result = "";
      if (this.ocrId) {
        switch (this.ocrId) {
          case 2:
            result = this.driverLicResult;
            break;
          case 3:
            result = this.vehicleLicResult;
            break;
          case 1:
            result = this.idcardResult;
            break;
          case 4:
            result = this.bankCardResult;
            break;
        }
        return result;
      }
    }
  },
  mounted() {
    this.setRules(this.idcardResult);
    this.setRules(this.driverLicResult);
    this.setRules(this.vehicleLicResult);
    this.setRules(this.bankCardResult);
  },
  methods: {
    setRules(result) {
      for (let key in result) {
        this.ruleValidate[key] = [
          {
            required: true,
            message: "此项为必填项",
            trigger: "blur"
          }
        ];
      }
    },
    toOcr(event, id) {
      event.stopPropagation();
      let socketName = "";
      this.ocrId = id;
      switch (id) {
        case 2:
          this.ocrType = "驾驶证";
          socketName = "driverLic";
          break;
        case 3:
          this.ocrType = "行驶证";
          socketName = "vehicleLic";
          break;
        case 1:
          this.ocrType = "身份证";
          socketName = "idcard";
          break;
        case 4:
          this.ocrType = "银行卡";
          socketName = "bankCard";
          break;
      }
      this.currentId = id;
      let data = new FormData();
      data.append("imgUrl", this.data.attachmentPath);
      data.append("srcType", "2");
      // this.ocrFlag = true;

      this.$Modal.confirm({
        title: `您确定要对该照片进行${this.ocrType}识别吗？`,
        content: "",
        onOk: () => {
          this.$api.photo
            .ocrCard(socketName, data)
            .then(res => {
              console.log(res);
              let data = res.data;

              //日期格式化
              for (const key in data) {
                if (
                  key == "endDate" ||
                  key == "issueDate" ||
                  key == "startDate" ||
                  key == "birth" ||
                  key == "registerDate"
                ) {
                  if (data[key]) {
                    data[key] = data[key].replace(/(\d{4})(\d{2})/g, "$1-$2-");
                  }
                } else if (key == "validDate" && data[key]) {
                  this.checkValidDate(data[key]);
                }
              }
              switch (id) {
                case 2:
                  this.driverLicResult = data;
                  break;
                case 3:
                  this.vehicleLicResult = data;
                  break;
                case 1:
                  this.idcardResult = data;
                  break;
                case 4:
                  this.bankCardResult = data;
                  break;
              }
              // this.setValidateForm(data);

              this.ocrFlag = true;
            })
            .catch(e => {});
        }
      });
    },
    checkValidDate(val) {
      //银行卡信息处理
      if (val) {
        let _ye = (new Date().getFullYear() + "").slice(0, 2);
        let year = _ye + val.slice(3);
        let month = val.slice(0, 2);
        let finalDate = new Date(`${year}-${month}`).getTime();
        if (new Date().getTime() > finalDate) {
          this.bandCardTips = true;
        }
      }
    },
    setValidateForm(data) {
      let tempObj = {};
      for (let key in data) {
        tempObj[key] = [data[key], [Validators.required]];
      }
      this.validateForm = this.fb.group(tempObj);
    },
    saveData(name) {
      //保存单证识别结果到信息录入中
      this.$refs[name].validate(valid => {
        if (valid) {
          let type = this.ocrId;
          let caseId = this.data.caseId;
          let data = {};
          this.isOkLoading = true;
          switch (this.ocrId) {
            case 2:
              data.data = this.driverLicResult;
              break;
            case 3:
              data.data = this.vehicleLicResult;
              break;
            case 1:
              data.data = this.idcardResult;
              break;
            case 4:
              data.data = this.bankCardResult;
              break;
          }
          this.$api.photo
            .saveOcrResult(caseId, type, data)
            .then(res => {
              this.isOkLoading = false;
              console.log(res);
              this.$Message.success("保存成功");
              this.ocrFlag = false;
            })
            .catch(e => {
              this.isOkLoading = false;
            });
        } else {
          this.$Message.warning("请先完善信息");
        }
      });
    },
    cancelSave() {
      this.ocrFlag = false;
    }
  }
};
</script>
<style scoped>
.ocr_bar a {
  display: inline-block;
  background: #419cef;
  text-align: center;
  color: #fff;
  height: 24px;
  line-height: 24px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  margin: 0 2px;
  padding: 0 10px;
}

.ocr_bar a:hover {
  background: #267ac7;
}

.large.ocr_bar {
  z-index: 20;
  position: fixed;
  bottom: 0;
  margin-left: -400px;
  left: 50%;
  width: 800px;
}

.large.ocr_bar a {
  display: block;
  height: 35px;
  line-height: 35px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.ocr_bar.one.large {
  width: 100px;
  margin-left: -50px;
}

.ocr_bar.one span {
  width: 100%;
}
.check_img {
  width: 380px;
  margin: 0 auto 30px;
}

.check_img img {
  width: 100%;
  border-radius: 10px;
}
.highlights_color {
    color: #f5222d;
    padding: 5px 0 0;
}
</style>