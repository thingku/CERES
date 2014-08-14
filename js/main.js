(function($) {

	var holdAnchor = "";

	var holdliHeight = $(".navLinksContainer li").height();

	var cookieVal = $.cookie('menuHide');

	var windowWidth = $(window).width();

	$.fn.navigationMenu = function() {

		var isiPad = navigator.userAgent.toLowerCase().indexOf("ipad");

		if(isiPad > -1){

			console.log('ipad');

  		}else{

  			console.log('web');

  		}

  		$(window).resize(function(){

  			windowWidth = $(window).width();

  			cookieVal = $.cookie('menuHide');
  			
			if(cookieVal == "true" || windowWidth <= "1150"){

  				$('body').removeClass().addClass('activeSideBar');
  			
	  		}else if(cookieVal == "false"){

	  			$('body').removeClass().addClass('normalState');
	  		
	  		}

  		});

		$('.navLinksContainer>li>a').click(function(){

			if(!$(this).hasClass('active2')){

				$('.navLinksContainer li').removeClass('active');

				$('.navLinksContainer li').removeClass('active2');

				$(this).parent().addClass('active');

				if($(this).next().length == 1){

					if($('.navBack').length == 0){

						$(this).addClass('hasChildren');					

					}

					$(this).parent().addClass('active2');

					if($('.navBack').length == 0){

						holdAnchor = $( ".active2>span>img" ).attr("src");

						$( ".active2>span>img" ).remove();

						$( ".active2>span" ).append(" <img src='images/back-ico.png' class='backIco navBack'>");

					}

					var padTop =  $(this).parent().css('padding-top').replace(/[^-\d\.]/g, '') * 2;

					var x = $('.active').index();

					var height = holdliHeight + padTop;

					heightAdjust = (height * x);
						
					$('.navLinksContainer li').each(function(){

						if(!$(this).hasClass('active')){

							if(!$(this).parent().hasClass('children')){

								$('.active2>a').css({"marginLeft":"0px"});

								$(this).animate({

									'marginLeft': '-190px'

								},200,"linear",function(){	

									var childHeight = $('.active .children').height() + 19;

									$('.active .children').css({

										"position":"absolute",

										"top": '47px'

									});

									$('.active').animate({

										'marginTop':'-'+heightAdjust+'px',

										'height': childHeight+"px"

									},200,"linear",function(){

										$('.active .children').fadeIn(300,"linear");
																	
									});

								});

							}

						}

					});

				}

			}
			
		});

		$(document).on("click", ".navBack",function() {

			$(this).remove();

			$('.active  .children li').removeClass('activeSub');
			
			$('.active .children').fadeOut(300,"linear",function(){

				$('.active .children').css({"position":"initial"});

				$('.navBack').attr('src', holdAnchor);

				$('.navBack').attr('class', "");

				$('.hasChildren').removeClass('hasChildren');

				$('.active2>a').css({"marginLeft":"0px"});

				$('.active2').animate({

					'height': holdliHeight+"px",

					'marginTop':'0px'

				},300,"linear",function(){

					$('.navLinksContainer li').each(function(){

						if(!$(this).hasClass('active')){

							if(!$(this).parent().hasClass('children')){

								$(this).show();

								$(this).animate({

									'marginLeft': '0px'

								},300,"linear",function(){

									$('.navLinksContainer li').removeClass('active');

								});

							}

						}

					});

				});	

			});

		});

		$('.children>li').click(function(){

			$('.children>li').removeClass('activeSub');

			$(this).addClass('activeSub');

		});

	}	

	$.fn.sideBar = function() {

		$('body').addClass('normalState');

		$('#leftToggle').click(function(e) {

			//e.stopPropagation();

			if ( $('body').hasClass('normalState') ) {

				$.cookie('menuHide',"true");

				$('.rightContainer').removeClass().addClass('rightContainer');

				if($('.notificationBarContainer').hasClass('activeNotificationBar')){

					$('body').removeClass('normalState').addClass('hideSideBar').addClass('hideSideBarWithNotifBar');

					setTimeout( function() {

						$('body').removeClass().addClass('activeSideBar activeSideBarWithNotifBar');

					},500);

				}else{

					$('body').removeClass('normalState').addClass('hideSideBar');

					setTimeout( function() {

						$('body').removeClass('hideSideBar').addClass('activeSideBar');

					},500 );

				}
				
			} else if ( $('body').hasClass('activeSideBar') ) {

				$.cookie('menuHide',"false");

				if($('.notificationBarContainer').hasClass('activeNotificationBar')){

					$('body').removeClass('activeSideBar').addClass('hideSideBar2').addClass('adjustWidthNotifActiveSidebarHide');

					setTimeout( function() {

						$('body').removeClass();

						$('body').addClass('normalState');


						$('.rightContainer').removeClass().addClass('rightContainer adjustWidthNotifNormalState');

					},500 );

				
				}else{

					$('body').removeClass('activeSideBar').addClass('hideSideBar2');

					setTimeout( function() {

						$('body').removeClass('hideSideBar2').addClass('normalState');

					},500 );

				}
				
			}

		});

		$('.leftHolder').click(function() {

			if($('body').hasClass('activeSideBar')){

				if($('.notificationBarContainer').hasClass('activeNotificationBar')){

					$('body').removeClass('activeSideBar').addClass('hideSideBar2').addClass('adjustWidthNotifActiveSidebarHide');

					setTimeout( function() {

						$('body').removeClass();

						$('body').addClass('normalState');

						$('.rightContainer').removeClass().addClass('rightContainer adjustWidthNotifNormalState');

					},500 );

				}else{

					$('body').removeClass('activeSideBar').addClass('hideSideBar2');

					setTimeout( function() {

						$('body').removeClass('hideSideBar2').addClass('normalState');

					},500 );

				}

			}
			
		});

	}

	$.fn.notificationBar = function() {

		$('.notifContainer').click(function(){

			if($('.notificationBarContainer').hasClass('activeNotificationBar')){

				$('.notificationBarContainer').removeClass('activeNotificationBar');

				$('.notificationBarContainer').addClass('hideNotificationBar');

				if ( $('body').hasClass('normalState') ) {

					$('.rightContainer').removeClass('adjustWidthNotifNormalState');

					$('.rightContainer').addClass('adjustWidthNotifNormalStateHide').removeClass('adjustWidthNotifNormalStateHide');
				
				}else{

					$('body').removeClass().addClass('activeSideBar');

					$('.rightContainer').removeClass('adjustWidthNotifActiveSidebar');

					$('.rightContainer').addClass('adjustWidthNotifActiveSidebarHide');

				}

			}else{

				$('.notificationBarContainer').addClass('activeNotificationBar');

				$('.notificationBarContainer').removeClass('hideNotificationBar');

				if ( $('body').hasClass('normalState') ) {

					$('.rightContainer').addClass('adjustWidthNotifNormalState');

					$('.rightContainer').removeClass('adjustWidthNotifNormalStateHide');

				}else{

					$('.rightContainer').addClass('adjustWidthNotifActiveSidebar');

					$('.rightContainer').removeClass('adjustWidthNotifActiveSidebarHide');

				}

			}
			
		});
		
		if(cookieVal == "true" || windowWidth <= "1150"){

  			$('body').removeClass().addClass('activeSideBar');
  			
  		}else if(cookieVal == "false"){

  			$('body').removeClass().addClass('normalState');
  		
  		}
		/*
  		if(windowWidth <= "1024"){

  				$('body').removeClass().addClass('activeSideBar');

		}else{

			$('body').removeClass().addClass('normalState');

		}*/

	}

	$.fn.tabsMenu = function() {

		var tabWidth = $('.tabsHolder>.tabs>li').width();

		var x = 0;

		var multiples = 20;

		var newLeft = 0;

		var tabActiveIndex = $('.tabsHolder>.tabs>li.activeTab').index();	

		var tabsHolderPadding = parseFloat($('.tabsHolder').css('padding-left'));

		var currentLeft = (tabWidth * tabActiveIndex) + tabsHolderPadding;


		$('.indicator').css({

			'left': currentLeft + 'px'

		});

		$('.tabsHolder>.tabs>li').mouseover(function(e){

			e.stopPropagation();

			var tabIndex = $(this).index();

			tabActiveIndex = $('.tabsHolder>.tabs>li.activeTab').index();		

			currentLeft = (tabWidth * tabIndex) + tabsHolderPadding;

			$('.indicator').css({

				'display':'inline'

			});

			if(tabIndex == tabActiveIndex){

				$('.indicator').stop().animate({

					'left': currentLeft+'px'
					
				},100,"linear",function(){

					$('.indicator').css({

						'display':'none'

					});

				});

			}else{

				$('.indicator').stop().animate({

					'left': currentLeft+'px'
					
				},100,"linear");

			}

		});

		$('.tabsHolder>.tabs>li').mouseout(function(e){

			e.stopPropagation();

			var tabIndex = $(this).index();

			var tabActiveIndex = $('.tabsHolder>.tabs>li.activeTab').index();	

			var currentLeft = (tabWidth * tabActiveIndex)+ tabsHolderPadding;

			if(tabIndex != tabActiveIndex ){

				$('.indicator').stop().fadeOut('fast',function(){

					$('.indicator').css({

						'left': currentLeft+'px'

					});

				});

			}

		});

		$('.rightContainer').scroll(function() {

			var rightWidth = $('.rightContainer').width() - 16;

			if($(this).scrollTop()>100){

				$('.tabsContainer').css({

					'width': rightWidth+'px'

				});

				$('.tabsContainer').addClass('sticky');

				$('.tabsHolder').addClass('sticky');

				
			}else{

				$('.tabsContainer').removeClass('sticky');

				$('.tabsHolder').removeClass('sticky');

			}

		});

	}

})(jQuery);