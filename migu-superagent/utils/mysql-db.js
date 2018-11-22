/**
 * MySQL连接池工具
 */
const mysql = require('mysql');

class DBUtil {

    /**
     * 配置文件
     */
    constructor(){
        const config = {
            connectionLimit : 50,
            host            : 'localhost',
            user            : 'root',
            password    : 'root',
            database     : 'zljblog',
            multipleStatements : true  //是否允许执行多条sql语句
        }
        this.pool  = mysql.createPool(config);
        console.log(`获取连接池对象:`,this.pool);
    }

    /**
     * 查询数据
     * @param {*} sql SQL语句
     * @param {*} params  数据条件
     */
    query(sql,...params){
        console.log(`查询数据SQL:${sql},参数:`,params);
        return new Promise((resolve,reject)=>{
            this.pool.getConnection((err,connection)=>{
                if(err) return reject(err);
                connection.query( sql , params , (error,res)=>{
                    connection.release();
                    if(error) return reject(error);
                    console.log(`查询结果:`,res);
                    resolve(res);
                });
            });
        });
    }

    /**
     * 添加数据
     * @param {*} sql 
     * @param {*} params 
     */
    add(sql,...params){
        console.log(`添加数据SQL:${sql},参数:`,params);
        return new Promise((resolve,reject)=>{
            this.pool.getConnection((err,connection)=>{
                if(err) return reject(err);
                connection.query( sql , params , (error,res)=>{
                    connection.release();
                    if(error) return reject(error);
                    console.log(`添加结果:`,res);
                    resolve(res);
                });
            });
        });
    }
}

module.exports = new DBUtil();