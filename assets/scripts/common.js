function addEyeIconIntoPasswordField() {
    $('input[type="password"]').each(function() {
        const $passwordInput = $(this);

        if ($passwordInput.data('eyeAttached')) return;

        const $wrapperItem = $passwordInput.closest('.entry-item, .attrEntry');

        if ($wrapperItem.length === 0) return;

        const $wrapper = $('<div>').css({
            position: 'relative',
            display: 'inline-block',
            width: '100%'
        });

        $passwordInput.before($wrapper);
        $wrapper.append($passwordInput);

        $passwordInput.css('paddingRight', '36px');

        const $eyeIcon = $('<img>', {
            src: 'https://asmagin.github.io/ckY2gGCY9SZg/assets/images/eye.svg',
            alt: 'Toggle visibility'
        }).css({
            position: 'absolute',
            right: '10px',
            top: '50%',
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
                'https://asmagin.github.io/ckY2gGCY9SZg/assets/images/eye-off.svg' : 
                'https://asmagin.github.io/ckY2gGCY9SZg/assets/images/eye.svg'
            );
        });

        $wrapper.append($eyeIcon);
        $passwordInput.data('eyeAttached', 'true');
    });
}


$(document).ready(function () {
    addEyeIconIntoPasswordField()
})
