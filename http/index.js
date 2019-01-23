/**
 * 在这里导出你需要用到的api方法,apis里面的那些
 */
import apis from './wrapper';
/* 
这里是方便看业务模块里有哪些方法,除了就没啥用了
var str = '';
Object.keys(apis).forEach((key) => {
    // console.log(str += `,${key}`);
}); */

export const {
    //test 业务模块
    getTest,
    postTest,
    putTest,
    deleteTest

} = apis;