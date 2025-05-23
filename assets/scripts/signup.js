$(document).ready(function () {
    const isForgotPasswordPage = $('[data-name="SelfAsserted"]');

    if(!isForgotPasswordPage.length) {
        return
    }

    $('#emailVerificationControl_but_send_code').on('click', function () {
        const checkInterval = setInterval(function () {
            if ($('.emailVerificationCode_li').is(':visible')) {
                $('.email_li').hide();
                $('.intro').hide();
                clearInterval(checkInterval);
            }
        }, 50);
    });

    $('#emailVerificationControl_but_verify_code').on('click', function () {
        const checkInterval = setInterval(function () {
            if ($('#emailVerificationControl_but_change_claims').is(':visible')) {
                $('#attributeVerification > .buttons').show();
                clearInterval(checkInterval);
            }
        }, 50);
    })
});
