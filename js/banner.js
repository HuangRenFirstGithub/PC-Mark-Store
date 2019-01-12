// JavaScript Document
$(function(){
	// 先取得必要的元素並用 jQuery 包裝
	// 再來取得 $block 的高度及設定動畫時間
	var $block = $('#abgne-block-20110317'),
		$slides = $block.find('ul.abgne-list'),
		_width = $block.width(),
		$li = $slides.find('li'),
		$control = $block.find('.abgne-control'), 
		_animateSpeed = 600, 
		// 加入計時器, 輪播時間及控制開關
		timer, _showSpeed = 1000, _stop = false;
 
	// 設定 $slides 的寬(為了不讓 li 往下擠)
	$slides.css('width', ($li.length + 1) * _width);
	// 產生 li 選項
	var _str = '';
	for(var i=0, j=$li.length;i<j;i++){
		// 每一個 li 都有自己的 className = playerControl_號碼
		_str += '<li class="abgne-player-control_' + (i+1) + '">' + (i+1) + '</li>';
	}
 
	// 產生 ul 並把 li 選項加到其中
	var $number = $('<ul class="numbers"></ul>').html(_str).appendTo($control), 
		$numberLi = $number.find('li');
 
	// 並幫 .numbers li 加上 click 事件
	$numberLi.click(function(){
		var $this = $(this);
		$this.addClass('current').siblings('.current').removeClass('current');
 
		clearTimeout(timer);
		// 移動位置到相對應的號碼
		$slides.stop().animate({
			left: _width * $this.index() * -1
		}, _animateSpeed, function(){
			// 當廣告移動到正確位置後, 依判斷來啟動計時器
			if(!_stop) timer = setTimeout(move, _showSpeed);
		});
 
		return false;
	}).eq(0).click();
 
	// 幫 .arrows li 加上 click 事件
	$control.find('ul.arrows li').click(function(){
		var _index = $numberLi.filter('.current').index();
		$numberLi.eq((this.className.indexOf('next')>-1?_index+1:_index-1+$numberLi.length)%$numberLi.length).click();
 
		return false;
	});
 
	// 當滑鼠移到 $control li 上時, 加上 .hover 效果
	// 反之則移除
	$control.find('li').hover(function(){
		$(this).addClass('hover');
	}, function(){
		$(this).removeClass('hover');
	});
 
	// 如果滑鼠移入 $slides 時
	$slides.hover(function(){
		// 關閉開關及計時器
		_stop = true;
		clearTimeout(timer);
	}, function(){
		// 如果滑鼠移出 $block 時
		// 開啟開關及計時器
		_stop = false;
		timer = setTimeout(move, _showSpeed);
	});
 
	// 計時器使用
	function move(){
		$control.find('ul.arrows li.next').click();
	}
});