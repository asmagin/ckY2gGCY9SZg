alert('Script working')
document.addEventListener('DOMContentLoaded', function () {    // const forgotPassword = document.getElementById('forgotPassword');
    const buttons = document.querySelector('.buttons');
    const forgotPassword = document.getElementById('forgotPassword');

    if (forgotPassword && buttons && buttons.parentNode) {
        buttons.parentNode.insertBefore(forgotPassword, buttons.nextSibling);
        observer.disconnect();
    }
    //
    // const forgotPassword = document.getElementById('forgotPassword');
    // const createAccount = document.getElementById('createAccount');
    //
    // forgotPassword.classList.add('link')
    // forgotPassword.innerHTML = 'Forgot Password?';
    //
    // createAccount.classList.add('link');
    // forgotPassword.innerHTML = 'Sign Up';
    //
    //
    // const wrapper = document.createElement('div');
    // wrapper.className = 'input-wrapper';
    // wrapper.style.textAlign = 'center';
    // wrapper.style.marginTop = '16px';
    //
    // const separator = document.createElement('div');
    // separator.className = 'separator';
    // separator.innerHTML = `<hr />Don’t have an account?<hr />`;
    //
    // wrapper.appendChild(forgotPassword);
    // wrapper.appendChild(separator);
    // wrapper.appendChild(createAccount);

    // const buttons = document.querySelector('.buttons');
    if (buttons && buttons.parentNode) {
        buttons.parentNode.insertBefore(wrapper, buttons.nextSibling);
    }
});
