const { API_PARKING, API_COMMON } = require('./types');
module.exports = {

    /**
     * post
     * @param {*} data
     */
    postTest(data) {
        return {
            url: `${API_PARKING}/postCommand`,
            method: 'post',
            data
        };
    },

    /**
     * get
     * @param {*} param0
     */
    getTest({ parkId, page, limit }) {
        return {
            url: `${API_COMMON}/getUserBase`,
            method: 'get',
            params: { parkId, page, limit }
        };
    }
};