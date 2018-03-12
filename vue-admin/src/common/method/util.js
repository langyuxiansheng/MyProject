/**
 * 工具类
 */

import Chinese from '../../../static/js/i18n/zh-cn.js'
import English from '../../../static/js/i18n/en-us.js'
import constant from '../base/constant'
import moment from 'moment'

//import moment from 'moment'

export default  {

	/**
	 * 设置cookie
	 * @param cname
	 * @param cvalue
	 * @param expires
	 */
	setCookie(cname, cvalue, expires) {
		var exp = new Date();
		exp.setTime(exp.getTime() + 12 * 60 * 60 * 1000);
		document.cookie = cname + "=" + cvalue + ";expires=" + exp.toGMTString();
	},

	/**
	 * 清除cookie
	 * @param name
	 */
	clearCookie: function (name) {
		this.setCookie(name, "", -1);
	},

	/**
	 * 获取系统当前的语言
	 * @returns {*}
	 */
	getCurrentLanguage() {
		let language = localStorage.getItem('language');
		if (language == 'en') {
			language = 'en_US';
		} else {
			language = 'zh_CN';
		}

		return language ? language : navigator.language
	},

	/**
	 * 切换英文语言包
	 */
	toggleLanguage: function () {
		//获取浏览器的语言
		var language = (navigator.language || navigator.browserLanguage).toLowerCase();
		if (window.localStorage) {
			if (localStorage.languages != null && localStorage.languages != undefined) {
				language = JSON.parse(localStorage.languages).value;
			}
		} else {
			this.toggoleLang('Error!');
		}

		if (language == 'zh-cn') {
			return Chinese;
		} else {
			return English;
		}
	},

	/**
	 * 获取cookie
	 * @param cname
	 * @returns {*}
	 */
	getCookie(cname) {
		let cookieArr = document.cookie.split('; ')
		for (let i = 0; i < cookieArr.length; i++) {
			let arr = cookieArr[i].split('=')

			if (arr[0] === cname) {
				return arr[1]
			}
		}
	},

	/**
	 * 判断 中国 移动电话号码的 正则表达式
	 * @param phone
	 * @returns {*}
	 */
	judgePhone(phone) {
		let pattern = new RegExp(/^((1[3,5,8][0-9])|(14[5,7])|(16[6])|(17[0,6,7,8])|(19[7,8,9]))\d{8}$/)
		let flag = pattern.test(phone)

		if (flag === false) {
			return '+64'
		} else {
			return '+86'
		}
	},

	//转换时间戳
	formatDateYearMonthDay(timestamp) {
		if (timestamp) {
			return moment(timestamp * 1000).format(constant.YYYYMMDD);
		}

	},

	//转换时间戳 时分秒
	formatDateHourMinSec(timestamp) {
		if (timestamp) {
			return moment(timestamp * 1000).format(constant.HHMMII);
		}

	},

	//转换时间戳 年月日时分秒
	formatDateYearMonthDayAndHms(timestamp) {
		if (timestamp) {
			return moment(timestamp * 1000).format(constant.YYYYMMDDHHMMII);
		}

	},

	/**
	 * 获取今天0点时间戳 秒
	 * */
	getTodayTimeStamp(){
		return new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
	},

	/**
	 * 将秒转换为 天-时-分-秒
	 * @param msd {Number} 秒数
	 * */
	secondToDate(msd) {
		let time = msd;
		if (time != null && '' != time) {
			if (time > 60 && time < 60 * 60) {
				time =  parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) -
						parseInt(time / 60.0)) * 60) + "秒";
			}
			else if (time >= 60 * 60 && time < 60 * 60 * 24) {
				time =  parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
						parseInt(time / 3600.0)) * 60) + "分钟" +
						parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
						parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
			} else if (time >= 60 * 60 * 24) {
				time =  parseInt(time / 3600.0 / 24) + "天" + parseInt((parseFloat(time / 3600.0 / 24) -
						parseInt(time / 3600.0 / 24)) * 24) + "小时" + parseInt((parseFloat(time / 3600.0) -
						parseInt(time / 3600.0)) * 60) + "分钟" +
						parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
						parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
			}
			else {
				time = parseInt(time) + "秒";
			}
		}
		return time;
	},

	//保留两位小数不四舍五入
	tofixPrice(value) {
		if (value === 0) {
			return '0.00'
		}
		if (value) {
			var showTwo = value.toFixed(3);
			return showTwo.substring(0, showTwo.lastIndexOf('.') + 3)
		}
	},
}
