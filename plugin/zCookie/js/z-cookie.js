/**
 * Created by Wolf Mr.Yu on 2017/11/26/ 18:30.
 * 
 * 请先引入jQuery库，否则插件无法运行
 * 
 * 该文件用于快速操作cookie
 * 
 * 调用说明  $.method()
 *		例：$.setCookie('userId','74110',30);
 *
 * */
try{
	(function($,window){
		$.extend({
			/**
			 * 写入cookie
			 * @param cookieName{String} cookie名
			 * @param value {String} 值
			 * @param time {Number} 有效时间（天）
			 * @return Boolean	
			 * PS: true 成功 false 失败
			 * */
			setCookie:function(cookieName,value,time){
				if(cookieName != undefined && value != undefined){
					var days = time == undefined ? 30 : time;
					var expires = new Date();
					expires.setTime(expires.getTime() + days*24*60*60*1000);
					document.cookie = cookieName + "="+ escape (value) + ";expires=" + expires.toGMTString();
					return true;
				}
				return false;
			},
			
			/**
			 * 获取cookie
			 * @param cookieName{String} cookie名
			 * @return String
			 * */
			getCookie:function(cookieName){
				var arr = new Array();
				var reg = new RegExp("(^| )" + cookieName + "=([^;]*)(;|$)");
				if( arr = document.cookie.match(reg)){
					return unescape(arr[2]);
				}
				return null;
			},
			
			/**
			 * 清除指定cookie
			 * @param cookieName{String} cookie名
			 * @return Boolean	
			 * PS: true 成功 false 失败
			 * */
			clearCookie:function(cookieName){
				var expires = new Date();
					expires.setTime(expires.getTime() - 1);
				if(cookieName != null){
					document.cookie = cookieName + "='';expires=" + expires.toGMTString();
					return true;	
				}
				return false;	
			},
			
			/**
			 * 清除所有cookie
			 * @return Boolean
			 * PS: true 成功 false 失败
			 * */
			clearAllCookie:function(){
				try{
					var allCookie = document.cookie;
		            var arrCookie = allCookie.split("; ");
		           	for(var i = 0; i < arrCookie.length; i++){
		                var arr = arrCookie[i].split("=");
		                if(arr[0]){
		                	this.clearCookie(arr[0]);
		                }
		            }
		           	return true;
				}catch(e){
					alert(e);
					return false;
				}
			}
		});
	})(jQuery,this)
}catch(e){
	alert(e+'\n请引入jQuery');
}


