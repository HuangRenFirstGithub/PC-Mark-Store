// JavaScript Document
$(function(){
	// 先取得 .abgne-news-scroll ul, 並設定淡入及輪播時間
	var $news = $('.abgne-news-scroll ul'), 
		fadeInSpeed = 600, 
		timer, speed = 2000;
 
	// 用來控制輪播用
	function newsScroll(){
		// 先找出最後一個 li
		var $last = $news.find('li:last');
		// 複製一份並先隱藏起來
		// 接著把它加到 .abgne-news-scroll ul 中的第一個項目
		// 最後用淡入的方式顯示, 當顯示完後繼續輪播
		$last.clone().hide().prependTo($news).fadeIn(fadeInSpeed, function(){
			timer = setTimeout(newsScroll, speed);
		});
		// 把 $last 移除掉
		$last.remove();
	}
 
	// 啟動輪播計時器
	timer = setTimeout(newsScroll, speed);
});