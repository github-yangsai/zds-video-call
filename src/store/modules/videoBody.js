import { stat } from "fs";

const videoBody = {
    state: {
        currentVideo: 1,
        data: []
    },
    mutations: {
        setCurrentVideo(state, val) {
            state.currentVideo = val;
        },
        setVideoData(state, data) {
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
        }

    },
    actions: {

    }
};

export default videoBody;