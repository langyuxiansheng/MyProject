var express = require('express');
var router = express.Router();
//引入第三方模块，superagent用于http请求，cheerio用于解析DOM
const request = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');

const getplayurl = `http://music.migu.cn/v2/async/audioplayer/playurl`; //	播放地址详情 
const musicIndex = `http://music.migu.cn/v2/music/billboard`; //咪咕排行榜

/**
 * 获取咪咕页面的歌曲
 * @param {*} page 
 */
const getMusicIds = ({ url, page }) => {
    return new Promise((resolve, reject) => {
        request.get(url).query({ page }).end((err, result) => {
            if (err) reject(err);
            //缓存dom
            let $ = cheerio.load(result.text);
            let musicIds = [];
            //抓取需要的数据,each为cheerio提供的方法用来遍历
            //分析所需要的数据的DOM结构
            $('#js_songlist .billboard-item').each((index, element) => {
                //通过选择器定位到目标元素，再获取到数据
                let temp = {
                    musicId: $(element).attr('mid'), //歌曲id
                    songCover: $(element).find('.song-name .song-cover-pic > img').data('original'), //歌曲封面图
                    musicName: $(element).find('.song-name-text > a').text(), //歌曲名
                    songSinger: $(element).find('.song-singer > a').text(), //歌手名
                }
                console.log(`正在抓取:${JSON.stringify(temp)}`);
                musicIds.push(temp);
            });
            resolve(musicIds);
        })
    });
}

/**
 * 获取播放地址
 * @param {*} songId 
 */
const getPlayUrl = (songId) => {
    return new Promise((resolve, reject) => {
        request.get(`${getplayurl}/${songId}`).end((err, result) => {
            if (err) reject(err);
            if (result.ok) {
                var data = result.body;
                console.log(`已获取:[${data.musicName},${data.artistId}]`)
                resolve(data);
            } else {
                resolve(result);
            }
        })
    });
}

/**
 * 返回歌词列表
 */
router.get('/', async(req, res, next) => {
    //获取id
    var musicIds = await getMusicIds({ url: musicIndex, page: 1 });
    var musics = [];

    //有数据
    if (musicIds && musicIds.length > 0) {
        //迭代递归获取
        (async function iterator(i, list) {
            if (i === list.length) {
                console.log(musics)
                res.send({
                    code: 200,
                    msg: 'SUCCESS',
                    data: musics
                })
                return console.log(`抓取完成`)
            };
            var data = await getPlayUrl(list[i].musicId);
            musics.push(data);
            i++;
            iterator(i, list);
        })(0, musicIds)
    } else {
        res.send({ code: 400, msg: 'FAILED' })
    }
});


module.exports = router;