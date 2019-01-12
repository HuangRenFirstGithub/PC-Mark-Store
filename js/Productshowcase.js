// JavaScript Document
// 當網頁載完後執行(因為要抓圖片的寬高)
$(window).load(function(){
	// 先取得相關區塊及圖片的寬高
	// 並先計算出大圖片要垂直置中所需要的 top 值
	var $gallery = $('#abgne-gallery-20111224'), 
		$frame = $gallery.find('ul'), 
		_frameHeight = $frame.height(), 
		_frameWidth = $frame.width(), 
		$li = $frame.find('li'), 
		$img = $li.find('img'), 
		_imgLength = $img.length, 
		_imgWidth = $img.width(),
		_imgHeight = $img.height(),
		_topDiff = (_frameHeight - _imgHeight) / 2, 
		_animateSpeed = 200;
 
	// 設定每張圖片縮放比例
	// _totalWidth 用來記錄寬度累加
	var resizeRatio = [ 0.6, 0.7, 0.8, 1, 0.8, 0.7, 0.6], 
		liCss = [], 
		_totalWidth = 0;
 
	// 預先算出每張圖片縮放後的總寬度
	var _m = 0;
	$img.each(function(i){ 
		_m += $(this).width() * resizeRatio[i];
	});
	// 平均分配要重疊的寬度
	var _leftDiff = Math.ceil((_m - _frameWidth) / (_imgLength - 1));
 
	// 設定每一個 li 的位置及圖片寬高
	$li.each(function(i){
		var $this = $(this), 
			_width = _imgWidth * resizeRatio[i],
			_height = _imgHeight * resizeRatio[i];
 
		liCss.push({
			height: _height, 
			width: _width, 
			left: _totalWidth  + (i == _imgLength - 1 ? 1 : 0), 
			top: _topDiff + (_imgHeight - _height) / 2, 
			zIndex: resizeRatio[i] * 10
		});
 
		$this.css(liCss[liCss.length-1]).css({
			position: 'absolute',
			border: '1px solid white'
		}).data('_index', i).find('img').css({
			width: '100%', 
			height: '100%'
		});
 
		_totalWidth += _width - _leftDiff;
	});
 
	// 當滑鼠點擊在 $gallery 中的 .controls 時
	$gallery.on('click', '.controls', function(){
		var $button = $(this);
 
		// 重新計算每一個 li 的位置及圖片寬高
		$li.each(function(){
			var $this = $(this), 
				_index = $this.data('_index');
 
			_index = ($button.hasClass('next') ? (_index - 1 + _imgLength) : (_index + 1)) % _imgLength;
			$this.data('_index', _index);
 
			$this.stop(false, true).animate(liCss[_index], _animateSpeed);
		});
 
		return false;
	});
});