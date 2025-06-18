$(document).ready(function () {
    window.CONTENT.verifying_blurb = "";

    function createBackButton() {
        const backButton = $('<div>', {
            class: 'back-button',
            css: {
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                marginBottom: '15px'
            }
        });

        const svgIcon = $('<img>', {
            src: 'https://asmagin.github.io/ckY2gGCY9SZg/assets/images/left-icon.svg',
            alt: 'Back',
            css: {
                width: '14px',
                height: '20px',
                marginRight: '8px'
            }
        });

        const label = $('<span>', {
            text: 'Back',
            css: {
                fontWeight: '500'
            }
        });

        backButton.append(svgIcon, label);

        backButton.on('click', function() {
            window.history.back();
        });

        return backButton;
    }

    $('#api').prepend(createBackButton());


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

    $('#emailVerificationControl_but_send_code').on('click', async function () {
        await waitForElementVisible('.verificationCode_li');
        $('.email_li').addClass('none');
        $('.intro').addClass('none');
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

    waitForButtonEnabled('continue').then(button => {
        $('#verifying_blurb').addClass('working')
        setTimeout(() => {
            button.click()
        }, 0)
    });

    waitForElementVisible('#emailVerificationControl_but_send_code').then(() => {
        $('#emailVerificationControl_but_send_code').click()
    })
});
