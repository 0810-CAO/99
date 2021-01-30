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

    let username = '';
    let password = '';
    let gender = $('#gender').val();
    // 用户名校验
    $('#userName').blur(function () {
        let emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        username = this.value;
        if (!emailRegex.test(username)) {
            $('#emailTip').css({display: 'block'});
        }else{
            $('#emailTip').css({display: 'none'});
            // $.post("/api/user/exists",
            //     {username:username} ,
            //     function (result) {
            //         if (result.code !== 200) {
            //             $('#userNameTip').css({display: 'block'});
            //         }else{
            //             $('#userNameTip').css({display: 'none'});
            //         }
            // });
        }
    });
    // 密码校验
    $('#password').blur(function () {
        let pwdRegex = /^[A-Za-z0-9]{6,20}$/;
        password = this.value;
        // if (!pwdRegex.test(this.value)) {
        //     $('#passwordTip').css({display: 'block'});
        // }else{
        //     $('#passwordTip').css({display: 'none'});
        // }
    });
    // 获取性别
    $('#gender').change(function () {
        gender = this.value;
    });
    // 密码校验
    $('#repPwd').blur(function () {
        // if ($('#password').val() !== this.value) {
        //     $('#repetitionTip').css({display: 'block'});
        // }else{
        //     $('#repetitionTip').css({display: 'none'});
        // }
    });
    // 提交前校验
    $("input[type='submit']").click(function (event) {
        if(!$('#userName').val() || !$('#password').val() || !$('#repPwd').val()){
            alert('请录入完整信息');
        }else{
            $.post("/api/user/register",
                {username:username, password:password, gender:gender});
        }
        event.preventDefault();
    });
});