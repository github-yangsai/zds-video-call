import { stat } from "fs";
import _ from 'lodash';

const videoBody = {
    state: {
        currentVideo: 1,
        data: [],
        signalr: null,
        signalrStatus: 0,
        takePicDisabled: false
    },
    mutations: {
        setButtonDisabled(state, val) {
            state.takePicDisabled = val;
        },
        setCurrentVideo(state, val) {
            state.currentVideo = val;
        },
        setVideoData(state, data) {
            if (data.clear) {
                _.remove(state.data, function(item) {
                    return item.id == data.id;;
                });
                return false;
            }
            let videoData = {};
            for (let i = 0; i < state.data.length; i++) {
                if (videoData.id == state.data[i].id) {
                    videoData = state.data[i].video;
                    break;
                }
            }
            for (let key in data) {
                if (key != "id") {
                    videoData[key] = data[key];
                }
            }
        },
        setBasicInfoData(state, data) {
            let basicInfo = Object.assign({}, data.basicInfo);
            for (let i = 0; i < state.data.length; i++) {
                if (data.id == state.data[i].id) {
                    state.data[i].basicInfo = basicInfo;
                    break;
                }
            }
            state.data.push({});
            state.data.pop();
        },
        setPolicyInfo(state, data) {
            let compulsoryInsurance = Object.assign({}, data.compulsoryInsurance);
            let commercialInsurance = Object.assign({}, data.commercialInsurance);
            for (let i = 0; i < state.data.length; i++) {
                if (data.id == state.data[i].id) {
                    state.data[i].compulsoryInsurance = compulsoryInsurance;
                    state.data[i].commercialInsurance = commercialInsurance;
                    break;
                }
            }
            state.data.push({});
            state.data.pop();
        },
        setData(state, data) {
            state.data.push(data);
        },
        setSignalr(state, data) {
            state.signalr = data;
        },
        setSignalrStatus(state, data) {
            state.signalrStatus = data;
        }

    },
    actions: {

    },
    getters: {
        getCurrentData: (state) => (id) => {
            return state.data.find(item => item.id === id)
        }
    }
};

export default videoBody;