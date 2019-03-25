## 小程序通用的http请求模块

使用 async 和 async 来处理异步请求,告别了繁琐的回调函数,从此之后写异步函数就像写同步函数一样的简单

---
#### 使用举例

1. 首先在http/models/test.js 声明接口及请求的方式,并在http/models/index.js 进行合并导出

test.js
```
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
```
2. 合并导出

http/models/index.js
```
/**
 * 通用导出模块
 */
const test = require('./test');
module.exports = {
    ...test
};
```

3. 在http/index.js声明解构

http/index.js
```
/**
 * http导出声明
 */
const apis = require('./wrapper');
module.exports = {
    postTest,
    getTest
} = apis;
```

4. 在任意的微信小程序组件里面引入

pages/index.js
```
//导入模块
const { getTest } = require('../../http/index.js');

//组件内调用
/**
 * http 测试
 */
async test(){
    const {code,data,msg} = await getTest({ parkId: 11,limit:10,page:1 });
    //获取到结果
    console.log(code,data,msg);
},

```

### 模块目录结构
```
 http
 |-- models                           // 接口模块化目录(一般情况下按业务分模块,方便维护)
 |   |-- index.js                     // 模块合并导出
 |   |-- test.js                      // 业务接口测试模块（接口都在这里写）
 |   |-- types                        // 常量文件（服务名前缀在这里写）
 |-- index.js                         // 项目构建公共资源文件
 |-- interceptor.js                   // 通用拦截器 request（设置需要拦截的资源）
 |-- wrapper.js                       // 合并API，任务队列（一般情况下无需修改）
```

---
注意：

demo中使用的接口 数据返回格式如下：

遵循 restfulAPI 接口风格

成功为 200 错误为400 登录失效为 401 
```
{
    code: 200,
    data: [],
    msg: 'success'
}
```
