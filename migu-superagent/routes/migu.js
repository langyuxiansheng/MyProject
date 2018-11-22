var express = require('express');
var router = express.Router();
const migu = require('../superagent/migu-superagent');
const mysqlDB = require('../utils/mysql-db');

/**
 * 返回爬取的歌词列表
 */
router.get('/beginMusics', async(req, res, next) => {
    //咪咕网站首页
    const miguHome = `http://music.migu.cn/v2`;
    const musics = await migu.init(miguHome);
    //爬取的数据存到数据库
    if(musics && musics.length > 0){
        let sql = `INSERT INTO music (musicId, musicName,songSinger,songCover,createdTime,updateTime) VALUES ?`;
        //去除ID重复的歌曲
        let obj = {};
        let tempArr = musics.reduce(function(item, next) {
            obj[next.musicId] ? '' : obj[next.musicId] = true && item.push(next);
            return item;
        },[]);

        //转为数据库存储对象
        let values = tempArr.map(item => {
            const {musicId, musicName,songSinger,songCover} = item;
            return [musicId, musicName,songSinger,songCover,Date.parse(new Date()),null]
        });
        //返回sql执行结果
        let result = await mysqlDB.add(sql,values);
        if(result && result.affectedRows > 0){
            res.send({ code: 200, msg: 'SUCCESS',data:musics});
        }else{
            res.send({ code: 400, msg: '添加异常!'});
        }
    }else{
        res.send({ code: 400, msg: '参数不能为空!'});
    }
});

module.exports = router;