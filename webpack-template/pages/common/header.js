/**
 * Created by wolf Mr.Yu 2017/12/15 23:58.
 * 该文件用于定义公共页头
 */

require([
	'../../src/jquery.entry.js',
], function ($) {
	var PANDA_PARKING = {
		init:function(){
			this.template();
		},
		
		zlcgConfigJson:{

			
		},
		
		template:function(){
			let header = `<div class="rh-header hidden-sm hidden-xs">
							<div class="container">
								<div class="row">
									<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<a href="home.html" class="rh-icon rh-icon-logo"></a>
										<ul class="nav">
											<li><a href="./home.html">硬件产品</a></li>
											<li><a href="./solution.html">解决方案</a></li>
											<li><a href="./business.html">商务合作</a></li>
											<li><a href="./cases.html">案例</a></li>
											<li><a href="./about.html">关于我们</a></li>
										</ul>
										<a href="./download.html" class="download-app pull-right">
											<span class="rh-icon rh-icon-download-app"></span>
											下载APP
										</a>
									</div>
								</div>
							</div>
						</div>
						
						<div class="rh-header-m hidden-lg hidden-md">
							<div class="container">
								<div class="row">
									<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
										<a href="home.html" class="rh-icon rh-icon-logo"></a>
									</div>
									<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right">
										<span class="glyphicon glyphicon-align-justify nav-menus" aria-hidden="true"></span>
									</div>
								</div>
								<div class="row">
									<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<ul class="nav">
											<li><a href="./home.html">硬件产品</a></li>
											<li><a href="./solution.html">解决方案</a></li>
											<li><a href="./business.html">商务合作</a></li>
											<li><a href="./cases.html">案例</a></li>
											<li><a href="./about.html">关于我们</a></li>
											<li><a href="./download.html">下载APP</a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>`;
						
			$('.header-viewport').html(header);
			
			//下载页面导航栏
			let URL = document.location.href;
		   	if(URL.indexOf('download') != -1){
		   		let $logo = $('.rh-icon-logo');
		   		if(!$logo.hasClass('rh-icon-logo-download')){
		   			$logo.addClass('rh-icon-logo-download');
		   			$('.rh-icon-download-app').addClass('rh-icon-download-app-c');
		   		};
		   	}
		   	
		   	//移动端页面导航栏控制
		   	$('.nav-menus').click(function(){
		   		$('.rh-header-m .nav').slideToggle();
		   	});
		}
	};
	PANDA_PARKING.init();
});