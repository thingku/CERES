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

					var height = holdliHeight + padTop;
					
					$('.navLinksContainer li').not(':first-child').each(function(){

						if(!$(this).hasClass('active')){

							if(!$(this).parent().hasClass('children')){

								$(this).animate({

									'marginLeft': '-300px'

								},100,function(){	

									var x = $('.active').index() - 1;

									heightAdjust = (height * x);
									
									$('.active').animate({

										'marginTop':'-'+heightAdjust+'px'

									},100,function(){

										var childHeight = $('.active .children').height() + 10;
										console.log(childHeight);
										$('.active2').animate({

											'height': childHeight+"px"

										},300,function(){

											$('.active .children').show();

											$('.active .children').animate({

												'marginLeft':'0px'

											},200);

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

			$('.children').animate({

				'marginLeft':'-300px'

			},200,function(){

				$('.navBack').attr('src', holdAnchor);

				$('.navBack').attr('class', "");

				$('.active2').animate({

					'height': holdliHeight+"px"

				},200,function(){

					$('.hasChildren').removeClass('hasChildren');

					$('.children').hide();

					$('.active').animate({

						'marginTop':'0px'

					},200,function(){

						$('.navLinksContainer li').each(function(){

							if(!$(this).hasClass('active')){

								if(!$(this).parent().hasClass('children')){

									$(this).show();

									$(this).animate({

										'marginLeft': '0px'

									},200,function(){

										

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