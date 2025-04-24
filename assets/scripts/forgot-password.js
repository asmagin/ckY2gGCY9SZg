$(document).ready(function () {
    const isForgotPasswordPage = $('[data-name="SelfAsserted"]');

    if(!isForgotPasswordPage.length) {
        return
    }

    $('#emailVerificationControl_but_send_code').on('click', function () {
        const checkInterval = setInterval(function () {
            $('.email_li').addClass('none')
            $('.intro').addClass('none')
            if ($('.emailVerificationCode_li').is(':visible')) {
                clearInterval(checkInterval);
            }
        }, 50);
    });

    $('#emailVerificationControl_but_verify_code').on('click', function () {
        const checkInterval = setInterval(function () {
            $('#emailVerificationControl').addClass('none')
            if ($('#emailVerificationControl_but_change_claims').is(':visible')) {
                const rePassword = $('.reenterPassword_li')
                const newPassword = $('.newPassword_li')

                if(rePassword.length && newPassword.length) {
                    rePassword.show()
                    newPassword.show()
                    $('#attributeVerification > .buttons').addClass('flex');
                }
                clearInterval(checkInterval);
            }
        }, 50);
    })
});
