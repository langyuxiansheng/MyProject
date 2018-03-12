/**
 * Created by wolf Mr.Yu 2017/12/15 23:58.
 * 
 * 该文件用于定义所有与登陆注册相关的页面逻辑操作
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
			type:common.getRegExp('studentType')
		},
		
		getInfoData:function(){
			var zlcgConfigJson = this.zlcgConfigJson;
			this.renderTemplate(zlcgConfigJson);
			this.buttonLogic(zlcgConfigJson);
		},
			
		/**
		 * 按钮逻辑
		 * */
		buttonLogic:function(zlcgConfigJson){
			$('#login-submit').click(function(){
				var name = $('#name').val(),//姓名
					readingSchool = $('#reading-school').val(),//在读学校
					grade = $('#grade').val(),//年级
					readingClass = $('#reading-class').val(),//在读班级
					teacher = $('#teacher').val(),//班主任
					telphone = $('#telphone').val(),//联系电话
					invitationCode = $('#invitation-code').val();//邀请码
				var telReg = /^1[34578]\d{9}$/;
				if(name == ' ' || !name){
					return common.topTips('请输入姓名');
				}else if(!telReg.test(telphone)){
					return common.topTips('联系电话');
				}
				
				var sendData = {};
					sendData.name = name;
					sendData.phone = telphone;
					sendData.grade = grade;
					sendData.source = 'HTML5';
				if(zlcgConfigJson.type && zlcgConfigJson.type == 'reading'){
					sendData.stuclass = readingClass;
					sendData.teacher = teacher;
					sendData.isNew = '0';
				}else{
					sendData.school = readingSchool;
					sendData.brYqCode = invitationCode;
					sendData.isNew = '1';
				}
				
				ZLCG.studentLogin(sendData);
			});
		},
			
		/**
		 * 登录逻辑
		 * @param sendData {JSON} 请求数据
		 * */
		studentLogin:function(sendData){
			window.sessionStorage.clear();
			var loading = common.loading('正在获取题目');
			window.sessionStorage.user = JSON.stringify(sendData);
			service.studentLogin(sendData).then(function(result){
				var res = JSON.parse(result);
				if(res && res.code == 200){
					loading.hide();
					window.sessionStorage.data = JSON.stringify(res.data);
					window.location.href = './subject.html';
				}else{
					loading.hide();
					weui.topTips(res.message);
				}
			});
		},
			
		/**
		 * 渲染模板
		 * @param zlcgConfigJson {JSON} 配置数据
		 * */
		renderTemplate:function(zlcgConfigJson){
			common.renderTemplate('#template','#viewport',zlcgConfigJson,template);
			$(document).ready(function () { $('#viewport').css({'height':$(window).height()})});
		},
		
	}
	ZLCG.init();
});