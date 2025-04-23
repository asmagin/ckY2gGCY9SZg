$(document).ready(function () {
    const isForgotPasswordPage = $('[data-name="SelfAsserted"]');

    if(!isForgotPasswordPage.length) {
        return
    }

    $('#emailVerificationControl_but_send_code').on('click', function () {
        const checkInterval = setInterval(function () {
            if ($('.VerificationCode').is(':visible')) {
                $('#email').closest('.attrEntry').hide();
                clearInterval(checkInterval);
            }
        }, 50);
    });
});
