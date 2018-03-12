$(function(){
	var christmas = {
	  		init:function(){
	  			this.mySwiper();
	  			setTimeout(function(){
	  				christmas.pages1();
	  			},2000);
	  		},
	  		
	  		/**
	  		 * 初始化滚动插件
	  		 * */
	  		mySwiper:function(){
	  			var mySwiper = new Swiper ('.swiper-container', {
				    direction: 'vertical',
				    // 如果需要分页器
				    pagination: {
				      el: '.swiper-pagination',
				    },
				    on:{
				    	slideChangeTransitionEnd: function(){
				    		christmas.slideIndex(this.activeIndex);
					    },
				    }
			  	});
	  		},
			
			/**
			 * 指定初始化的容器
			 * */
			slideIndex:function(index){
				switch(index){
					case 0:
						christmas.pages1(index);break;	
					case 1:
						christmas.pages2(index);break;	
					case 2:
						christmas.pages3(index);break;	
					case 3:
						christmas.pages4(index);break;	
					case 4:
						christmas.pages5(index);break;	
					case 5:
						christmas.pages6(index);break;	
					default:
						return false;
				}
			},
			
			/**
			 * 截取字符串
			 * @param domGetText {String} 获取文字dom对象
			 * @param domSetContent {String} 设置内容的dom对象
			 * @param times {Number} 打印速度 ms
			 * @param clear {Boolean} 是否重置
			 * */
	  		substring:function(domGetText,domSetContent,times,clear){
	  			var textContent = $(domGetText).text(),
	  				leng = textContent.length,
	  			 	subIndex = 0,
	  			 	$domSetContent = $(domSetContent);
	  			var timer = setInterval(function(){
	  				if(subIndex == leng){
	  					subIndex = 0;
	  				}
	  				$domSetContent.text(textContent.substring(0,subIndex));
	  				subIndex++;
	  			},times);
  				if(clear){
	  				clearInterval(timer);
	  			}
	  		},
	  		
	  		/**
	  		 * 第1页
	  		 * @param index {Number} 页面索引
	  		 * */
	  		pages1:function(index){
	  			if(index == 0){
	  				this.substring('.container-pages1-text-content','.container-pages1-text',120,true);
	  			}else{
	  				this.substring('.container-pages1-text-content','.container-pages1-text',120);
	  			}

	  		},
	  		
	  		/**
	  		 * 第2页
	  		 * */
	  		pages2:function(index){
	  			if(index == 1){
	  				var pages2FooterLeft =  $('.swiper-container .christmas-container-2 .saint-nicholas-pages2-1');
	  				var pages2FooterRight =  $('.swiper-container .christmas-container-2 .saint-nicholas-pages2-2');
	  				var content = $('.christmas-container-2 .christmas-container-content');
	  				if(!pages2FooterLeft.hasClass('saint-nicholas-pages2-1-ani') && !pages2FooterRight.hasClass('saint-nicholas-pages2-2-ani')){
	  					pages2FooterLeft.addClass('saint-nicholas-pages2-1-ani');
	  					pages2FooterRight.addClass('saint-nicholas-pages2-2-ani');
	  				}
	  				if(!content.hasClass('christmas-content-2-ani')){
	  					content.addClass('christmas-content-2-ani');
	  				}
	  			}
	  		},
	  		
	  		/**
	  		 * 第3页
	  		 * */
	  		pages3:function(index){
	  			if(index == 2){
	  				var content = $('.christmas-container-3 .christmas-container-content');
	  				if(!content.hasClass('christmas-content-3-ani')){
	  					content.addClass('christmas-content-3-ani');
	  				}
	  			}
	  		},
	  		
	  		/**
	  		 * 第4页
	  		 * */
	  		pages4:function(index){
	  			if(index == 3){
	  				var content = $('.christmas-container-4 .christmas-container-content');
	  				if(!content.hasClass('christmas-content-4-ani')){
	  					content.addClass('christmas-content-4-ani');
	  				}
	  			}
	  		},
	  		
	  		/**
	  		 * 第5页
	  		 * */
	  		pages5:function(index){
	  			if(index == 4){
	  				var content = $('.christmas-container-5 .christmas-container-content');
	  				if(!content.hasClass('christmas-content-5-ani')){
	  					content.addClass('christmas-content-5-ani');
	  				}
	  				var $christmasWe =  $('.christmas-we-5');
	  				if(!$christmasWe.hasClass('christmas-we-5-ani')){
	  					$christmasWe.addClass('christmas-we-5-ani');
	  				}
	  			}
	  		},
	  		
	  		/**
	  		 * 第6页
	  		 * */
	  		pages6:function(index){
	  			if(index == 5){
	  				var $christmasWe =  $('.christmas-container-6 .christmas-merry-6');
	  				if(!$christmasWe.hasClass('christmas-merry-6-ani')){
	  					$christmasWe.addClass('christmas-merry-6-ani');
	  				}
	  			}
	  		}
	  	}
	christmas.init();	 
});
