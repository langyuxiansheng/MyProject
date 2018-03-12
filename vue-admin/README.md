/**
 * Created by Mr.Yu on 2018/1/12 0012.
 * README 项目说明文件
 *
 */

# vue-admin
> this's vue-admin project
# install dependencies
npm install
# serve with hot reload at localhost:8080
npm run dev
# build for production with minification
npm run build
# build for production and view the bundle analyzer report
npm run build --report
以下命令是测试单元
# run unit tests
npm run unit
# run e2e tests
npm run e2e
# run all tests
npm test
```
#开发须知：
    一、关于编程风格
       1、块级作用域
       2、字符串
       3、解构赋值
       4、对象
       5、数组
       6、函数
       7、Map 结构
       8、Class
       9、模块
       10、ESLint 的使用
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
     1、块级作用域
        （1）let 取代 var
            for (let i = 0; i < 10; i++) {
                console.log(i);
            }
        （2）全局常量和线程安全
            在let和const之间，建议优先使用const，尤其是在全局环境，不应该设置变量，只应设置常量。
            const [a, b, c] = [1, 2, 3];
     2、字符串
        静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号。
        const a = 'foobar';
        const b = `foo${a}bar`;
        const c = 'foobar';
     3、解构赋值
        使用数组成员对变量赋值时，优先使用解构赋值。
        const arr = [1, 2, 3, 4];
        const [first, second] = arr;
        函数的参数如果是对象的成员，优先使用解构赋值。
        function getFullName({ firstName, lastName }) {
            //...
        }
        如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。这样便于以后添加返回值，以及更改返回值的顺序。
        function processInput(input) {
            return { left, right, top, bottom };
        }
        const { left, right } = processInput(input);
     4、对象
        单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。
        const a = { k1: v1, k2: v2 };
        const b = {
            k1: v1,
            k2: v2,
        };
        对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用Object.assign方法。
        const a = {};
        Object.assign(a, { x: 3 });
        // good
        const a = { x: null };
        a.x = 3;
        如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义。
        // good
        const obj = {
            id: 5,
            name: 'San Francisco',
            [getKey('enabled')]: true,
        };
        另外，对象的属性和方法，尽量采用简洁表达法，这样易于描述和书写。
        // good
        const atom = {
            ref,
            value: 1,
            addValue(value) {
                return atom.value + value;
            },
        };
     5、数组
        使用扩展运算符（...）拷贝数组。
        const itemsCopy = [...items];
        使用 Array.from 方法，将类似数组的对象转为数组。
        const foo = document.querySelectorAll('.foo');
        const nodes = Array.from(foo);
     6、函数
        立即执行函数可以写成箭头函数的形式。
        (() => {
          console.log('Welcome to the Internet.');
        })();
        那些需要使用函数表达式的场合，尽量用箭头函数代替。因为这样更简洁，而且绑定了 this。
        // bad
        [1, 2, 3].map(function (x) {
            return x * x;
        });
        // good
        [1, 2, 3].map((x) => {
            return x * x;
        });
        // best
        [1, 2, 3].map(x => x * x);
        箭头函数取代Function.prototype.bind，不应再用 self/_this/that 绑定 this。
        // best
        const boundMethod = (...params) => method.apply(this, params);
        简单的、单行的、不会复用的函数，建议采用箭头函数。如果函数体较为复杂，行数较多，还是应该采用传统的函数写法。
        所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数。
        function divide(a, b, { option = false } = {}) {
            //...
        }
        不要在函数体内使用 arguments 变量，使用 rest 运算符（...）代替。因为 rest 运算符显式表明你想要获取参数，
        而且 arguments 是一个类似数组的对象，而 rest 运算符可以提供一个真正的数组。
        function concatenateAll(...args) {
            return args.join('');
        }
        使用默认值语法设置函数参数的默认值。
        // good
        function handleThings(opts = {}) {
            // ...
        }
     7、Map 结构
        注意区分 Object 和 Map，只有模拟现实世界的实体对象时，才使用 Object。如果只是需要key: value的数据结构，使用 Map 结构。因为 Map 有内建的遍历机制。
        let map = new Map(arr);
        for (let key of map.keys()) {
            console.log(key);
        }
        for (let value of map.values()) {
            console.log(value);
        }
        for (let item of map.entries()) {
            console.log(item[0], item[1]);
        }
     8、Class
        总是用 Class，取代需要 prototype 的操作。因为 Class 的写法更简洁，更易于理解。
        // good
        class Queue {
            constructor(contents = []) {
                this._queue = [...contents];
            }
            pop() {
                const value = this._queue[0];
                this._queue.splice(0, 1);
                return value;
            }
        }
        使用extends实现继承，因为这样更简单，不会有破坏instanceof运算的危险。
        // good
        class PeekableQueue extends Queue {
            peek() {
                return this._queue[0];
            }
        }

     9、模块
        首先，Module 语法是 JavaScript 模块的标准写法，坚持使用这种写法。使用import取代require。
        // good
        import { func1, func2 } from 'moduleA';

        使用export取代module.exports。
        // ES6的写法
        import React from 'react';

        class Breadcrumbs extends React.Component {
          render() {
            return <nav />;
          }
        };

        export default Breadcrumbs;

        如果模块只有一个输出值，就使用export default，如果模块有多个输出值，就不使用export default，export default与普通的export不要同时使用。
        不要在模块输入中使用通配符。因为这样可以确保你的模块之中，有一个默认输出（export default）。
        // good
        import myObject from './importModule';
        如果模块默认输出一个函数，函数名的首字母应该小写。
        function makeStyleGuide() {
            //...
        }
        export default makeStyleGuide;

        如果模块默认输出一个对象，对象名的首字母应该大写。
        const StyleGuide = {
            es6: {

            }
        };

        export default StyleGuide;

     10、ESLint 的使用 （建议遵循其规范，开发过程中不必安装，否则报错会降低开发效率）

        ESLint 是一个语法规则和代码风格的检查工具，可以用来保证写出语法正确、风格统一的代码。

        首先，安装 ESLint。

        $ npm i -g eslint
        然后，安装 Airbnb 语法规则，以及 import、a11y、react 插件。

        $ npm i -g eslint-config-airbnb
        $ npm i -g eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
        最后，在项目的根目录下新建一个.eslintrc文件，配置 ESLint。

        {
          "extends": "eslint-config-airbnb"
        }
        现在就可以检查，当前项目的代码是否符合预设的规则。

        index.js文件的代码如下。

        var unusued = 'I have no purpose!';

        function greet() {
            var message = 'Hello, World!';
            alert(message);
        }

        greet();
        使用 ESLint 检查这个文件，就会报出错误。

        $ eslint index.js
        index.js
          1:1  error  Unexpected var, use let or const instead          no-var
          1:5  error  unusued is defined but never used                 no-unused-vars
          4:5  error  Expected indentation of 2 characters but found 4  indent
          4:5  error  Unexpected var, use let or const instead          no-var
          5:5  error  Expected indentation of 2 characters but found 4  indent

        ✖ 5 problems (5 errors, 0 warnings)
        上面代码说明，原文件有五个错误，其中两个是不应该使用var命令，而要使用let或const；一个是定义了变量，却没有使用；另外两个是行首缩进为 4 个空格，而不是规定的 2 个空格。



#项目结构
 Admin
 |-- build                            // 项目构建(webpack)相关代码
 |   |-- build.js                     // 生产环境构建代码
 |   |-- check-version.js             // 检查node、npm等版本
 |   |-- dev-client.js                // 热重载相关
 |   |-- dev-server.js                // 构建本地服务器
 |   |-- utils.js                     // 构建工具相关
 |   |-- webpack.base.conf.js         // webpack基础配置
 |   |-- webpack.dev.conf.js          // webpack开发环境配置
 |   |-- webpack.prod.conf.js         // webpack生产环境配置
 |-- config                           // 项目开发环境配置
 |   |-- dev.env.js                   // 开发环境变量
 |   |-- index.js                     // 项目一些配置变量
 |   |-- prod.env.js                  // 生产环境变量
 |   |-- test.env.js                  // 测试环境变量
 |-- src                              // 源码目录
 |   |-- common                       // 项目公共方法接Api接口
 |   |-- components                   // vue公共组件
 |   |-- router                       // vue项目路由
 |   |-- store                        // vuex的状态管理
 |   |-- views                        // view视图层
 |   |-- App.vue                      // 页面入口文件
 |   |-- main.js                      // 程序入口文件，加载各种公共组件
 |-- static                           // 静态文件，比如一些图片，json数据等
 |   |--css                           // 项目公共样式类 less
 |   |--img                           // 项目图片文件夹
 |   |--js                            // 项目依赖 如i18n 语言包等
 |-- .babelrc                         // ES6语法编译配置
 |-- .editorconfig                    // 定义代码格式
 |-- .gitignore                       // git上传需要忽略的文件格式
 |-- README.md                        // 项目说明
 |-- favicon.ico
 |-- index.html                       // 入口页面
 |-- package.json                     // 项目基本信息
