(function($) {

	var holdAnchor = "";

	var holdliHeight = $(".navLinksContainer li").height();

	$.fn.navigationMenu = function() {

		var isiPad = navigator.userAgent.toLowerCase().indexOf("ipad");

		if(isiPad > -1){

			console.log('ipad');

  		}else{

  			console.log('web');

  		}

  		var heightAdjust = 0;

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

					/*var height = $(this).parent().height() + padTop;*/

					var x = $('.active').index();

					var height = holdliHeight + padTop;

					heightAdjust = (height * x);
						//.not(':first-child')
					$('.navLinksContainer li').each(function(){

						if(!$(this).hasClass('active')){

							if(!$(this).parent().hasClass('children')){

								$(this).animate({

									'marginLeft': '-190px'

								},200,"linear",function(){	

									$('.active').animate({

										'marginTop':'-'+heightAdjust+'px'

									},100,"linear",function(){

										var childHeight = $('.active .children').height() + 10;

										$('.active .children').css({"position":"absolute"});

										$('.active2').animate({

											'height': childHeight+"px"

										},400,"linear",function(){

											$('.active .children').fadeIn(300,"linear");
											
										});
										
									});

								});

							}

						}

					});

				}

			}
			
		});

		$(document).on("click", ".navBack",function() {

			$('.active  .children li').removeClass('activeSub');
			
			$('.active .children').fadeOut(300,"linear",function(){

				$('.active .children').css({"position":"initial"});

				$('.navBack').attr('src', holdAnchor);

				$('.navBack').attr('class', "");

				$('.active2').animate({

					'height': holdliHeight+"px"

				},300,"linear",function(){

					$('.hasChildren').removeClass('hasChildren');

					$('.active').animate({

						'marginTop':'0px'

					},200,"linear",function(){

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

		});

		$('.children>li').click(function(){

			$('.children>li').removeClass('activeSub');

			$(this).addClass('activeSub');

		});

	}	

})(jQuery);