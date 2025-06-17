function addEyeIconIntoPasswordField() {
    $('input[type="password"]').each(function() {
        const $passwordInput = $(this);

        if ($passwordInput.data('eyeAttached')) return;

        const $wrapperItem = $passwordInput.closest('.entry-item, .attrEntry');

        if ($wrapperItem.length === 0) return;

        $wrapperItem.css('position', 'relative');

        $passwordInput.css('paddingRight', '36px');

        const $eyeIcon = $('<img>', {
            src: 'https://asmagin.github.io/ckY2gGCY9SZg/assets/images/eye-off.svg',
            alt: 'Toggle visibility'
        }).css({
            position: 'absolute',
            right: '10px',
            bottom: '5px',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            width: '20px',
            height: '20px',
            zIndex: '2'
        });

        let visible = false;

        $eyeIcon.on('click', function() {
            visible = !visible;
            $passwordInput.attr('type', visible ? 'text' : 'password');
            $eyeIcon.attr('src', visible ? 
                'https://asmagin.github.io/ckY2gGCY9SZg/assets/images/eye.svg' :
                'https://asmagin.github.io/ckY2gGCY9SZg/assets/images/eye-off.svg'
            );
        });

        $wrapperItem.append($eyeIcon);
        $passwordInput.data('eyeAttached', 'true');
    });
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

$(document).ready(async function () {
    await waitForElementVisible('input[type="password"]')
    addEyeIconIntoPasswordField()
})
