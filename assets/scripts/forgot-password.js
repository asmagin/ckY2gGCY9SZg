$(document).ready(function () {
    const isForgotPasswordPage = $('[data-name="SelfAsserted"]');
    if (!isForgotPasswordPage.length) return;

    $('#emailVerificationControl_but_send_code').one('click', function () {
        setTimeout(() => {
            if ($('.emailVerificationCode_li').is(':visible')) {
                requestAnimationFrame(() => {
                    $('.email_li').hide();
                    $('.intro').hide();
                });
            }
        }, 0);
    });

    $('#emailVerificationControl_but_verify_code').one('click', function () {
        setTimeout(() => {
            if ($('#emailVerificationControl_but_change_claims').is(':visible')) {
                const rePassword = $('.reenterPassword_li');
                const newPassword = $('.newPassword_li');

                if (rePassword.length && newPassword.length) {
                    requestAnimationFrame(() => {
                        $('#emailVerificationControl').hide();
                        rePassword.show();
                        newPassword.show();
                        $('#attributeVerification > .buttons').addClass('flex');
                    });
                }
            }
        }, 0);
    });
});
