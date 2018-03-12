/**
 * Created by wolf Mr.Yu 2017/12/15 23:58.
 * 该文件用于定义该游戏的题目页面逻辑
 */

require([
	'../custom/service.js',
	'../custom/commonMethod.js',
	'../../../src/zepto.entry.js',
	'art-template/lib/template-web',
	"../custom/url.js",
	'swiper/dist/js/swiper',
	'../weui/weui.min.js',
], function (service, common, $, template, url,Swiper,weui) {
	var ZLCG = {
		init:function(){
			this.getSubjectData();
		},
		
		zlcgConfigJson:{
			num:10,//总题量
			endTime:[], //答题时间 （S）
			subjectIndex:['题目一','题目二','题目三','题目四','题目五','题目六','题目七','题目八','题目九','题目十','题目十一'],	//题目
			answerIndex:['A.','B.','C.','D.','E.','F.','G.','H.','I.','J.','K.','L.','M.','N.','O.','P.','Q.','R.']	//答案
			
		},
		
		getSubjectData:function(){
			
			//退出之后直接跳转到登录页
			if(window.sessionStorage && window.sessionStorage.data == 'undefined'){
				return window.location.href = './regular.html';
			}
			
			//读取试卷
			if(window.sessionStorage && window.sessionStorage.data){
				this.zlcgConfigJson.data = JSON.parse(window.sessionStorage.data);
				if(ZLCG.zlcgConfigJson.data && ZLCG.zlcgConfigJson.data.length > 0){
					for(var x in ZLCG.zlcgConfigJson.data){
						ZLCG.zlcgConfigJson.endTime.push(ZLCG.zlcgConfigJson.data[x].endTime);
					}
				}
			}
			
			//过滤题型
			template.defaults.imports.anwserClass = function(anwserClass){
				if(anwserClass == 'C_XZ'){
					return '选择题';
				}else{
					return '填空题';
				}
				
			}
			//设置题数量
			this.zlcgConfigJson.num = this.zlcgConfigJson.data.length;
			//设置答题时间
			
			//渲染试卷
			this.renderTemplate(this.zlcgConfigJson);
			this.initSwiper();
			this.buttonLogic();
		},
		
		/**
		 * 初始化swiper
		 * */
		initSwiper:function(){
			this.zlcgConfigJson.mySwiper = new Swiper('.swiper-container', {
				//direction:'vertical',//direction 
				autoplay:false,	//禁止自动翻页
				noSwiping : true, //禁止滑动
				allowSlidePrev : false,
				watchSlidesProgress : true,
				on:{
					slideChangeTransitionEnd: function(){	//切换销毁上一个dom
						var index = this.activeIndex;
						ZLCG.countdown('.zlcg-countdown',ZLCG.zlcgConfigJson.endTime[index],true);
						$('.zlcg-countdown').html(ZLCG.zlcgConfigJson.endTime[index]+'s');
				    }
				},
			});
			//设置题目内容高度
			var height = document.body.clientHeight;
			$('.zlcg-subject').css({
				'height':height * 0.4,
				'overflow':'auto'
			});
			//初始化倒计时
			this.countdown('.zlcg-countdown',ZLCG.zlcgConfigJson.endTime[0]);
			//切换到下一个
			$('.next-btn').click(function(e){
				e.preventDefault();
				var $this = $(this);
				var anwserType = $this.data('anwser');
				if(anwserType == 'C_XZ'){
					var ans = $this.parent().parent().find('input[name="answer"]:checked').val();
					if(window.sessionStorage && window.sessionStorage.paper){
						if(ans == 1 || ans == '1'){
							window.sessionStorage.paper =  Number(window.sessionStorage.paper) + Number(ans);
						}
					}else if(ans == 1 || ans == '1'){
						window.sessionStorage.paper = ans;
					}
				}else if(anwserType == 'C_TK'){
					var tkBody = $this.data('tk-body'); //填空题正确答案
					var studentBody = $this.parent().parent().find('.answer-fill-text').val();	//学生答案
					if(tkBody == studentBody){
						if(window.sessionStorage && window.sessionStorage.paper){
							window.sessionStorage.paper =  Number(window.sessionStorage.paper) + 1;
						}else{
							window.sessionStorage.paper = 1;
						}
					}
				}

				window.sessionStorage.subjectNum = Number(window.sessionStorage.subjectNum) + 1;
				var subjectNum =  Number(window.sessionStorage.subjectNum);
				if(subjectNum > ZLCG.zlcgConfigJson.num){
					$('.zlcg-countdown').html('00s');
					ZLCG.handInYourPaper();//交卷
					return false;
				}
				ZLCG.zlcgConfigJson.mySwiper.slideNext();
			});
		},
		
		/**
		 * 倒计时
		 * @param dom {String} dom对象
		 * @param endTime {Number} 计时时间
		 * @param clear {Boolean} 是否清空计时
		 * */
		countdown:function(dom,endTime,clear){
			//设置初始值
			if(endTime){
				window.sessionStorage.timer = endTime;
			}
			
			if(window.sessionStorage && !window.sessionStorage.timestamp){
				var timestamp = Date.parse(new Date());
				window.sessionStorage.timestamp = timestamp;
				if(endTime){
					window.sessionStorage.timer = endTime;
				}
				window.sessionStorage.subjectNum = 1;
			}                    
			
			//读取本地存储的变量
			if(window.sessionStorage && window.sessionStorage.timer && window.sessionStorage.timer != 0){
				var timer = window.sessionStorage.timer;
				var interval = setInterval(function(){
					var timestamp =  window.sessionStorage.timestamp; //重新获取当前时间戳
					var time =  (Date.parse(new Date()) - timestamp) / 1000; //重新计算
					var THISTIME = (timer - time);

					if(THISTIME < 0){
						var btnIndex = window.sessionStorage.subjectNum - 1;
						$('.next-btn-'+ btnIndex).trigger('click');
					}
					//显示倒计时
					if(THISTIME < 10){
						$(dom).html('0'+THISTIME+ 's');
					}else{
						$(dom).html(THISTIME+ 's');
					}
					var subjectNum =  Number(window.sessionStorage.subjectNum);
					if(subjectNum > ZLCG.zlcgConfigJson.num){
						$('.zlcg-countdown').html('00s');
						return clearInterval(interval);
					}
				},1000);
			}
			//重新计时
			if(clear){
				clearInterval(interval);
				window.sessionStorage.timestamp = Date.parse(new Date());
			}
		},
		
		/**
		 * 获取总分
		 * */
		totalSubjectNum:function(){
			if(window.sessionStorage && window.sessionStorage.paper){
				return Number(window.sessionStorage.paper);
			}
			return 0;
		},
		
		/**
		 * 按钮逻辑
		 * */
		buttonLogic:function(){
			$('.reading-students').click(function(){
				var type = $(this).data('type');
				if(type == 'reading'){
					window.location.href = './student-login.html#studentType=reading';
				}else{
					window.location.href = './student-login.html#studentType=noReading';
				}
			});
		},
			
		/**
		 * 渲染模板
		 * @param zlcgConfigJson {JSON} 配置数据
		 * */
		renderTemplate:function(zlcgConfigJson){
			common.renderTemplate('#template','#viewport',zlcgConfigJson,template);
			$(document).ready(function () { 
				$('#viewport').css({'height':$(window).height()});
				$(document).serialize(function(){
					$('.swiper-container').css({'height':$(window).height()});
				});
			});
		},
		
		/**
		 * 交卷
		 * */
		handInYourPaper:function(){
			var loading = common.loading('正在交卷');
			var sendData = {};
				if(window.sessionStorage && window.sessionStorage.user){
					var user = JSON.parse(window.sessionStorage.user);
					sendData.name = user.name;
					sendData.phone = user.phone;
					sendData.answerFs = ZLCG.totalSubjectNum();	//正确题数
				}

			service.handInYourPaper(sendData).then(function(result){
				var res = JSON.parse(result);
				if(res && res.code == 200){
					//存入结果页数据
					window.sessionStorage.resultData = JSON.stringify(res.data);
					loading.hide();
					common.toast('交卷成功');
					setTimeout(function(){
						window.location.href = './result.html';
					},1000);
				}else{
					weui.topTips(res.message);
				}
			});
		},
	}
	ZLCG.init();
});