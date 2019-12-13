import store from '@/store/index'
const Common = {
    logout(_this) {
        if (_this.socket) {
            _.forEach(_this.socket._callbacks, (value, key) => {
                _this.socket.off(key);
            });

            // 断开socket
            _this.socket.close();
        }
        _this.$store.commit("setSocket", null);
        _this.$store.commit("setSocketStatus", 0);
        sessionStorage.clear();
        _this.$router.push({ name: "login" });
    },
    fixFileUrl(url) {
        // let file_site_url = location.protocol + "//" + location.host;
        let file_site_url = " http://192.168.16.90:8001";
        return url ? `${file_site_url}/${url}` : url;
    },
    send(eventName, customerId, methodName, message) {
        let socket = store.state.videoBody.socket;
        if (!socket) {
            return;
        }
        socket.emit(eventName, customerId, methodName, message);
    },

    on(methodName) {
        let socket = store.state.videoBody.socket;
        if (!socket) {
            return;
        }
        // return new Promise(function (resolve, reject) {
        //   this.socket.on(methodName, (data: any) => {
        //     return data;
        //   });
        // })
        let observable = new Observable(observer => {
            socket.on(methodName, (data) => {
                if (this.ackFlag) {}
                observer.next(data);
            });
        })
        return observable;
    }


};
export default Common;