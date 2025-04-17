const observer = new MutationObserver(() => {
    console.log({ working: 1})
    const forgotPassword = document.getElementById('forgotPassword');
    const buttons = document.querySelector('.buttons');

    if (forgotPassword && buttons && buttons.parentNode) {
        buttons.parentNode.insertBefore(forgotPassword, buttons.nextSibling);
        observer.disconnect();
    }
});

observer.observe(document.body, { childList: true, subtree: true });