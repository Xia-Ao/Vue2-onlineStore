const util = {
    refresh: function () {
        let userId = document.cookie.replace(/(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/, '$1');
        return userId;
    }
};


export default util;
