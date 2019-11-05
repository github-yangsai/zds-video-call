import { stat } from "fs";

const videoBody = {
    state: {
        currentVideo: 1,
        data: [{
                id: 1,
                chat: [{ role: "client", msg: "你好，我想问下..." }],
                photosCategory: [],
                video: {
                    id: 1,
                    muteFlag: false,
                    rtc: {
                        client: null,
                        joined: false,
                        published: false,
                        localStream: null,
                        remoteStreams: [],
                        params: {}
                    },
                    option: {
                        mode: "rtc",
                        codec: "h264",
                        appID: "4f74b5716ed346c597e476932b878962",
                        channel: "12",
                        uid: 2222,
                        token: ""
                    }
                }
            },
            {
                id: 2,
                chat: [{ role: "client", msg: "这个具体是怎么操作的呢？" }],
                photosCategory: [],
                video: {
                    id: 2,
                    muteFlag: false,
                    rtc: {
                        client: null,
                        joined: false,
                        published: false,
                        localStream: null,
                        remoteStreams: [],
                        params: {}
                    },
                    option: {
                        mode: "rtc",
                        codec: "h264",
                        appID: "4f74b5716ed346c597e476932b878962",
                        channel: "22",
                        uid: 333,
                        token: ""
                    }
                }
            }
        ],
        data1: {
            id: 1,
            chat: [{ role: "client", msg: "你好，我想问下..." }],
            photosCategory: [],
            video: {
                id: 1,
                muteFlag: false,
                rtc: {
                    client: null,
                    joined: false,
                    published: false,
                    localStream: null,
                    remoteStreams: [],
                    params: {}
                },
                option: {
                    mode: "rtc",
                    codec: "h264",
                    appID: "4f74b5716ed346c597e476932b878962",
                    channel: "12",
                    uid: 2222,
                    token: ""
                }
            }
        },
        data2: {
            id: 2,
            chat: [{ role: "client", msg: "这个具体是怎么操作的呢？" }],
            photosCategory: [],
            video: {
                id: 2,
                muteFlag: false,
                rtc: {
                    client: null,
                    joined: false,
                    published: false,
                    localStream: null,
                    remoteStreams: [],
                    params: {}
                },
                option: {
                    mode: "rtc",
                    codec: "h264",
                    appID: "4f74b5716ed346c597e476932b878962",
                    channel: "22",
                    uid: 333,
                    token: ""
                }
            }
        }
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
        setPhotosCategory(state, data) {
            // state['data' + data.id].photosCategory = data;
        }

    },
    actions: {

    }
};

export default videoBody;