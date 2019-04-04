$(() => {
    $('#loginBtn').click(() => {
        // if ($('#user').val() && $('#psw').val() && $('#check').val()) {
        //     let val2 = '';
        //     for (let i = 0; i < 4; i++) {
        //         let sum = $('.s2 font').eq(i).html();
        //         val2 += sum;
        //     }
        // if ($('#check').val() == val2) {
        let user = $('#user').val();
        let psw = $('#psw').val();

        $.ajax({
            type: 'POST',
            url: 'http://localhost:1777/sign/login',
            data: {
                'name': user,
                'password': psw
            }
        }).done((data) => {
            if (data.data.data.length == 0 ){
                $('.inf1').html('您输入的用户名或密码错误');
            } else {
                var list = data.data.data
                console.log(list)
                $.each(list, function (i, item) {
                    localStorage.setItem("imgurl", item.tx);
                    localStorage.setItem("name", item.name);
                })
                location.href = '../html/goodlist.html';
                localStorage.setItem("token", data.token);
            }
        })
        // } else {
        //     $('.inf1').html('您输入的验证码错误');
        // }

        // } else {
        //     $('.inf1').html('以上各项不能为空');
        // }
    })

})