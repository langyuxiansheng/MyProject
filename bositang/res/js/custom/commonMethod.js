/**
 * Created by Xia Ying on 2017/8/16/016.
 * 定义公共方法: 如格式化日期,数组的操作等
 */
define([
	'moment',
	'../weui/weui.min.js',
], function (moment, weui, langEn, langZh) {
	return {
		/**
		 * 正则获取页面传参
		 * @param name
		 * @returns {string}
		 */
		getRegExp: function (name) {
			var myReg = new RegExp('[?|#]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""];
			return myReg[1].replace(/\+/g, '%20') || null;
		},

		/**
		 * 渲染模板公共方法
		 * @param source
		 * @param target
		 * @param data
		 */
		renderTemplate: function (source, target, data, templateEngine) {
			var tpl = document.querySelector(source).innerHTML;
			var render = templateEngine.compile(tpl);
			var html = render(data);
			document.querySelector(target).innerHTML = html;
		},

		/**
		 * 获取cookie中对应的name
		 */
		getCookie: function (name) {
			var strCookie = document.cookie;
			var arrCookie = strCookie.split("; ");
			var cookieName = "";

			for (var i = 0; i < arrCookie.length; i++) {
				var arr = arrCookie[i].split("=");
				//找到名称为name的cookie，并返回它的值
				if (name == arr[0] && arr[1]) {
					cookieName = arr[1];
					break;
				}
			}
			return cookieName;
		},

		//清除cookie
		clearCookie: function (name) {
			this.setCookie(name, "", -1);
		},
		setCookie: function (cname, cvalue, exdays) {
			var d = new Date();
			d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
			var expires = "expires=" + d.toUTCString();
			document.cookie = cname + "=" + cvalue + "; " + expires;
		},

		/**
		 * weui弹出提示框
		 */
		toast: function (content) {
			weui.toast(content, 1500);
		},
		
		/**
		 * weui警告提示框
		 * */
		topTips:function(content){
			weui.topTips(content,1500);
		},

		/**
		 * weui 弹出框提示,网络超时允许时间10 秒
		 */
		loading: function (content) {
			var loading = weui.loading(content, {
				className: 'custom-classname'
			});
			setTimeout(function () {
				loading.hide();
				weui.topTips('网络超时');
			}, 10000);
			return loading;
		},

        /**
         * 获取当前文件名
         * PS：用于判断来自哪个页面
         */
        getFileName: function (){
            let filename = location.href;
            return filename.substr(filename.lastIndexOf('/') + 1,filename.lastIndexOf('.') - filename.lastIndexOf('/') + 1);
        },
	};
});