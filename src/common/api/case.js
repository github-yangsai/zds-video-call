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
    }

}

export default caseInfo;