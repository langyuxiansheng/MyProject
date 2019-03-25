/***
 * Created by Simple on 2019年3月22日13:53:54
 * mergedApis模块
 */

const request = require('./interceptor');
const models = require('./models/index.js');
const config = {
    url: '/', // DEFAULT_URL
    method: 'get' // DEFAULT_METHOD
};
const http = (config) => request(config);
module.exports = (() => {
    return Object
        .keys(models)
        .reduce((acc, apiKey) => {
            return Object.assign(acc, {
                [apiKey]: data => http(models[apiKey](data))
            });
        }, {});
})();