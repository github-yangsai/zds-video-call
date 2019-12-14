import base from './base'; // 导入接口域名列表
import axios from '@/common/utils/http.js'; // 导入http中创建的axios实例

const common = {
    // 登录
    login(params) {
        return axios.post(`${base.login}`, params);
    },
    getCurrentUser() {
        return axios.get(`${base.getUser}`);
    },
    sessionConnected(params) {
        return axios.post(`${base.sessionConnected}`, params);
    },
    sessionUnConnected(params) {
        return axios.get(`${base.sessionUnConnected}?${params}`);
    },
    seatIn() {
        return axios.get(`${base.seatIn}`);
    },
    seatOut() {
        return axios.get(`${base.seatOut}`);
    }

}

export default common;