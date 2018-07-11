/**
 * Created by Simple 2018年5月2日 11:19:49
 * 该模块用于定义公共的方法: get, post, delete
 */
define(['../../../src/jquery.entry.js'], function ($) {
	return {
		postAjaxAuthorization: function (url, data, jwtToken,platfrom) {
			var header = {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				"user":"student"
			};
			if (jwtToken) {
				header.Authorization = jwtToken;
			}
			
			if(platfrom){
				header.platfrom = platfrom;
			}
			var mypromise = new Promise(function (resolve, reject) {
				$.ajax({
					"type": "POST",
					"url": url,
					"headers": header,
					"dataType": 'JSONP',
					"data": JSON.stringify(data),
					success: function (result) {
						resolve(result);
					},
					error: function (xhr, type) {
						reject(xhr);
					}
				})
			});
			return mypromise;
		},
		
		getAjaxAuthorization: function (url,jwtToken,platfrom) {
			var header = {
				"platfrom": 'P_WECHAT',
				"Content-Type": " application/json",
				"Access-Control-Allow-Origin": "*"
			};
			if (jwtToken) {
				header.Authorization = jwtToken;
			}
			if(platfrom){
				header.platfrom = platfrom;
			}
			var mypromise = new Promise(function (resolve, reject) {
				$.ajax({
					"type": "GET",
					"url": url,
					"dataType": "JSONP",
					"headers": header,
					"success": function (result) {
						resolve(result);
					},
					"error": function (xhr, type) {
						reject(xhr);
					}
				});
			});
			return mypromise;
		},
	}
});
