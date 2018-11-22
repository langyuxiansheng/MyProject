var express = require('express');
var router = express.Router();
const mysqlDB = require('../utils/mysql-db');
const request = require('superagent');
const getplayurl = `http://music.migu.cn/v2/async/audioplayer/playurl`; //	播放地址详情 

/**
 * 获取歌曲列表
 */
router.get('/getMusicList', async(req, res, next) => {
    var data = await mysqlDB.query(`SELECT * FROM music ORDER BY createdTime DESC`);
    console.log(data);
    if(data && data.length > 0){
        res.send({ code: 200, msg: 'SUCCESS',data})
    }else{
        res.send({ code: 400, msg: 'FAILED' });
    }
});

/**
 * 播放音乐详情
 * @param musicId 
 */
router.get('/playMusic/:musicId', async(req, res, next) => {
    const {musicId} = req.params;
    if(musicId){
        //去咪咕网拿到数据返回给前端
        request.get(`${getplayurl}/${musicId}`).end((err, result) => {
            if (err) res.send({ code: 400, msg: '获取播放详情异常'});;
            if(result && result.body){
                res.send({ code: 200, msg: 'SUCCESS',data:result.body});
            }else{
                res.send({ code: 400, msg: '获取播放详情异常' });
            }
        });
    }else{
        res.send({ code: 400, msg: '参数不齐!' });
    }
});


/**
 * 批量添加
 */
router.post('/addMusics', async(req, res, next) => {
    const {musics} = req.body;
    console.log(musics)
    if(musics && musics.length > 0){
        let values = [];
        let sql = `INSERT INTO music (musicId, musicName,songSinger,songCover,createdTime,updateTime) VALUES ?`;
        for(let item of musics){
            const {musicId, musicName,songSinger,songCover} = item;
            const timestamp = Date.parse(new Date());
            values.push([musicId, musicName,songSinger,songCover,timestamp,null]);
        }

        console.log(values)
        let data = await mysqlDB.add(sql,values);
        res.send({ code: 200, msg: 'SUCCESS'})
    }else{
        res.send({ code: 400, msg: '参数不能为空!'})
    }
 });

module.exports = router;