// JavaScript Document
$(function(){
	var $block = $('#abgne_fade_pic'), 
		$ad = $block.find('.ad'),
		showIndex = 0,			// 預設要先顯示那一張
		fadeOutSpeed = 2000,	// 淡出的速度
		fadeInSpeed = 3000,		// 淡入的速度
		defaultZ = 10;			// 預設的 z-index
 
	// 先把其它圖片的變成透明
	$ad.css({
		opacity: 0,
		zIndex: defaultZ - 1
	}).eq(showIndex).css({
		opacity: 1,
		zIndex: defaultZ
	});
 
	// 組出右下的按鈕
	var str = '';
	for(var i=0;i<$ad.length;i++){
		str += '<a href="#">' + (i + 1) + '</a>';
	}
	var $controlA = $('#abgne_fade_pic').append($('<div class="control">' + str + '</div>').css('zIndex', defaultZ + 1)).find('.control a');
 
	// 當按鈕被點選時
	// 若要變成滑鼠滑入來切換時, 可以把 click 換成 mouseover
	$controlA.click(function(){
		// 取得目前點擊的號碼
		showIndex = $(this).text() * 1 - 1;
 
		// 顯示相對應的區域並把其它區域變成透明
		$ad.eq(showIndex).stop().fadeTo(fadeInSpeed, 1).css('zIndex', defaultZ).siblings('a').stop().fadeTo(fadeOutSpeed, 0).css('zIndex', defaultZ - 1);
		// 讓 a 加上 .on
		$(this).addClass('on').siblings().removeClass('on');
 
		return false;
	}).focus(function(){
		$(this).blur();
	}).eq(showIndex).addClass('on');
});