function getId(id) {
    return document.getElementById(id)
}
function getClass(oParent, sClass) {
    var aEle = oParent.getElementsByTagName("*");
    var aResult = [];
    for (var i = 0; i < aEle.length; i++) {
        if (aEle[i].className.search((new RegExp('(\\s|^)' + sClass + '(\\s|$)'))) > -1) {
            aResult.push(aEle[i])
        }
    }
    return aResult;
}
function hasClass(element, aClass) {
    return !!element.className.match(new RegExp('(\\s|^)' + aClass + '(\\s|$)'))
}
function addClass(element, aClass) {
    if (!hasClass(element, aClass)) {
        element.className += ' ' + aClass
    }
}
function removeClass(element, aClass) {
    if (hasClass(element, aClass)) {
        element.className = element.className.replace(new RegExp('(\\s|^)' + aClass + '(\\s|$)'), ' ')
    }
}
function addEvent(obj, type, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(type, fn, false)
    } else {
        if (!obj.events)obj.events = {};
        if (!obj.events[type]) {
            obj.events[type] = [];
            if (obj['on' + type])obj.events[type][0] = fn;
        } else {
            if (addEvent.equal(obj.events[type], fn) == true)return false;
        }
        obj.events[type][addEvent.ID++] = fn;
        obj['on' + type] = addEvent.exec;
    }
}
addEvent.ID = 1;
addEvent.exec = function (evt) {
    var oEvent = evt || addEvent.fixEvent(window.event);
    var es = this.events[oEvent.type];
    for (var i in es) {
        es[i].call(this, oEvent);
    }
};
addEvent.equal = function (es, fn) {
    for (var i in es) {
        if (es[i] == fn)return true;
    }
    return false;
};
addEvent.fixEvent = function (evt) {
    evt.preventDefault = addEvent.fixEvent.preventDefault;
    evt.stopPropagation = addEvent.fixEvent.stopPropagation;
    return evt;
};
addEvent.fixEvent.preventDefault = function () {
    this.returnValue = false;
};
addEvent.fixEvent.stopPropagation = function () {
    this.cancelBubble = true;
};
function removeEvent(obj, type, fn) {
    if (obj.removeEventListener) {
        obj.removeEventListener(type, fn, false)
    } else {
        for (var i in obj.events[type]) {
            if (obj.events[type][i] == fn) {
                delete obj.events[type][i];
            }
        }
    }
}
function stopBubble(evt) {
    var oEvent = evt || window.event;
    if (oEvent.stopPropagation)
        oEvent.stopPropagation();
    else
        oEvent.cancelBubble = true;
}
function cancelDefault(evt) {
    var oEvent = evt || window.event;
    if (oEvent.preventDefault) {
        oEvent.preventDefault()
    } else {
        oEvent.returnValue = false
    }
}
function getTarget(evt) {		//获取点击对象
    if (evt.target) {
        return evt.target;
    } else if (window.event.srcElement) {
        return window.event.srcElement;
    }
}
function prevIndex(current, parent) {         //当前节点index，父节点
    var length = parent.children.length;
    if (current == 0)return length - 1;
    return parseInt(current) - 1;
}
function nextIndex(current, parent) {
    var length = parent.children.length;
    if (current == length - 1)return 0;
    return parseInt(current) + 1;
}
function select(start, end) {		//设置随机数
    var total = end - start + 1;
    return Math.floor(Math.random() * total + start)
}
function offsetTop(element) {            //检测里面的div距离body上方的距离
    var top = element.offsetTop;
    var parent = element.offsetParent;
    while (parent != null) {
        top += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return top;
}
function getInner() {            //兼容获得页面的宽高度
    if (document.documentElement.clientWidth) {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    } else {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }
}
function getScroll() {           //获得滚动条向上向左的距离
    return {
        left: document.documentElement.scrollLeft + document.body.scrollLeft,
        top: document.documentElement.scrollTop + document.body.scrollTop
    };
}
function gsInnerText(id, text) {		//兼容显示设置innerText
    switch (arguments.length) {
        case 1:
            if (typeof id.textContent == 'string') {
                return id.textContent;
            } else {
                return id.innerText;
            }
            break;
        case 2:
            if (typeof id.textContent == 'string') {
                return id.textContent = text;
            } else {
                return id.innerText = text;
            }
    }
}
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
function scrollTop() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}
function setCookie(name, value, iday, path, domain, secure) {
    var odate = new Date();
    odate.setDate(odate.getDate() + iday);
    var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';expires=' + odate;
    if (path) {
        cookieText += ';path=' + path;
    }
    if (domain) {
        cookieText += ';domain=' + domain;
    }
    if (secure) {
        cookieText += ';secure';
    }
    document.cookie = cookieText;
}
function getCookie(name) {
    var arr = document.cookie.split(';');
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=');
        if (arr2[0] == encodeURIComponent(name)) {
            return decodeURIComponent(arr2[1]);
        }
    }
    return '';
}
function removeCookie(name, path, domain, secure) {
    setCookie(decodeURIComponent(name), 1, -1, path, domain, secure);
}
function inArray(array, value) {      //value是否存在array数组中
    for (var i in array) {
        if (array[i] === value)return true
    }
    return false;
}
function gsstyle(obj, name, value) {
    switch (arguments.length) {
        case 2:
            if (typeof arguments[1] == "object") {
                for (var i in name) i == "opacity" ? (obj.style["filter"] = "alpha(opacity=" + name[i] + ")", obj.style[i] = name[i] / 100) : obj.style[i] = name[i];
            } else {
                return obj.currentStyle ? obj.currentStyle[name] : getComputedStyle(obj, null)[name];
            }
            break;
        case 3:
            name == "opacity" ? (obj.style["filter"] = "alpha(opacity=" + value + ")", obj.style[name] = value / 100) : obj.style[name] = value;
    }
}
function yundong(obj, json, end) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var bstop = true;     //假设所有动作都到了
        for (var attr in json) {
            var cur = 0;
            if (attr == 'opacity') {
                cur = Math.round(parseFloat(gsstyle(obj, attr)) * 100);
            } else {
                cur = parseInt(gsstyle(obj, attr));
            }
            var speed = (json[attr] - cur) / 6;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (cur != json[attr]) {
                bstop = false
            }
            if (attr == 'opacity') {
                obj.style.filter = "alpha(opacity:'+(cur+speed)+')";
                obj.style.opacity = (cur + speed) / 100;
            } else {
                obj.style[attr] = cur + speed + "px";
            }
        }
        if (bstop) {
            clearInterval(obj.timer);
            if (end) {
                end
            }
        }
    }, 30)
}
function ajax(obj) {
    var xhr = (function () {
        if (typeof XMLHttpRequest != 'undefined') {
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject != 'undefined') {
            var version = [
                'MSXML2.XMLHttp.6.0',
                'MSXML2.XMLHttp.3.0',
                'MSXML2.XMLHttp'
            ];
            for (var i = 0; version.length; i++) {
                try {
                    return new ActiveXObject(version[i])
                }
                catch (e) {
                    //跳过
                }
            }
        } else {
            throw new Error("浏览器不支持XHR对象!")
        }
    })();
    obj.url = obj.url + '?rand=' + Math.random();
    obj.data = (function (data) {
        var arr = [];
        for (var i in data) {
            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
        }
        return arr.join('&');
    })(obj.data);
    if (obj.method === 'get')obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data; //get方式的数据加在url后,多数情况用get，相当于post中的obj.send(obj.data)
    if (obj.async) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4)callback();
        }
    }
    xhr.open(obj.method, obj.url, obj.async);
    if (obj.method === 'post') {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");      //post方式模拟表单提交需要设置请求头
        xhr.send(obj.data);
    } else {
        xhr.send(null);         //get方法写null
    }
    if (!obj.async)callback();
    function callback() {
        if (xhr.status == 200) {
            obj.success(xhr.responseText);     //回调传递参数
        } else {
            alert('错误代号' + xhr.status + '错误信息' + xhr.statusText)
        }
    }
}
function serialize(form) {
    var parts = [];
    for (var i = 0; i < form.elements.length; i++) {
        var filed = form.elements[i];
        switch (filed.type) {
            case undefined:
            case 'file':
            case 'submit':
            case 'reset':
            case 'button':
            case 'checkbox':
                break;
            case 'select-one' :
            case 'select-multiple' :
                for (var j = 0; j < filed.options.length; j++) {
                    var option = filed.options[j];
                    if (option.selected) {
                        var optValue = '';
                        if (option.hasAttribute) {
                            optValue = option.hasAttribute('value') ? option.value : option.text;
                        } else {
                            optValue = option.attributes['value'].specified ? option.value : option.text;
                        }
                        parts.push(filed.name + '=' + optValue);
                    }
                }
                break;
            case 'radio':
                if (filed.checked)parts[filed.name] = filed.value;
                break;
            default:
                parts.push(filed.name + '=' + optValue);
        }
    }
    return parts;
}
function addDomLoaded(fn) {         //兼容现代DOM加载
    var isReady = false;
    var timer = null;

    function doReady() {
        if (isReady) return;
        isReady = true;
        if (timer) clearInterval(timer);
        fn();
    }

    if (document.addEventListener) {
        addEvent(document, 'DOMContentLoaded', function () {
            doReady();
            removeEvent(document, 'DOMContentLoaded', arguments.callee);
        });
    } else {
        timer = setInterval(function () {
            try {
                document.documentElement.doScroll('left');
                doReady();
            } catch (ex) {
            }
        });
    }
}