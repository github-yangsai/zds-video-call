/**
 * 仓库管理模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/common/utils/http.js'; // 导入http中创建的axios实例
//  import qs from 'qs'; // 根据需求是否导入qs模块

const photo = {
    // 查询图片分类
    queryPhotoCategory() {
        return axios.get(`${base.photoCategory}/`);
    },
    //根据案件号查询所有照片
    queryPhotos(caseId) {
        return axios.get(`${base.photos}/${caseId}/`);
    },
    //删除照片
    delPhoto(id) {
        return axios.delete(`${base.photo}/${id}/`);
    },
    //ocr识别单证
    ocrCard(socketName, params) {
        return axios.post(`${base.ocrCard}/${socketName}`, params);
    },
    //保存OCR结果到信息录入
    saveOcrResult(caseId, type, params) {
        return axios.put(`${base.putCredentials}/${caseId}/${type}`, params);
    },
    //更新图片分类
    updatePhoto(params) {
        return axios.put(`${base.updatePhoto}/`, params);
    },

    //新增摄像头时端口和通道默认值
    cameraSuggest(id) {
        return axios.get(`${base.camera_suggest}/${id}/suggest/`);
    },
    restartServer() {
        return axios.post(`${base.restart}/`);
    },
    nvrConfig(params) {
        return axios.get(`${base.nvr_config}/`, params, { responseType: 'blob' });
    },
    nvrConfigFile(params) {
        return axios({
            method: 'GET',
            url: `${base.nvr_config}/`,
            params: params,
            responseType: 'blob'
        })
    },
    login(params) {
        return axios.post(`${base.login}/`, params);
    }





    // 
    // 新闻详情,演示
    //  articleDetail (id, params) {
    //      return axios.get(`${base.sq}/topic/${id}`, {
    //          params: params
    //      });
    //  },
    // post提交
    //  login (params) {
    //      return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));
    //  }
}

export default photo;