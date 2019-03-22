/***
 * Created by Simple on 2019年3月22日13:53:54
 * mergedApis模块
 */

const request = require('./interceptor');
const models = require('./models/index.js');
const http = ({
    url = '/', // DEFAULT_URL
    method = 'get', // DEFAULT_METHOD
    ...rest // REST_CONFIGS { data, headers, ... }  [OPTIONAL]
}) => request({
    url: `${url}`,
    method,
    ...rest
});

module.exports = (() => {
    return Object
        .keys(models)
        .reduce((acc, apiKey) => {
            return {
                ...acc,
                [apiKey]: data => http(models[apiKey](data))
            };
        }, {});
})();