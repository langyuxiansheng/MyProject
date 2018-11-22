//引入第三方模块，superagent用于http请求，cheerio用于解析DOM
const request = require('superagent');
const cheerio = require('cheerio');

//基础域名
let baseUrl = `http://music.migu.cn`;
//咪咕网站首页
//const miguHome = `http://music.migu.cn/v2`;
const getplayurl = `http://music.migu.cn/v2/async/audioplayer/playurl`; //	播放地址详情 
//const musicIndex = `http://music.migu.cn/v2/music/billboard`; //咪咕排行榜

class Migu {

    /**
     * 获取对应的表单
     * @param {*} domId Document 节点id
     */
    __getList($,domId) {
        let miguArr = [];
        $(`#${domId} .swiper-slide`).each((index, element) => {
            //通过选择器定位到目标元素，再获取到数据
            let temp = {
                url: baseUrl + $(element).find('.img-cover a').attr('href'), //榜单链接地址
                songCover: $(element).find('.items-top > img').attr('src'), //歌曲封面图
            }
            console.log(`正在抓取:${JSON.stringify(temp)}`);
            miguArr.push(temp);
        });
        return miguArr;
    }

    /**
     * 获取咪咕首页的歌单/榜单/音乐人
     * @param {*} url 首页地址
     */
    __getHomeMusic({ url }) {
        return new Promise((resolve, reject) => {
            request.get(url).end((err, result) => {
                if (err) reject(err);
                //缓存dom
                let $ = cheerio.load(result.text);
                const getList = this.__getList;

                //咪咕新歌
                let newSongList = getList($,'song');
                //咪咕歌单
                let songlist = getList($,'songlist');
                //咪咕榜单
                let billboardList = getList($,'billboard');
                //咪咕音乐人
                let musiciansList = getList($,'musicians');
                //{ newSongList, songlist, billboardList, musiciansList }
                //返回整个首页的数据
                resolve(newSongList.concat(songlist, billboardList, musiciansList));
            })
        });
    }

    /**
     * 初始化
     * @param {*} url 
     */
    async init(url){
        let homeMusic = await this.__getHomeMusic({ url });
        console.log(`歌单列表共:${homeMusic.length}条,歌单页面抓取开始:`,homeMusic);
        const getMusicIds = this.__getMusicIds;
        const _this = this;
        let musicIds = [];
        return new Promise((resolve, reject) => {
            (async function iterator(i,list){
                console.log(`当前递归数据:`,i,list[i]);
                if(i === list.length - 1) {
                    let arr = [];
                    if(musicIds.length > 0){
                        for(let x in musicIds){
                            for(let y in musicIds[x]){
                                arr.push(musicIds[x][y]);
                            }
                        }
                    }
                    console.log(`歌曲列表抓取完毕:`,arr);
                    resolve(arr);
                }else{
                    let ids = await getMusicIds({url:homeMusic[i].url},_this);
                    musicIds.push(ids);
                    console.log(`当前IDS:`,ids,`全部`,musicIds)
                    i++;
                    iterator(i,list);
                }
            })(0,homeMusic)
        });
    }

    /**
     * 获取歌曲的详情
     * @param {*} songId 
     */
    __getPlayUrl(songId){
        return new Promise((resolve, reject) => {
            request.get(`${getplayurl}/${songId}`).end((err, result) => {
                if (err) reject(err);
                var data = result.body;
                if(data){
                    console.log(`已获取:[${data.musicName}]`);
                }else{
                    console.log(`详情异常:[${data}]`);
                }
                resolve(data);
            })
        });
    }

    /**
     * 获取歌曲ID列表
     * @param {*} param0 
     */
    __getMusicIds({ url, page },self) {
        return new Promise((resolve, reject) => {
            console.log(`开始抓取:`,url);
            request.get(url).query({ page }).end((err, result) => {
                if (err) reject(err);
                if(result && result.text){
                    //缓存dom
                    let $ = cheerio.load(result.text);
                    let musicIds = [];
                    //抓取需要的数据,each为cheerio提供的方法用来遍历
                    //分析所需要的数据的DOM结构
                    $('#js_songlist .songlist-item').each(async (index, element) => {
                        //通过选择器定位到目标元素，再获取到数据
                        let temp = {
                            musicId: $(element).attr('mid'), //歌曲id
                            songCover: $(element).find('.song-name .song-cover-pic > img').data('original') || null, //歌曲封面图
                            musicName: $(element).find('.song-name-text > a').text() || null, //歌曲名
                            songSinger: $(element).find('.song-singer > a').text() || null, //歌手名
                        }
                        
                        console.log(`正在抓取:${JSON.stringify(temp)}`);
                        //var data = await self.__getPlayUrl(temp.musicId);
                        //console.log(`已抓取详情:${JSON.stringify(data)}`);
                        musicIds.push(temp);
                    });
                    resolve(musicIds);
                }else{
                    console.log(`节点异常`,url,result);
                }
            })
        });
    }
}

module.exports = new Migu();