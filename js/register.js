addDomLoaded(function () {
    var register_ul = getId('register_ul');
    var kuang = getClass(getId('register_ul'), 'kuang');
    var _this = null;
    addEvent(register_ul, 'click', function (evt) {
        if (_this != null)_this.style.border = '1px solid #bdbdbd';      //去除之前变化的边框
        var that = getTarget(evt);
        if (hasClass(that, 'kuang')) {
            that.style.border = '1px solid #7abd54';
            _this = that;
        }
    });
    //上方的选项卡
    var xuanze = getId("xuanze");
    addEvent(xuanze, 'click', function (evt) {
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].className = ''
        }
        var that = getTarget(evt);
        if (that.tagName.toLowerCase() === 'li') {
            addClass(that, 'active');
        }
    });
    var register = document.getElementById("register");
    var kuang = getClass(register, 'kuang');
    var aForm = document.getElementsByTagName('form')[0];
    aForm.reset();   //刷新后清空表单
    //用户名
    var info_user = getClass(register, 'info-user')[0], error_user = getClass(register, 'error-user')[0], succ_user = getClass(register, 'succ-user')[0], jianceuser = getClass(register, 'jianceuser')[0];
    addEvent(kuang[0], 'focus', function () {
        if (trim(this.value) === '') {
            info_user.style.display = 'block';
            error_user.style.display = 'none';
            succ_user.style.display = 'none';
        }
    });
    addEvent(kuang[0], 'blur', function () {
        if (trim(this.value) === '') {
            info_user.style.display = 'none';
            error_user.style.display = 'none';
            succ_user.style.display = 'none';
        } else if (!check_user()) {
            info_user.style.display = 'none';
            error_user.style.display = 'block';
            succ_user.style.display = 'none';
        } else {
            info_user.style.display = 'none';
            error_user.style.display = 'none';
            succ_user.style.display = 'block';
        }
    });
    function check_user() {
        var flag = true;
        if (!/[\w]{4,20}/.test(trim(kuang[0].value))) {                //大于20个不显示效果
            error_user.innerHTML = '输入不合法，请重新输入';
            return false;
        } else {
            gsstyle(jianceuser, 'display', 'block');
            gsstyle(info_user, 'display', 'none');
            ajax({
                method: 'post',
                url: 'is_user.php',
                data: serialize(document.forms['form']),
                success: function (text) {
                    if (text === 1) {
                        flag = false;
                        error_user.innerHTML = '用户名已存在';
                    } else {
                        flag = true;
                    }
                    gsstyle(jianceuser, 'display', 'none');
                },
                async: false
            });
        }
        return flag;
    }

    //设置密码
    var info_pass = getClass(register, 'info-pass')[0], error_pass = getClass(register, 'error-pass')[0], succ_pass = getClass(register, 'succ-pass')[0];
    addEvent(kuang[1], 'focus', function () {
        if (trim(this.value) === '') {
            info_pass.style.display = 'block';
            error_pass.style.display = 'none';
            error_pass.style.display = 'none';
        }
    });
    addEvent(kuang[1], 'blur', function () {
        if (trim(this.value) === '') {
            info_pass.style.display = 'none';
        } else {
            if (check_pass()) {
                info_pass.style.display = 'none';
                error_pass.style.display = 'none';
                succ_pass.style.display = 'block';
            } else {
                info_pass.style.display = 'none';
                error_pass.style.display = 'block';
                succ_pass.style.display = 'none';
            }
        }
    });
    addEvent(kuang[1], 'keyup', function () {
        check_pass();
    });
    function check_pass() {
        var aValue = trim(kuang[1].value);
        var value_length = aValue.length;
        var q1 = getClass(register, 'q')[0], q2 = getClass(register, 'q')[1], q3 = getClass(register, 'q')[2];
        if (value_length >= 6 && value_length < 20) {
            q1.innerHTML = '●';
            q1.style.color = 'green';
        } else {
            q1.innerHTML = '○';
            q1.style.color = '#666';
        }
        if (value_length > 0 && !/\s/.test(aValue)) {
            q2.innerHTML = '●';
            q2.style.color = 'green';
        } else {
            q2.innerHTML = '○';
            q2.style.color = '#666';
        }
        var code_length = 0;
        if (/[a-z]/.test(aValue))code_length++;
        if (/[A-Z]/.test(aValue))code_length++;
        if (/[\d]/.test(aValue))code_length++;
        if (/[^\w]/.test(aValue))code_length++;
        if (code_length >= 2) {
            q3.innerHTML = '●';
            q3.style.color = 'green';
        } else {
            q3.innerHTML = '○';
            q3.style.color = '#666';
        }
        var s1 = getClass(register, 's')[0], s2 = getClass(register, 's')[1], s3 = getClass(register, 's')[2], s4 = getClass(register, 's')[3];
        if (value_length >= 10 && code_length >= 3) {
            s1.style.color = 'green';
            s2.style.color = 'green';
            s3.style.color = 'green';
            s4.style.color = 'green';
            s4.innerHTML = '高';
        } else if (value_length >= 8 && code_length >= 2) {
            s1.style.color = '#f60';
            s2.style.color = '#f60';
            s3.style.color = '#ccc';
            s4.style.color = '#f60';
            s4.innerHTML = '中';
        } else if (value_length >= 1) {
            s1.style.color = 'maroon';
            s2.style.color = '#ccc';
            s3.style.color = '#ccc';
            s4.style.color = 'maroon';
            s4.innerHTML = '低';
        } else {
            s1.style.color = '#ccc';
            s2.style.color = '#ccc';
            s3.style.color = '#ccc';
            s4.innerHTML = '';
        }
        if (value_length >= 6 && value_length <= 20 && code_length >= 2 && !/\s/.test(aValue)) {
            return true;
        } else {
            return false;
        }
    }

    //确认密码
    var info_notpass = getClass(register, 'info-notpass')[0], error_notpass = getClass(register, 'error-notpass')[0], succ_notpass = getClass(register, 'succ-notpass')[0];
    addEvent(kuang[2], 'focus', function () {
        info_notpass.style.display = 'block';
        error_notpass.style.display = 'none';
        succ_notpass.style.display = 'none';
    });
    addEvent(kuang[2], 'blur', function () {
        if (trim(this.value) === '') {
            info_notpass.style.display = 'none';
        } else if (check_notpass()) {
            info_notpass.style.display = 'none';
            error_notpass.style.display = 'none';
            succ_notpass.style.display = 'block';
        } else {
            info_notpass.style.display = 'none';
            error_notpass.style.display = 'block';
            succ_notpass.style.display = 'none';
        }
    });
    function check_notpass() {
        if (trim(kuang[2].value) === trim(kuang[1].value))return true;
    }

    //出生年月日
    var year = document.getElementsByName("year")[0];
    var month = document.getElementsByName("month")[0];
    var day = document.getElementsByName("day")[0];
    var error_birth = getClass(register, 'error-birth')[0];
    for (var i = new Date().getFullYear(); i >= 1980; i--) {
        year.appendChild(new Option(i + '年', i))
    }
    for (var i = 1; i <= 12; i++) {
        month.appendChild(new Option(i + '月', i))
    }
    var day30 = [4, 6, 9, 11];
    var day31 = [1, 3, 5, 7, 8, 10, 12];
    addEvent(year, 'change', select_day);
    addEvent(month, 'change', select_day);
    addEvent(day, 'change', function () {
        if (check_birth())error_birth.style.display = 'none';
    });
    function select_day() {
        if (year.value != 0 && month.value != 0) {
            day.options.length = 1;           //清理之前的填入的日options
            var cur_day = 0;
            if (inArray(day31, parseInt(month.value))) {
                cur_day = 31;
            } else if (inArray(day30, parseInt(month.value))) {
                cur_day = 30;
            } else {
                if ((parseInt(year.value) % 4 === 0 && parseInt(year.value) % 100 != 0) || parseInt(year.value) % 400 === 0) {
                    cur_day = 29;
                } else {
                    cur_day = 28;
                }
            }
            for (var i = 0; i <= cur_day; i++) {
                day.appendChild(new Option(i + '日', i))
            }
        } else {
            day.options.length = 1
        }
    }

    function check_birth() {
        if (year.options.length != 1 && month.options.length != 1 && day.options.length != 1)return true;
    }

    //电子邮箱
    var info_email = getClass(register, 'info-email')[0], error_email = getClass(register, 'error-email')[0], succ_email = getClass(register, 'succ-email')[0];
    addEvent(kuang[3], 'focus', function () {
        if (this.value.indexOf('@') == '-1')all_email.style.display = 'block';
        info_email.style.display = 'block';
        error_email.style.display = 'none';
        succ_email.style.display = 'none';
    });
    addEvent(kuang[3], 'blur', function () {
        all_email.style.display = 'none';
        if (trim(this.value) == '') {
            info_email.style.display = 'none';
        } else if (check_email()) {
            info_email.style.display = 'none';
            error_email.style.display = 'none';
            succ_email.style.display = 'block';
        } else {
            info_email.style.display = 'none';
            error_email.style.display = 'block';
            succ_email.style.display = 'none';
        }
    });
    var all_email = getClass(register, 'all-email')[0];
    var emailLi = all_email.getElementsByTagName('li');
    var oldColor = null, oldColor2 = null;
    addEvent(all_email, 'mouseover', function (evt) {
        var that = getTarget(evt);
        oldColor = this.style.backgroundColor;
        oldColor2 = this.style.color;
        if (that.tagName.toLowerCase() === 'li') {
            that.style.backgroundColor = '#e5edf2';
            that.style.color = '#369';
        }
    });
    addEvent(all_email, 'mouseout', function (evt) {
        var that = getTarget(evt);
        if (that.tagName.toLowerCase() === 'li') {
            that.style.backgroundColor = oldColor;
            that.style.color = oldColor2;
        }
    });
    addEvent(all_email, 'mousedown', function (evt) {
        var that = getTarget(evt);
        if (that.tagName.toLowerCase() === 'li')kuang[3].value = that.textContent ? that.textContent : that.innerText;
    });
    addEvent(kuang[3], 'keyup', function (evt) {
        var oEvent = evt || window.event;
        var emailSpan = all_email.getElementsByTagName('span');
        if (this.value.indexOf('@') == '-1') {
            for (var i = 0; i < emailSpan.length; i++) {
                all_email.style.display = 'block';
                emailSpan[i].innerHTML = this.value;
            }
        } else {
            all_email.style.display = 'none';
        }
        if (oEvent.keyCode == 40) {
            if (this.index == undefined || this.index >= 4) {
                this.index = 0;
            } else {
                this.index++;
            }
            huanse(this);
        }
        if (oEvent.keyCode == 38) {
            if (this.index == undefined || this.index <= 0) {
                this.index = 4;
            } else {
                this.index--;
            }
            huanse(this);
        }
        if (oEvent.keyCode == 13) {
            this.value = gsInnerText(emailLi[this.index]);
            all_email.style.display = 'none';
            this.index = undefined;
        }
    });
    function huanse(_this) {
        for (var i = 0; i < 5; i++) {
            emailLi[i].style.backgroundColor = '#fff';
            emailLi[i].style.color = '#666';
        }
        emailLi[_this.index].style.backgroundColor = '#e5edf2';
        emailLi[_this.index].style.color = '#369';
    }

    function check_email() {
        if (/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(trim(kuang[3].value)))return true;
    }

    //验证手机
    var info_shouji = getClass(register, 'info-shouji')[0], error_shouji = getClass(register, 'error-shouji')[0], succ_shouji = getClass(register, 'succ-shouji')[0];
    addEvent(kuang[4], 'focus', function () {
        info_shouji.style.display = 'block';
        error_shouji.style.display = 'none';
        succ_shouji.style.display = 'none';
    });
    addEvent(kuang[4], 'blur', function () {
        if (trim(this.value) == '') {
            info_shouji.style.display = 'none';
        } else if (check_shouji()) {
            info_shouji.style.display = 'none';
            error_shouji.style.display = 'none';
            succ_shouji.style.display = 'block';
        } else {
            info_shouji.style.display = 'none';
            error_shouji.style.display = 'block';
            succ_shouji.style.display = 'none';
        }
    });
    function check_shouji() {
        if (/^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/.test(trim(kuang[4].value)))return true;
    }

    //短信验证码
    var error_yanzhengma = getClass(register, 'error-yanzhengma')[0];

    function check_yanzhengma() {
        if (!check_shouji() && trim(kuang[5].value) == '') {
            error_yanzhengma.style.display = 'block';
            return false;
        }
    }

    //表单检查
    addEvent(getId("tijiao"), 'click', function () {
        var flag = true;
        if (!check_user()) {
            error_user.style.display = 'block';
            flag = false;
        }
        if (!check_pass()) {
            error_pass.style.display = 'block';
            flag = false;
        }
        if (!check_notpass()) {
            error_notpass.style.display = 'block';
            flag = false;
        }
        if (!check_email()) {
            error_email.style.display = 'block';
            flag = false;
        }
        if (!check_birth()) {
            error_birth.style.display = 'block';
            flag = false;
        }
        if (!check_shouji()) {
            error_shouji.style.display = 'block';
            flag = false;
        }
        if (check_yanzhengma())flag = false;
        if (getClass(register, 'checkBox')[0].checked == false)flag = false;

        var loading = getClass(document, 'loading');
        if (flag) {
            var _this = this;
            _this.disabled = true;
            gsstyle(loading[0], 'display', 'block');
            ajax({
                method: 'post',
                url: 'add.php',
                data: serialize(document.forms['form']),
                success: function () {
                    gsstyle(loading[0], 'display', 'none');
                    gsstyle(loading[1], 'display', 'block');
                    setTimeout(function () {
                        location.href = '../index.html';
                    }, 1000);
                    setCookie('user', kuang[0].value, 15, '/');
                },
                async: true
            });
        }
    });
});