/**
 * Created by wolf Mr.Yu 2017/12/15 23:58.
 * 该文件用于定义所有api接口
 * 
 */
define(function () {
	//var domain = 'http://172.18.1.39:8989/';
	var domain = 'http://zlcg.haoal.cn:9006/zlcg/';
	return {

		//登录
		student_login_url: domain + 'answerUser/addUser',
		//交卷
		student_handn_paper_url:domain + 'answerUser/getUser',
		
		//login_url: 'http://172.18.0.50/common/auth/login',
	};
});