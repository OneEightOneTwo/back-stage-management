window.onload = () => {
    $(() => {
        $('#loginBtn').click(() => {
            if ($('#user').val() && $('#psw').val() && $('#check').val()) {
                let val2 = '';
                for (let i = 0; i < 4; i++) {
                    let sum = $('.s2 font').eq(i).html();
                    val2 += sum;
                }
                if ($('#check').val() == val2) {
                    let user = $('#user').val();
                    let psw = $('#psw').val();
            $.ajax({
                type: "POST",
                url: 'http://localhost:233/sign/login',
                data: {
                'name': user,
                'password': psw
                },
                success(str) {
                    if (str.data.length != 0) {
                        // location.href = 'goodlist.html';
                        localStorage.setItem("token", str.token);
                    } else {
                        $('.inf1').html('您输入的用户名或密码错误');
                    }
                    console.log(str);
                }
            });
                } else {
                    $('.inf1').html('您输入的验证码错误');
                }

            } else {
                $('.inf1').html('以上各项不能为空');
            }
        })

    })
}