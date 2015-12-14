function Zhanshi(id) {
    var _this = this;
    this.zjm_zb_slt_img = getId(id);
    this.zhanshi = getId('zhanshi');
    this.oImg = getClass(this.zhanshi, 'oImg')[0];
    this.aImg = this.zjm_zb_slt_img.getElementsByTagName("img");
    this.anniu1 = getClass(this.zhanshi, 'left')[0],this.anniu2 = getClass(this.zhanshi, 'right')[0];
    this.aEm = this.zhanshi.getElementsByTagName('em')[0];
    for (var i = 0; i < this.aImg.length; i++)this.aImg[i].index = i;
    this.zjm_zb_slt_img.onclick = function (ev) {
        _this.suolve(ev);
    };
    window.onscroll = function () {
        _this.roll();
     };
}
//点击缩略图
Zhanshi.prototype.suolve = function (ev) {
    var _this = this;
    stopBubble(ev);
    this.that = getTarget(ev);
    if (this.that.tagName.toLowerCase() === 'img') {
        gsstyle(this.zhanshi, 'display', 'block');
        //延迟加载大图 big.png并锁定位置，在chrome下时好时坏
        setTimeout(function () {
            _this.oImg.setAttribute('src', _this.that.getAttribute('src').substring(0, 19) + '_big.png');
            zhanshidaxiao(_this);
        }, 500);
        prev_next_img(this.that,_this);
        //禁止滚动条滚动
        addEvent(window, 'mousewheel', predef);
        addEvent(window, 'mousedown', predef);
        addEvent(window, 'mouseup', predef);
        addEvent(window, 'selectstart', predef);
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }
    getClass(this.zhanshi, 'zhezhao')[0].onclick=function(){
        _this.zhezhao()
    };
    this.anniu1.onclick=function(){
        _this.anniua(this);
    };
    this.anniu2.onclick=function(){
        _this.anniub(this);
    };
};
//页面滚动时设置遮罩各元素的位置大小
Zhanshi.prototype.roll = function () {
    var _this = this;
    setTimeout(function () {
        _this.zhanshi.style.width = getInner().width + getScroll().left + 'px';
        _this.zhanshi.style.height = getInner().height + getScroll().top + 'px';
        zhanshidaxiao(_this);
        _this.aEm.style.top = getScroll().top + 20 + 'px';
        _this.aEm.style.left = (getInner().width - _this.aEm.offsetWidth) / 2 + getScroll().left + 'px';
    }, 100)
};
//点击遮罩恢复滚动条和显示loading.gif并锁定位置
Zhanshi.prototype.zhezhao = function () {
    gsstyle(this.zhanshi, 'display', 'none');
    //关闭遮罩后再点就不会出现上次点过的图了
    this.oImg.setAttribute('src', '../images/goods/loading.gif');
    zhanshidaxiao(this);
    removeEvent(window, 'mousewheel', predef);
    removeEvent(window, 'mousedown', predef);
    removeEvent(window, 'mouseup', predef);
    removeEvent(window, 'selectstart', predef);
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
};
Zhanshi.prototype.anniua = function (that) {
    var _this=this;
    //把上面获取到的src值放到它的src上
    this.oImg.setAttribute('src','../images/goods/loading.gif');
    this.current_img=new Image();
    addEvent(this.current_img,'load',function(){
        _this.oImg.setAttribute('src',_this.current_img.src);
        zhanshidaxiao(_this);
    });
    this.current_img.src=that.getAttribute('src');
    zhanshiopacity(this);
    this.that=this.aImg[prevIndex(this.oImg.getAttribute('index'),this.zjm_zb_slt_img)];    //通过上一个的index获得上一个本身
    prev_next_img(this.that,this);
};
Zhanshi.prototype.anniub = function (that) {
    var _this = this;
    this.oImg.setAttribute('src', '../images/goods/loading.gif');
    this.current_img2 = new Image();
    addEvent(this.current_img2, 'load', function () {
        _this.oImg.setAttribute('src', _this.current_img2.src);
        zhanshidaxiao(_this);
    });
    this.current_img2.src = that.getAttribute('src');
    zhanshiopacity(this);
    this.that = this.aImg[nextIndex(this.oImg.getAttribute('index'), this.zjm_zb_slt_img)];    //通过下一个的index获得下一个本身
    prev_next_img(this.that,this);
};
//预加载左右图片
function prev_next_img(_this,that) {
    this.prev_img=new Image();
    this.next_img=new Image();
    //3个that，第一个的that是为了给anniu值，而第二、三个的that是为了接下去继续给anniu值，所以二、三个的that需要两次prev
    this.prev_img.src=that.aImg[prevIndex(_this.index,that.zjm_zb_slt_img)].getAttribute('src').substring(0,19)+'_big.png';
    this.next_img.src=that.aImg[nextIndex(_this.index,that.zjm_zb_slt_img)].getAttribute('src').substring(0,19)+'_big.png';
    that.anniu1.setAttribute('src',this.prev_img.src);
    that.anniu2.setAttribute('src',this.next_img.src);
    //把当前的index继续传给oImg
    that.oImg.setAttribute('index',_this.index);
    that.aEm.innerHTML=_this.index+1+' / '+that.aImg.length;
}
//重新设置位置
function zhanshidaxiao(_this) {
    _this.oImg.style.left = parseInt((getInner().width - _this.oImg.offsetWidth) / 2) + getScroll().left + 'px';
    _this.oImg.style.top = parseInt((getInner().height - _this.oImg.offsetHeight) / 2) + getScroll().top + 'px';
    _this.anniu1.style.top = _this.anniu2.style.top = (getInner().height - _this.anniu1.offsetHeight) / 2 + getScroll().top + 'px';
}
//设置透明度动画
function zhanshiopacity(_this) {
    _this.oImg.style.opacity = 0;
    _this.oImg.style.filter = 'alpha(opacity=0)';
    yundong(_this.oImg, {opacity: 100});
}
function predef(ev) {
    cancelDefault(ev)
}