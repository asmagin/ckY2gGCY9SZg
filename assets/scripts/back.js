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
            marginRight: '4px'
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

$(document).ready(function () {
    $('#api').prepend(createBackButton());
})