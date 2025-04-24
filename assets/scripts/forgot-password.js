$(document).ready(function () {
    const isForgotPasswordPage = $('[data-name="SelfAsserted"]');

    if(!isForgotPasswordPage.length) {
        return
    }

    $('#emailVerificationControl_but_send_code').on('click', function () {
        const checkInterval = setInterval(function () {
            if ($('.emailVerificationCode_li').is(':visible')) {
                $('.email_li').addClass('none')
                $('.intro').addClass('none')
                clearInterval(checkInterval);
            }
        }, 500);
    });

    $('#emailVerificationControl_but_verify_code').on('click', function () {
        const checkInterval = setInterval(function () {
            if ($('#emailVerificationControl_but_change_claims').is(':visible')) {
                const rePassword = $('.reenterPassword_li')
                const newPassword = $('.newPassword_li')
                $('#emailVerificationControl').addClass('none')

                if(rePassword.length && newPassword.length) {
                    rePassword.show()
                    newPassword.show()
                    $('#attributeVerification > .buttons').addClass('flex');
                }
                clearInterval(checkInterval);
            }
        }, 500);
    })
});
