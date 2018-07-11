/**
 * Created by wolf Mr.Yu 2017/12/15 23:58.
 * 该文件属于基础框架用法Demo
 */

require([
	'../custom/service.js',
	'../custom/commonMethod.js',
	'../../../src/jquery.entry.js',
	'art-template/lib/template-web',
	'!!script-loader!../base/md5.js',
	"../custom/url.js",
], function (service, common, $, template, md5, url) {
	var DEMO = {
		init:function(){
			this.getInfoData();
		},
		
		getInfoData:function(){
			this.renderTemplate('demoConfigJson');
			this.buttonLogic();
		},

		/**
		 * 渲染模板
		 * @param demoConfigJson {JSON} 配置数据
		 * */
		renderTemplate:function(demoConfigJson){
			common.renderTemplate('#template','#viewport',demoConfigJson,template);
		},
	};

	DEMO.init();
});