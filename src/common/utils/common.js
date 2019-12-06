const Common = {
    logout(_this) {
        if (_this.signalr) {
            // 删除所有signalr监听方法
            _.forEach(_this.signalr.methods, (value, key) => {
                _this.signalr.off(key);
            });

            // 断开signalr
            _this.signalr.stop();
        }
        _this.$store.commit("setSignalr", null);
        _this.$store.commit("setSignalrStatus", 0);
        sessionStorage.clear();
        _this.$router.push({ name: "login" });
    }


};
export default Common;