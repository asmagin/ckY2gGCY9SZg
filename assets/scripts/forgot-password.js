$(document).ready(function () {


    const isForgotPasswordPage = $('[data-name="SelfAsserted"]');

    if(!isForgotPasswordPage.length) {
        return
    }

    $('#emailVerificationControl_but_send_code').on('click', function () {
        if (!$('.VerificationCode').is(':visible')) {
            console.log('VerificationCode is hidden');
        } else {
            console.log('VerificationCode is visible');
        }
    });
});
