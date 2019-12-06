import { stat } from "fs";
import _ from 'lodash';

const videoBody = {
    state: {
        currentVideo: 1,
        data: [],
        signalr: null,
        signalrStatus: 0
    },
    mutations: {
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

    }
};

export default videoBody;