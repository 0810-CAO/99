// 进度条与音乐的同步， 首先是通过音乐播放的原生属性duration等来获取当前播放的进度
// 将其总时长与current返回后传入progress中利用函数中的百分比来设置宽度
// 而当点击进度条或者移动进度条时， 在index.js中初始化进度条时调用progress中click、move的监听函数，利用鼠标的位置差来设置显示宽度并将所占总
// 长度的百分比返回， 再次将该值作为参数在player.js中设置audio的进度。注意需要对进度条滑动禁止自动播放时的移动
$(function() {
    // 自定义滚动条
    $(".content_list").mCustomScrollbar();
    var $audio = $("audio");
    var player = new Player($audio);
    var progress;
    var voiceProgress;
    var lyric;
    // 加载歌曲列表
    getPlayerList();

    function getPlayerList() {
        $.ajax({
            url: "./source/musiclist.json",
            dataType: "json",
            success: function(data) {
                // 将data数据传到player类中
                player.musicList = data;
                // 遍历获取到的数据, 创建每一条音乐
                var $musicList = $(".content_list ul");
                $.each(data, function(index, ele) {
                    var $item = crateMusicItem(index, ele);
                    $musicList.append($item);
                });
                initMusicInfo(data[0]);
                initMusicLyric(data[0]);
            },
            error: function(e) {
                console.log(e);
            }
        });
    }
    // 创建一条音乐
    function crateMusicItem(index, music) {
        var $item = $("" +
            "<li class=\"list_music\">\n" +
            "<div class=\"list_check\"><i></i></div>\n" +
            "<div class=\"list_number\">" + (index + 1) + "</div>\n" +
            "<div class=\"list_name\">" + music.name + "" +
            "     <div class=\"list_menu\">\n" +
            "          <a href=\"javascript:;\" title=\"播放\" class='list_menu_play'></a>\n" +
            "          <a href=\"javascript:;\" title=\"添加\"></a>\n" +
            "          <a href=\"javascript:;\" title=\"下载\"></a>\n" +
            "          <a href=\"javascript:;\" title=\"分享\"></a>\n" +
            "     </div>\n" +
            "</div>\n" +
            "<div class=\"list_singer\">" + music.singer + "</div>\n" +
            "<div class=\"list_time\">\n" +
            "     <span>" + music.time + "</span>\n" +
            "     <a href=\"javascript:;\" title=\"删除\" class='list_menu_del'></a>\n" +
            "</div>\n" +
            "</li>");
        // 绑定到原生的li中， 即list_music, 每次点击都可以获取index和music信息
        $item.get(0).index = index;
        $item.get(0).music = music;
        return $item;
    }
    // 初始化歌曲信息
    function initMusicInfo(music) {
        // 给页面中需要切换的元素赋值
        $(".song_info_pic img").attr("src", music.cover);
        $(".song_info_name a").text(music.name);
        $(".song_info_singer a").text(music.singer);
        $(".song_info_ablum a").text(music.album);
        $(".music_progress_name").text(music.name + " / " + music.singer);
        $(".music_progress_time").text("00:00 / " + music.time);
        $(".mask_bg").css("background", "url('" + music.cover + "')");
    }

    // 初始化歌词信息
    function initMusicLyric(music) {
        lyric = new Lyric(music.link_lrc);
        var $lryicContainer = $(".song_lyric");
        // 清空上一首音乐的歌词
        $lryicContainer.html("");
        lyric.loadLyric(function() {
            // 创建歌词列表
            $.each(lyric.lyrics, function(index, ele) {
                var $item = $("<li>" + ele + "</li>");
                $lryicContainer.append($item);
            });
        });
    }

    // 初始化进度条
    initProgress();

    function initProgress() {
        var $progressBar = $(".music_progress_bar");
        var $progressLine = $(".music_progress_line");
        var $progressDot = $(".music_progress_dot");
        progress = new Progress($progressBar, $progressLine, $progressDot);
        progress.progressClick(function(value) {
            player.musicSeekTo(value);
        });
        progress.progressMove(function(value) {
            player.musicSeekTo(value);
        });
        var $voiceBar = $(".music_voice_bar");
        var $voiceLine = $(".music_voice_line");
        var $voiceDot = $(".music_voice_dot");
        voiceProgress = new Progress($voiceBar, $voiceLine, $voiceDot);
        voiceProgress.progressClick(function(value) {
            player.musicVoiceSeekTo(value);
        });
        voiceProgress.progressMove(function(value) {
            player.musicVoiceSeekTo(value);
        });
    }

    // 初始化事件监听
    initEvents();

    function initEvents() {
        // 监听歌曲的移入移出事件
        $(".content_list").delegate(".list_music", "mouseenter", function() {
            // 显示子菜单
            $(this).find(".list_menu").stop().fadeIn(100);
            $(this).find(".list_time a").stop().fadeIn(100);
            // 隐藏时长
            $(this).find(".list_time span").stop().fadeOut(100);
        });
        $(".content_list").delegate(".list_music", "mouseleave", function() {
            // 隐藏子菜单
            $(this).find(".list_menu").stop().fadeOut(100);
            $(this).find(".list_time a").stop().fadeOut(100);
            // 显示时长
            $(this).find(".list_time span").stop().fadeIn(100);
        });
        // 监听复选框的点击事件
        $(".content_list").delegate(".list_check", "click", function() {
            $(this).toggleClass("list_checked");
            if ($(".list_check").eq(0).hasClass("list_checked")) {
                $(this).parents("ul").find(".list_check").addClass("list_checked")
            }
            if (!$(this).hasClass("list_checked")) {
                $(".list_title>.list_check").removeClass("list_checked")
            }
        });
        // 添加子菜单播放按钮的监听
        var $musicPlay = $(".music_play");
        $(".content_list").delegate(".list_menu_play", "click", function() {
            changeAudio($(this));
        });
        //顶部选择删除
        $(".delete").click(function() {
            var $List = $(".content_list ul li");
            var arr = new Array()
            $.each($List, function(index, ele) {
                if ($(this).find(".list_check").hasClass("list_checked")) {
                    arr.push($(this))
                }
            });
            if (arr.length != 0) {
                if (confirm("确认要删除歌曲？")) {
                    $.each(arr, function(index, ele) {
                        $(this).remove()
                        player.changeMusic($(this).get(0).index)
                    });
                }
                $(".list_music").each(function(index, ele) {
                    // 原生的li索引排序
                    ele.index = index;
                    $(ele).find(".list_number").text(index + 1);
                });
                $(".music_next").trigger("click");
            } else {
                alert("请选择操作的单曲")
            }
        });
        //顶部删除列表
        $(".deleteMenu").click(function() {
            if (confirm("确认要清空列表？")) {
                if ($(".music_play").hasClass("music_play2"))
                    $(".music_play").trigger("click")
                var $list = $(".content_list ul li");
                $.each($list, function(index, ele) {
                    $(this).remove()
                    player.changeMusic($(this).get(0).index)
                });
            }
        })
        var index = 0
            // 播放方式的监听
        $(".music_mode").click(function() {
            index++
            index %= 4
            if (index == 0) {
                $(this).removeClass("music_mode4")
                $(this).addClass("music_mode")
            }
            if (index == 1) {
                $(this).addClass("music_mode2")
            }
            if (index == 2) {
                $(this).removeClass("music_mode2")
                $(this).addClass("music_mode3")
            }
            if (index == 3) {
                $(this).removeClass("music_mode3")
                $(this).addClass("music_mode4")
            }
        });
        $(".music_only").click(function() {
            $(this).toggleClass("music_only2");
            if ($(this).hasClass("music_only2")) {
                $(this).parents("body").find(".content_left").hide()
                $(this).parents("body").find(".song_info").hide()
                $(this).parents("body").find(".song_lyric_container").toggleClass("song_lyric_container2")
            } else {
                $(this).parents("body").find(".content_left").show()
                $(this).parents("body").find(".song_info").show()
                $(this).parents("body").find(".song_lyric_container").toggleClass("song_lyric_container2")
            }
        });
        $(".music_fav").click(function() {
            $(this).toggleClass("music_fav2");
        });
        // 监听底部控制区域播放按钮的点击
        $musicPlay.click(function() {
            // 判断有没有播放过音乐
            if (player.currentIndex == -1) {
                // 没有播放过音乐
                $(".list_music").eq(0).find(".list_menu_play").trigger("click");
            } else {
                // 已经播放过音乐
                $(".list_music").eq(player.currentIndex).find(".list_menu_play").trigger("click");
            }
        });

        // 监听底部控制区域上一首按钮的点击
        $(".music_pre").click(function() {
            if ($(".music_mode").hasClass("music_mode3")) {
                player.musicRandom(function(length) {
                    var $now = $(".list_menu_play").eq(length);
                    changeAudio($now);
                })
            } else {
                $(".list_music").eq(player.preIndex()).find(".list_menu_play").trigger("click");
            }
        });

        // 监听底部控制区域下一首按钮的点击
        $(".music_next").click(function() {
            if ($(".music_mode").hasClass("music_mode3")) {
                player.musicRandom(function(length) {
                    var $now = $(".list_menu_play").eq(length);
                    changeAudio($now);
                })
            } else {
                $(".list_music").eq(player.nextIndex()).find(".list_menu_play").trigger("click");
            }
        });

        // 监听删除按钮的点击
        $(".content_list").delegate(".list_menu_del", "click", function() {
            // 找到被点击的音乐
            var $item = $(this).parents(".list_music");
            // 判断当前删除的是否是正在播放的
            if ($item.get(0).index == player.currentIndex) {
                $(".music_next").trigger("click");
            }
            // 删除页面中的音乐数据
            $item.remove();
            // 删除缓存中的数据
            player.changeMusic($item.get(0).index);
            // 重新排序
            $(".list_music").each(function(index, ele) {
                // 原生的li索引排序
                ele.index = index;
                $(ele).find(".list_number").text(index + 1);
            });
        });

        // 监听播放的进度
        player.musicTimeUpdate(function(currentTime, duration, timeStr) {
            // 同步时间
            $(".music_progress_time").text(timeStr);
            // 同步进度条
            // 计算播放比例
            var value = currentTime / duration * 100;
            if (value == 100) {
                if ($(".music_mode").hasClass("music_mode4")) {
                    player.musicCircle();
                } else if ($(".music_mode").hasClass("music_mode3")) {
                    player.musicRandom(function(length) {
                        var $now = $(".list_menu_play").eq(length);
                        changeAudio($now);
                    })
                } else {
                    $(".music_next").trigger("click");
                }
            }
            progress.setProgress(value);
            // 实现歌词同步
            var index = lyric.currentIndex(currentTime);
            var $item = $(".song_lyric li").eq(index);
            $item.addClass("cur");
            $item.siblings().removeClass("cur");
            // 实现歌词滚动
            if (index <= 2)
                return;
            if ($(".song_lyric_container").hasClass("song_lyric_container2")) {
                $(".song_lyric").css({
                    // 定位歌词在第二个
                    marginTop: (-index + 2) * 48
                });
            } else {
                $(".song_lyric").css({
                    // 定位歌词在第二个
                    marginTop: (-index + 2) * 30
                });
            }
        });
        // 选择音乐列表播放
        function changeAudio(index) {
            var $item = index.parents(".list_music");
            // 切换播放图标
            index.toggleClass("list_menu_play2");
            // 复原其它的播放图标
            $item.siblings().find(".list_menu_play").removeClass("list_menu_play2");
            // 同步底部播放按钮
            if (index.hasClass("list_menu_play2")) {
                // 当前子菜单的播放按钮是播放状态
                $musicPlay.addClass("music_play2");
                // 让文字高亮
                $item.find("div").css("color", "#fff");
                $item.siblings().find("div").css("color", "rgba(255,255,255,0.5)");
            } else {
                // 当前子菜单的播放按钮不是播放状态
                $musicPlay.removeClass("music_play2");
                // 让文字不高亮
                $item.find("div").css("color", "rgba(255,255,255,0.5)");
            }
            // 切换序号的状态
            $item.find(".list_number").toggleClass("list_number2");
            $item.siblings().find(".list_number").removeClass("list_number2");
            // 播放音乐，点击后可以拿到原生li中数据并调用player中playMusic函数
            player.playMusic($item.get(0).index, $item.get(0).music);
            // 切换歌曲信息
            initMusicInfo($item.get(0).music);
            // 切换歌词信息
            initMusicLyric($item.get(0).music);
        }
        // 监听声音按钮的点击
        $(".music_voice_icon").click(function() {
            // 图标切换
            $(this).toggleClass("music_voice_icon2");
            // 声音切换
            if ($(this).hasClass("music_voice_icon2")) {
                // 变为没有声音
                player.musicVoiceSeekTo(0);
            } else {
                // 变为有声音
                player.musicVoiceSeekTo(1);
            }
        });
    }
});