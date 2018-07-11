/**
 * Created by Simple 2018年5月2日 11:47:48
 * 该文件用于定义 home 页面逻辑
 */

require([
	'../../../src/jquery.entry.js',
], function ($) {
	let PANDA_PARKING = {
		init:function(){
			//this.activeNav();
		},
		
		activeNav:function(){
			//获取div下面所有的a标签（返回节点对象）
		   	var myNav = $('.nav').find('a');
			   //获取当前窗口的url
		   	var myURL = document.location.href;
			   //循环div下面所有的链接，
		   	for(var i=1;i<myNav.length;i++){
			   //获取每一个a标签的herf属性
		  		var links = $(myNav[i]).attr("href");
		  		var myURL = document.location.href;
			  //查看div下的链接是否包含当前窗口，如果存在，则给其添加样式
		  		if(myURL.indexOf(links) != -1){
		  			var links = $(myNav[i]).addClass("active");
		  			$(myNav[0]).remove("active");
			   	}
		 	}
		}
	};
	PANDA_PARKING.init();
});