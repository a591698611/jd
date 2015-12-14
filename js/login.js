addDomLoaded(function () {
    var middle = getId('middle');
    var kuang = getClass(middle, 'kuang');
    var denglu = getId('denglu');
    var jinggao = document.getElementsByClassName("jinggao")[0];
    addEvent(document.forms['login'], 'submit', function (evt) {
        cancelDefault(evt);
        denglu.disabled = true;
        if (/[\w]{4,20}/.test(kuang[0].value) && kuang[1].value.length >= 6) {
            ajax({
                method: 'post',
                url: 'is_login.php',
                data: serialize(document.forms['login']),
                success: function (text) {
                    if (text === 1) {
                        gsstyle(jinggao, 'display', 'block');
                    } else {
                        gsstyle(jinggao, 'display', 'none');
                        location.href = '../index.html';
                        setCookie('user', kuang[0].value, 15, '/');
                    }
                    denglu.disabled = false;
                },
                async: true
            });
        } else {
            gsstyle(jinggao, 'display', 'block');
        }
    });

    var yidong = getId('yidong');
    var qita = getClass(middle, 'qita')[0];
    addEvent(yidong, 'mouseover', function () {
        gsstyle(qita, 'display', 'block');
    });
    addEvent(yidong, 'mouseout', function () {
        gsstyle(qita, 'display', 'none');
    });
    var zhanghao = getClass(middle, 'zhanghao'), tou = getClass(middle, 'tou');
    kuang[0].focus();
    gsstyle(zhanghao[0], 'border', '1px solid #3aa2e4');
    gsstyle(tou[0], 'borderRight', '1px solid #3aa2e4');
    for (var i = 0; i < zhanghao.length; i++) {
        zhanghao[i].index = i;
        addEvent(zhanghao[i], 'click', bianse);
        kuang[i].index = i;
        addEvent(kuang[i], 'focus', bianse);
    }
    function bianse(evt) {
        stopBubble(evt);
        bianse2();
        gsstyle(zhanghao[this.index], 'border', '1px solid #3aa2e4');
        gsstyle(tou[this.index], 'borderRight', '1px solid #3aa2e4');
    }

    addEvent(document, 'click', bianse2);
    function bianse2() {
        for (var i = 0; i < zhanghao.length; i++) {
            zhanghao[i].style.border = '1px solid #bdbdbd';
            tou[i].style.borderRight = '1px solid #bdbdbd';
        }
    }
});