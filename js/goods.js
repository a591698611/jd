$(function () {
    $(".daohang").find("li").click(function () {
        $(this).css({
            "paddingTop": "10px",
            "borderTop": "2px solid #e4393c",
            "borderLeft": "1px solid #ddd",
            "borderRight": "1px solid #ddd",
            "borderBottom": "0",
            "backgroundColor": "#fff"
        }).siblings().css({
            "paddingTop": "7px",
            "borderTop": "2px solid #999",
            "borderLeft": "1px solid #ddd",
            "borderRight": "0",
            "borderBottom": "1px solid #ddd",
            "backgroundColor": "#f7f7f7"
        });
    });
    $("#jiawei1").addClass("intro1").mouseover(function () {
        $(this).addClass("intro1").siblings().removeClass("intro1").addClass("intro");
        $("#jiawei").css("display", "block").siblings().not(".tong,h4").css("display", "none");
    });
    $("#pinpai1").mouseover(function () {
        $(this).addClass("intro1").siblings().removeClass("intro1").addClass("intro");
        $("#pinpai").css("display", "block").siblings().not(".tong,h4").css("display", "none");
    });
    $("#leibie1").mouseover(function () {
        $(this).addClass("intro1").siblings().removeClass("intro1").addClass("intro");
        $("#leibie").css("display", "block").siblings().not(".tong,h4").css("display", "none");
    });
    $("#zjm_zb_slt_img li").mouseover(function () {
        $(this).css("border", "2px solid #e4393c").siblings().css("border", "2px solid #fff");
        $("#zjm_zb_datu img").attr("src", $(this).find('img').attr('src'))
    });
    $(".difang").mouseover(function () {
        $(".difang_top").css("border-bottom", "1px solid #fff");
        $(".difang_body").css("display", "inline-block");
    }).mouseout(function () {
        $(".difang_top").css("border-bottom", "1px solid #cecbce");
        $(".difang_body").css("display", "none");
    });
    $("#difang_body_top").find("li").last().addClass("diqu");
    for (var i = 1; i < 4; i++) {
        $("#difang_body_top").find("li").eq(i - 1).click(function () {
            $(this).addClass("diqu").siblings().removeClass("diqu");
            $("#difang_body_body_" + ($(this).index() + 1)).css("display", "block").siblings().css("display", "none");
        });
    }
    $(".guanbi").click(function () {
        $(".difang_top").css("border-bottom", "1px solid #cecbce");
        $(".difang_body").css("display", "none");
    });
    $(".tsul").find("li").first().addClass("tanchu");
    $(".tsul").find("li").click(function () {
        $(this).addClass("tanchu").siblings().removeClass("tanchu");
    });
    $("#pjul").find("li").first().addClass("tanchu");
    $("#pjul").find("li").click(function () {
        $(this).css("paddingTop", "11px").siblings().css("paddingTop", "7px");
    });
    $(".kehuduan").mouseover(function () {
        $(".erweima").css("display", "block");
    }).mouseout(function () {
        $(".erweima").css("display", "none");
    });
    var j = 1;
    $(".h1p").click(function () {
        for (var i = 1; i < 4; i++) {
            $("#xh_middle_" + i).css("display", "none")
        }
        j++;
        var x = j % 3 + 1;
        $("#xh_middle_" + x).css("display", "block");
    })
});

addDomLoaded(function () {
    new Zhanshi('zjm_zb_slt_img');
    getId('container').getElementsByTagName('input')[0].focus();    //搜索获得焦点
    var datu_ul = getId("datu_ul");
    setInterval(function () {
        var julia = datu_ul.offsetTop;
        if (julia <= -150) {
            julia = 81
        }
        yundong(datu_ul, {'top': julia - 81});
    }, 2500);
    //主界面缩略图动画
    var zjm_zb_slt_img = getId("zjm_zb_slt_img");
    var stop = true;
    var yidongz = getId('yidongz'), yidongy = getId('yidongy');
    addEvent(yidongz, 'click', function () {
        if (stop) {
            var juli = zjm_zb_slt_img.offsetLeft;
            if (juli !== 24) {
                yundong(zjm_zb_slt_img, {"left": juli + 61})
            }
            if (juli === -159) {
                yidongy.style.background = "url('../images/goods/yidong.png') no-repeat -78px 0";
            }
            if (juli === -37) {
                this.style.background = "url('../images/goods/yidong.png') no-repeat -104px 0";
            }
        } else {
            return false
        }
        stop = false;
        setTimeout(function () {
            stop = true
        }, 600)
    });
    addEvent(yidongy, 'click', function () {
        if (stop) {
            var juli = zjm_zb_slt_img.offsetLeft;
            if (juli != -159) {
                yundong(zjm_zb_slt_img, {"left": juli - 61});
            }
            if (juli === 24) {
                yidongz.style.background = "url('../images/goods/yidong.png') no-repeat 0 0";
            }
            if (juli === -98) {
                this.style.background = "url('../images/goods/yidong.png') no-repeat -130px 0";
            }
        } else {
            return false
        }
        stop = false;
        setTimeout(function () {
            stop = true
        }, 600)
    });
    //加入购物车
    var shuliang = getId('shuliang');
    var shuzi = parseInt(shuliang.value);
    addEvent(document.getElementsByClassName("jia")[0], 'click', function () {
        shuliang.value = shuzi++;
    });
    addEvent(document.getElementsByClassName("jian")[0], 'click', function () {
        if (shuzi === 0)shuzi = 1;
        shuliang.value = shuzi--;
    });
});