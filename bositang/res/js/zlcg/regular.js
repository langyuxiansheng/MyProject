/**
 * Created by wolf Mr.Yu 2017/12/15 23:58.
 * 该文件用于定义该游戏规则页
 */

require([
	'../custom/service.js',
	'../custom/commonMethod.js',
	'../../../src/zepto.entry.js',
	'art-template/lib/template-web',
	'!!script-loader!../base/md5.js',
	"../custom/url.js",
	'../weui/weui.min.js',
], function (service, common, $, template, md5, url,weui) {
	var ZLCG = {
		init:function(){
			this.getInfoData();
		},
		
		getInfoData:function(){
			this.renderTemplate('zlcgConfigJson');
			this.buttonLogic();
		},
			
		/**
		 * 按钮逻辑
		 * */
		buttonLogic:function(){
			$('.zlcg-button-begin').click(function(){
				window.location.href = './info.html#studentType=reading';
			});
		},
			
		/**
		 * 渲染模板
		 * @param zlcgConfigJson {JSON} 配置数据
		 * */
		renderTemplate:function(zlcgConfigJson){
			common.renderTemplate('#template','#viewport',zlcgConfigJson,template);
			$(document).ready(function () { $('body').css({'height':$(window).height()})});
		},
		
	}
	ZLCG.init();
});