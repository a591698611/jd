addDomLoaded(function () {
    //显示用户名
    var ttuldiv = getClass(getId('toutiao1'), 'ttuldiv1')[0];
    ttuldiv.style.width = 180 + 'px';
    function reCookie() {
        if (getCookie('user') === '') {
            ttuldiv.innerHTML = '<a href="./files/login.html">你好，请登录</a>&nbsp;<a href="./files/register.html" class="on">免费注册</a>'
        } else {
            ttuldiv.innerHTML = getCookie('user') + '&nbsp;<a href="javascript:;" id="tuichu" class="on">退出</a>';
            addEvent(getId('tuichu'), 'click', tuichu);
        }
    }

    reCookie();
    addEvent(ttuldiv, 'click', function (ev) {
        var oEvent = ev || window.event;
        if (oEvent.className === 'on') {
            removeEvent(getId('tuichu'), 'click', tuichu)
        }
    });
    function tuichu() {
        removeCookie('user', '/');
        reCookie();
    }

    //主图轮播
    var box = getClass(getId('middle'), 'box')[0];
    var prev = getId("prev"), next = getId("next");
    var oImg = box.getElementsByTagName("img");
    var oLi = getClass(box, 'xuhao')[0].getElementsByTagName('li');
    var now = 0, oZindex = 2, timer = null;
    for (var i = 0; i < oLi.length; i++) {
        oLi[i].index = i;
        addEvent(oLi[i], 'mouseover', function () {
            if (this.index === now)return;
            now = this.index;
            tab();
        })
    }
    var stop = true;
    addEvent(prev, 'click', function () {
        if (stop) {
            now--;
            if (now === -1) {
                now = oLi.length - 1
            }
            tab();
        } else {
            return false
        }
        stop = false;
        setTimeout(function () {
            stop = true
        }, 500)
    });
    addEvent(next, 'click', function () {
        if (stop) {
            now++;
            if (now === oLi.length) {
                now = 0
            }
            tab();
        } else {
            return false
        }
        stop = false;
        setTimeout(function () {
            stop = true
        }, 500)
    });
    function tab() {
        clearTimeout(timer);
        timer = setTimeout(function () {
            for (var i = 0; i < oLi.length; i++) {
                removeClass(oLi[i], 'active');
            }
            addClass(oLi[now], 'active');
            oImg[now].style.zIndex = oZindex++;
            oImg[now].style.opacity = 0;
            yundong(oImg[now], {opacity: 100})
        }, 300)
    }

    //今日推荐轮播
    var zuo = getId("zuo");
    var you = getId("you");
    var tjul = getId("tjul");
    var tjli = tjul.getElementsByTagName("li");
    tjul.style.width = tjli[0].offsetWidth * tjli.length + 'px';
    addEvent(zuo, 'mouseover', zuoyouBlock);
    addEvent(zuo, 'mouseout', zuoyouNone);
    addEvent(you, 'mouseover', zuoyouBlock);
    addEvent(you, 'mouseout', zuoyouNone);
    addEvent(tjul, 'mouseover', zuoyouBlock);
    addEvent(tjul, 'mouseout', zuoyouNone);
    function zuoyouBlock() {
        zuo.style.display = 'block';
        you.style.display = 'block';
    }

    function zuoyouNone() {
        zuo.style.display = 'none';
        you.style.display = 'none';
    }

    var stop = true;
    addEvent(zuo, 'click', function () {
        if (stop) {
            if (tjul.offsetLeft === 0) {
                yundong(tjul, {left: -2006})
            } else {
                yundong(tjul, {left: tjul.offsetLeft + 1003})
            }
        } else {
            return false
        }
        stop = false;
        setTimeout(function () {
            stop = true
        }, 1100)
    });
    addEvent(you, 'click', function () {
        if (stop) {
            if (tjul.offsetLeft === -2006) {
                yundong(tjul, {left: 0})
            } else {
                yundong(tjul, {left: tjul.offsetLeft - 1003})
            }
        } else {
            return false
        }
        stop = false;
        setTimeout(function () {
            stop = true
        }, 1100)
    });
    /*背景图运动*/
    var datu_ul = getId("datu_ul");

    function movedatu() {
        var julia = datu_ul.offsetTop;
        if (julia <= -150) {
            julia = 81
        }
        yundong(datu_ul, {'top': julia - 81});
    }

    setInterval(movedatu, 2500);
    /*抄底运动*/
    var cdybli = getId("cdybli");

    function movecd() {
        var julib = cdybli.offsetTop;
        if (julib >= 0) {
            julib = -560
        }
        yundong(cdybli, {'top': julib + 140});
    }

    setInterval(movecd, 2500);
    //右侧底部导航
    var ycdaohang = getId("ycdaohang"), dbdaohang = getId("dbdaohang");
    ycdaohang.style.top = Math.round((getInner().height - ycdaohang.offsetHeight) / 2) + getScroll().top + 'px';
    dbdaohang.style.top = getInner().height - dbdaohang.offsetHeight + getScroll().top + 'px';
    addEvent(ycdaohang, 'mouseover', daohangover);
    addEvent(ycdaohang, 'mouseout', daohangout);
    addEvent(dbdaohang, 'mouseover', daohangover);
    addEvent(dbdaohang, 'mouseout', daohangout);
    function daohangover(evt) {
        var that = getTarget(evt);
        if (that.tagName.toLowerCase() === 'div') {
            yundong(that.children[1], {width: 60, left: -57})
        } else if (that.tagName.toLowerCase() === 'i') {
            yundong(that.parentNode.children[1], {width: 60, left: -57})
        }
    }

    function daohangout(evt) {
        var that = getTarget(evt);
        if (that.tagName.toLowerCase() === 'div') {
            yundong(that.children[1], {width: 0, left: 0})
        } else if (that.tagName.toLowerCase() === 'i') {
            yundong(that.parentNode.children[1], {width: 0, left: 0})
        }
    }

    addEvent(dbdaohang, 'click', function () {
        scrollTop();
    });
    function dbdaohangzt() {
        if (dbdaohang.offsetTop === getInner().height - dbdaohang.offsetHeight) {
            dbdaohang.style.display = 'none'
        } else {
            dbdaohang.style.display = 'block'
        }
    }

    dbdaohangzt();
    addEvent(window, 'scroll', function () {
        var ycdaohang = getId("ycdaohang");
        var dbdaohang = getId("dbdaohang");
        ycdaohang.style.top = Math.round((getInner().height - ycdaohang.offsetHeight) / 2) + getScroll().top + 'px';
        dbdaohang.style.top = getInner().height - dbdaohang.offsetHeight + getScroll().top + 'px';
        dbdaohangzt();
        _wait_load();
    });
    addEvent(window, 'resize', _wait_load);
    function _wait_load() {            //延迟加载
        var load = document.getElementsByClassName('wait-load');
        setTimeout(function () {
            for (var i = 0; i < load.length; i++) {
                if (getInner().height + getScroll().top >= offsetTop(load[i])) {
                    load[i].setAttribute('src', load[i].getAttribute('xsrc'));
                }
            }
        }, 500);
    }
});