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

		template:function(){
			let header = `<div class="rh-footer">
							<div class="container">
								<div class="row">
									<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
										<p class="copy-right">Copyright 2017 - 2018 pandaparking.cn  All Rights Reserved，蜀ICP</p>
									</div>
									<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
										<p class="text-right icon-container">
											<span class="rh-icon rh-icon-footer-wechat">
												<img class="img-responsive wechat-img-qr" src="../../res/images/qr-wechat.png" width="80" alt="qr-wechat">
											</span>
											<span class="rh-icon rh-icon-footer-ios">
												<img class="img-responsive ios-img-qr" width="80" src="../../res/images/qr-ios.png" alt="qr-ios" />
											</span>
											<span class="rh-icon rh-icon-footer-android">
												<img class="img-responsive android-img-qr" width="80" src="../../res/images/qr-ios.png" alt="qr-ios" />
											</span>
										</p>
									</div>
								</div>
							</div>
						</div>`;
			$('.footer-viewport').html(header);
		}
	};
	PANDA_PARKING.init();
});