(function($) {

	$.fn.navigationMenu = function() {

		var isiPad = navigator.userAgent.toLowerCase().indexOf("ipad");

		if(isiPad > -1){

			console.log('ipad');

  		}else{

  			console.log('web');

  		}


		$('.navLinksContainer li>a').click(function(){

			$(this).parent().addClass('active');

			if($(this).next().length == 1){

				if($('.navBack').length == 0){

					$(this).addClass('hasChildren');

					$( ".hasChildren" ).after( "  <a class='navBack' href='#'>Back</a>" );

				}

				$('.navLinksContainer li').each(function(){

					if(!$(this).hasClass('active')){

						if(!$(this).parent().hasClass('children')){

							$(this).animate({

								'marginLeft': '-70px'

							},200,function(){

								$(this).hide();

								$('.children').show();

								$('.children').animate({

									'marginLeft':'10px'

								},400);

							});

						}

					}

				});

			}

		});

		$(document).on("click", ".navBack",function() {

			$('.navBack').remove();

			$('.children').animate({

				'marginLeft':'-120px'

			},300,function(){

				$('.hasChildren').removeClass('hasChildren');

				$('.children').hide();

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

	}	

})(jQuery);