window.onload = function() {
    // 轮播图
    var imglist = document.querySelector(".swiper-container>.imglist")
    var prev = document.querySelector(".swiper-container>.prev")
    var next = document.querySelector(".swiper-container>.next")
    var point = document.querySelectorAll(".swiper-container>.doc>a")
        // 底部视频播放
    var show = document.querySelectorAll(".video-list>li>a")
    var mask = document.querySelectorAll("div")
    var del = document.querySelectorAll(".box-bd>.video-list .video-control>.ctrl-info>.del")
        // 闪购计时器
    var count = document.querySelector(".home-flashsale>.countdown")
    var round = document.querySelector(".home-flashsale>.round>span")
        //侧边工具栏
    var tool = document.querySelectorAll(".home-tool-bar a")
        //图片控制显示按钮
    var timer;
    var index = 0;
    var date = 0
        // 视频播放

    //加载闪购区域信息
    var ullist = document.querySelector(".flashsale-list>ul")
    var sum = 0
    var quickright = document.querySelector(".page-main .home-flashsale>.box-hd>.dir>.right")
    var quickleft = document.querySelector(".page-main .home-flashsale>.box-hd>.dir>.left")
    quickleft.style.pointerEvents = "none"
    quickDir();

    function quickDir() {
        quickright.onclick = function() {
            sum--
            ullist.style.left = 992 * sum + "px"
            var sumleft = ullist.style.left.substr(0, ullist.style.left.indexOf("p"))
            console.log(sumleft)
            if (sumleft < 0) {
                quickleft.style.pointerEvents = "auto"
            }
            if (sumleft < -1900) {
                quickright.style.pointerEvents = "none"
            }
        }
        quickleft.onclick = function() {
            sum++
            console.log(sum)
            ullist.style.left = 992 * sum + "px"
            var sumleft = ullist.style.left.substr(0, ullist.style.left.indexOf("p"))
            if (sumleft > -1) {
                quickleft.style.pointerEvents = "none"
            } else if (sumleft > -1000) {
                quickright.style.pointerEvents = "auto"
            }
        }
    }
    getquickBuy();

    function getquickBuy() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "goods-info.json", true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function(ev2) {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status >= 200 && xmlhttp.status < 300 ||
                    xmlhttp.status === 304) {
                    var res = JSON.parse(xmlhttp.responseText);
                    // console.log(res)
                    for (var i = 0; i < res.toolList.length; i++) {
                        var li = document.createElement("li")
                        li.innerHTML = '<a>' +
                            '<div class="content">' +
                            '<div class="thumb">' +
                            '<img src="' + (res.toolList[i].imgsrc) + '">' +
                            '</div><h3 class="title ">' + (res.toolList[i].title) + '</h3>' +
                            '<p class="desc ">' + (res.toolList[i].desc) + '</p>' +
                            '<p class="price"><span>' + (res.toolList[i].realprice) + '</span>元<del><span>' + (res.toolList[i].delprice) + '</span>元</del></p>' +
                            '</div></a>'
                        ullist.appendChild(li)
                    }
                } else {
                    console.log("没有接收到服务器返回的数据");
                }
            }
        }
    }

    tool[5].style.marginTop = 15 + "px"
    showTop()

    function showTop() {
        setInterval(function() {
            if (document.documentElement.scrollTop > 613) {
                removeclass(tool[5].childNodes[1], "none")
            } else {
                addclass(tool[5].childNodes[1], "none")
            }
        }, 100)
        tool[5].onclick = function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0
        }
    }
    for (var i = 0; i < show.length; i++) {
        show[i].onclick = function() {
            var c = this.childNodes[3].childNodes
            removeclass(c[1], "none")
            removeclass(c[3], "none")
            changeclass(mask[93], "none")
        }
    }
    for (var j = 0; j < del.length; j++) {
        del[j].onclick = function() {
            addclass(this.parentNode.parentNode, "none")
            this.parentNode.nextElementSibling.pause()
        }
    }
    // 轮播图
    point[index].style.backgroundColor = "white";
    for (var i = 0; i < point.length; i++) {
        point[i].num = i;
        point[i].onclick = function() {
            clearInterval(timer);
            index = this.num;
            a();
            move(imglist, 2000, -1226 * index, "left", function() {
                autoc();
            });
        };
    }
    next.onclick = function() {
        clearInterval(timer);
        index++
        a();
        move(imglist, 2000, -1226 * index, "left", function() {
            autoc();
        });
    }
    prev.onclick = function() {
        clearInterval(timer);
        index--
        if (index > -1) {
            index = index
        } else {
            index = point.length - 1
        }
        a();
        move(imglist, 2000, -1226 * index, "left", function() {
            autoc();
        });
    }
    autoc()

    function a() {
        if (index >= document.querySelectorAll(".swiper-container>.imglist>img").length - 1) {
            index = 0;
            imglist.style.left = 0;
        }
        for (var i = 0; i < point.length; i++) {
            point[i].style.backgroundColor = "";
        }
        point[index].style.backgroundColor = "white";
    }

    function autoc() {
        timer = setInterval(function() {
            index++;
            var img = document.querySelectorAll(".swiper-container>.imglist>img").length;
            index = index % img;
            move(imglist, 2000, -1226 * index, "left", function() {
                a();
            });
        }, 3000);
    }
    // 闪购计时器
    timsum()

    function timsum() {
        setInterval(function() {
            date = new Date()
            var min = count.childNodes[5]
            var second = count.childNodes[9]
            round.innerHTML = changeTime(date).h
            second.innerHTML = changeTime(date).s
            min.innerHTML = changeTime(date).m
        }, 1000)
    }
    // 工具类
    function move(obj, speed, target, attr, callback) {
        clearInterval(obj.timer);
        var current = parseInt(getstyle(obj, attr));
        // 避免考虑方向
        if (current > target) {
            speed = -speed;
        }
        //obj.timer可实现对多个元素同时控制
        obj.timer = setInterval(function() {
            var oldvalue = parseInt(getstyle(obj, attr));
            var newvalue = oldvalue + speed;
            if (speed < 0 && newvalue < target || speed > 0 && newvalue > target) {
                newvalue = target;
            }
            //attr为变量需要使用[]
            obj.style[attr] = newvalue + "px";
            if (newvalue == target) {
                clearInterval(obj.timer);
                callback && callback(); //可用于对元素的宽高，top、left位置阶段性变化
            }
        }, 30);
    }

    function getstyle(obj, name) {
        if (window.getComputedStyle) {
            return getComputedStyle(obj, null)[name];
        } else {
            return obj.currentStyle[name];
        }
    }

    function removeclass(obj, cn) {
        var reg = new RegExp("\\b" + cn + "\\b");
        obj.className = obj.className.replace(reg, "");
    };

    function addclass(obj, cn) {
        if (!hasclass(obj, cn)) {
            obj.className += " " + cn;
        }
    };

    function hasclass(obj, cn) {
        var reg = new RegExp("\\b" + cn + "\\b");
        return reg.test(obj.className);
    };

    function changeclass(obj, cn) {
        if (hasclass(obj, cn)) {
            removeclass(obj, cn);
        } else {
            addclass(obj, cn);
        }
    }

    function changeTime(date) {
        var s = toZero(60 - date.getSeconds())
        var m = toZero(60 - date.getMinutes())
        var h = toZero(date.getHours() + 1)
        return {
            m: m,
            s: s,
            h: h
        }
    }

    function toZero(num) {
        var val = ""
        if (num < 10) {
            val = "0" + num
        } else {
            val = val + num
        }
        return val
    }
}