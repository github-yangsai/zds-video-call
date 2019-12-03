/**
 * 仓库管理模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/common/utils/http.js'; // 导入http中创建的axios实例

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
}

export default photo;