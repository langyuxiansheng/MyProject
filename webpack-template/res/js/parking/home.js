/**
 * Created by Simple 2018年5月2日 11:47:48
 * 该文件用于定义 home 页面逻辑
 */

require([
	'../custom/service.js',
	'../custom/commonMethod.js',
	'../../../src/jquery.entry.js',
	'art-template/lib/template-web',
	"../custom/url.js",
	'swiper/dist/js/swiper',
], function (service, common, $, template, url,Swiper) {
	let PANDA_PARKING = {
		init:function(){
			this.initSwiper();
		},

		initSwiper(){
			let mySwiper = new Swiper('.swiper-container', {
				autoplay: true,//可选选项，自动滑动
				effect : 'fade',
			});
			return mySwiper;
		}

	};
	PANDA_PARKING.init();
});