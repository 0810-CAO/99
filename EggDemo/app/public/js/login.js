$(function () {
    /*动态获取csrfToken*/
    function getCookie(key) {
        // console.log(document.cookie);
        var res = document.cookie.split(";");
        // console.log(res);
        for(var i = 0; i < res.length; i++){
            // console.log(res[i]);
            var temp = res[i].split("=");
            // console.log(temp);
            if(temp[0].trim() === key){
                return temp[1];
            }
        }
    }
    let csrftoken = getCookie('csrfToken');
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    /*动态设置csrfToken*/
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader('x-csrf-token', csrftoken);
            }
        },
    });

    // 提交前校验
    $("input[type='submit']").click(function (event) {
        if(!$('#userName').val() || !$('#password')){
            alert('请录入完整信息');
        }else{
            const username = $('#userName').val();
            const password = $('#password').val();
            $.post("/api/user/login",
                {username:username, password:password});
        }
        event.preventDefault();
    });
});