/**
 * Created by wolf Mr.Yu 2017/12/15 23:58.
 * 该文件用于定义该游戏登录选择
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
		
		zlcgConfigJson:{
			
		},
		
		getInfoData:function(){
			var zlcgConfigJson = this.zlcgConfigJson;
			window.sessionStorage.data = undefined;
			if(window.sessionStorage && window.sessionStorage.resultData){
				zlcgConfigJson.data = JSON.parse(window.sessionStorage.resultData);
				if(zlcgConfigJson.data.answerFs){
					common.toast('您答对:'+zlcgConfigJson.data.answerFs+"道题");
					if(zlcgConfigJson.data.answerFs >= 6){
						setTimeout(function(){
							weui.dialog({
							    title: '恭喜您闯关成功',
							    content: '获奖页面截屏保存，<br/>兑奖码请妥善保管！',
							    className: 'custom-classname',
							    buttons: [{
							        label: '我知道了',
							        type: 'primary',
							    }]
							});
						},1000);
					}
				}
			}
			this.renderTemplate(zlcgConfigJson);
			this.buttonLogic();
		},
			
		/**
		 * 按钮逻辑
		 * */
		buttonLogic:function(){
			$('.reading-students').click(function(){
				var type = $(this).data('type');
				if(type == 'reading'){
					window.location.href = './student-login.html#studentType=reading';
				}else{
					window.location.href = './student-login.html#studentType=noReading';
				}
			});
		},
			
		/**
		 * 渲染模板
		 * @param zlcgConfigJson {JSON} 配置数据
		 * */
		renderTemplate:function(zlcgConfigJson){
			//过滤题型
			template.defaults.imports.jpTitle = function(num){
				switch(num){
					case 10:
						return '智慧之星';
					case 9:
						return '百科达人';
					case 8:
						return '学科达人';
					case 7:
					case 6:
						return '科创达人';
					default:
						return '';
				}
			}
			common.renderTemplate('#template','#viewport-result',zlcgConfigJson,template);
		},
		
	}
	ZLCG.init();
});