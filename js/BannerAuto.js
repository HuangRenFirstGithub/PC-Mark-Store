$(function(){
	// 先取得必要的元素並用 jQuery 包裝
	// 再來取得 $block 的寬度及設定動畫時間
	var $block = $('#abgne-block-20110406'), 
		$slides = $block.find('.slides'), 
		$ul = $slides.find('ul'), 
		_width = $slides.width(), 
		_left = _width * -1, 
		_animateSpeed = 400, 
		// 加入計時器, 輪播時間及控制開關
		timer, _showSpeed = 3000, _stop = false;
 
	// 先把最後一個 li 的內容插入到第一個 li 前面
	// 並設定 $ul 的 left 及 width
	$ul.find('li:first').before($ul.find('li:last')).end().css({
		left: _left,
		width: _width * ($ul.find('li').length + 1)
	});
 
	// 當點擊到 a.prev 時
	var $prev = $block.find('a.prev').click(function(){
		// 移動 $ul
		$ul.stop(false, true).animate({'left' : _left + _width}, _animateSpeed, function () {
			// 把最後一個 li 的內容插入到第一個 li 前面
			$ul.find('li:first').before($ul.find('li:last')).end().css('left', _left);
			// 當移動到正確位置後, 依判斷來啟動計時器
			if(!_stop) {
				clearTimeout(timer);
				timer = setTimeout(move, _showSpeed);
			}
		});
		return false;
	});
 
	// 當點擊到 a.next 時
	var $next = $block.find('a.next').click(function(){
		// 移動 $ul
		$ul.stop(false, true).animate({'left' : _left - _width}, _animateSpeed, function () {
			// 把第一個 li 的內容插入到最後一個 li 後面
			$ul.find('li:last').after($ul.find('li:first')).end().css('left', _left);
			// 當移動到正確位置後, 依判斷來啟動計時器
			if(!_stop) {
				clearTimeout(timer);
				timer = setTimeout(move, _showSpeed);
			}
		});
		return false;
	});
 
	// 如果滑鼠移入 $block 時
	$block.hover(function(){
		// 關閉開關及計時器
		_stop = true;
		clearTimeout(timer);
	}, function(){
		// 如果滑鼠移出 $block 時
		// 開啟開關及計時器
		_stop = false;
		timer = setTimeout(move, _showSpeed);
	}).find('a').focus(function(){
		this.blur();
	});
 
	// 計時器使用
	function move(){
		$next.click();
	};
 
	timer = setTimeout(move, _showSpeed);
});