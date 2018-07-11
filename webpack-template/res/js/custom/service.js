/**
 * Created by Simple 2018年5月2日 11:19:27
 * 该方法为所有模块的ajax请求模块
 */
define(['./http_service', './url', './commonMethod'], function (http, url, common) {
	return {
		language:function(){
			if(common.toggleLanguage().lang != null && common.toggleLanguage().lang != undefined){
				return common.toggleLanguage().lang ==	"zh-cn" ? 	"zh_CN" : "en_US";
			}
		},
		
		/**
		 * 登录
		 * @param data
		 * @returns {*}
		 */
		studentLogin: function (data) {			
			return http.postAjaxAuthorization(url.student_login_url, data,null);
			//return http.postAjaxAuthorization(url.login_url, data,null);
		},
		
		/**
		 * 交卷
		 * @param data {JSON}
		 * @returns {*}
		 * */
		handInYourPaper:function(data){
			return http.postAjaxAuthorization(url.student_handn_paper_url, data,null); 
		},
		
		getStoreDetail: function (token) {
			return http.getAjaxAuthorization(null, null, token);
		},
	};
});