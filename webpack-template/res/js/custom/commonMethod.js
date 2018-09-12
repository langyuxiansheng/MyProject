/**
 * Created by Simple on 2018年5月2日 11:25:19
 * 定义公共方法: 如格式化日期,数组的操作等
 */
define([
	'moment',
], function (moment, langEn, langZh) {
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

		/**
		 * 清除cookie
		 * @param name
		 */
		clearCookie: function (name) {
			this.setCookie(name, "", -1);
		},

		/**
		 * 写入cookie
		 * @param cname
		 * @param cvalue
		 * @param exdays
		 */
		setCookie: function (cname, cvalue, exdays) {
			var d = new Date();
			d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
			var expires = "expires=" + d.toUTCString();
			document.cookie = cname + "=" + cvalue + "; " + expires;
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