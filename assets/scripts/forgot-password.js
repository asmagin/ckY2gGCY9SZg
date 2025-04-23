$(document).ready(function () {
    const isForgotPasswordPage = $('[data-name="SelfAsserted"]');

    if(!isForgotPasswordPage.length) {
        return
    }

    $('#emailVerificationControl_but_send_code').on('click', function () {
        const checkInterval = setInterval(function () {
            if ($('.emailVerificationCode_li').is(':visible')) {
                $('.email_li').hide();
                clearInterval(checkInterval);
            }
        }, 50);
    });
});
