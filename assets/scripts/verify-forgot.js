$(document).ready(function () {
    const isForgotPasswordPage = $('[data-name="SelfAsserted"]');

    if (!isForgotPasswordPage.length) {
        return;
    }

    function waitForElementVisible(selector) {
        return new Promise(resolve => {
            if ($(selector).is(':visible')) {
                resolve();
                return;
            }

            const observer = new MutationObserver((mutations, obs) => {
                if ($(selector).is(':visible')) {
                    obs.disconnect();
                    resolve();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class']
            });
        });
    }

    function waitForButtonEnabled(buttonId) {
        return new Promise(resolve => {
            const button = document.getElementById(buttonId);

            if (button && button.getAttribute('aria-disabled') === 'false') {
                resolve(button);
                return;
            }

            const observer = new MutationObserver((mutations, obs) => {
                const button = document.getElementById(buttonId);
                if (button && button.getAttribute('aria-disabled') === 'false') {
                    obs.disconnect();
                    resolve(button);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['aria-disabled']
            });
        });
    }

    $('#emailVerificationControl_but_send_code').on('click', function () {
        $('.email_li').addClass('none');
        $('.intro').addClass('none');

        waitForElementVisible('.emailVerificationCode_li');
    });

    $('#emailVerificationControl_but_verify_code').on('click', async function () {
        await waitForElementVisible('#emailVerificationControl_but_change_claims');

        $('.emailVerificationCode_li').addClass('none');
        const rePassword = $('.reenterPassword_li');
        const newPassword = $('.newPassword_li');
        $('#emailVerificationControl').addClass('none');

        if (rePassword.length && newPassword.length) {
            rePassword.show();
            newPassword.show();
            $('#attributeVerification > .buttons').addClass('flex');
        }
    });

    // waitForButtonEnabled('continue').then(button => {
    //     button.click();
    // });
});