部分接口如下:

[播放详情]
localhost:3000/music/playMusic/musicId	
如:
localhost:3000/music/playMusic/10052 


[开始爬取,直接调用无参数,返回爬取完成的歌曲列表]
localhost:3000/migu/beginMusics


[批量往数据库里添加音乐 post方式]
localhost:3000/song/addMusics

如:
{
	
   "musics":[
	{
"musicId":"11110532314",
"musicName":"眼泪的提醒",
"songSinger":"庄心妍",
"songCover": "http://cdn.music.migu.cn/picture/2018/0913/1421/AM…"}
    ]

}



启动方式:

 cd migu-superagent
 
 npm install 

 npm start

首次启动的时候需要在mysql-db.js里配置数据,且先建立数据库,导入 music.sql

文件説明：
	

superagent/migu-superagent.js 爬虫文件

mysql-db.js	数据库连接池工具

migu.js //爬虫路由

music.js //音乐文件路由