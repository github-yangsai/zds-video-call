/**
 * 仓库管理模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/common/utils/http.js'; // 导入http中创建的axios实例

const caseInfo = {
    // 查询工单详情
    queryCaseDetail(caseId) {
        return axios.get(`${base.caseDetail}/${caseId}`);
    },
    queryPolicyInfo(caseId) {
        return axios.get(`${base.policy}/${caseId}`);
    },
    queryFeedback(caseId) {
        return axios.get(`${base.feedback}/${caseId}`);
    },
    finished(params) {
        return axios.post(`${base.finished}`, params);
    },
    existFeedback(caseId) {
        return axios.get(`${base.feedbackExist}/${caseId}`);
    },
    submitFeedback(params) {
        return axios.post(`${base.submitFeedback}`, params);
    },
    getEvidenceBillAsync(caseId) {
        return axios.get(`${base.evidenceBill}/${caseId}`);
    }

}

export default caseInfo;