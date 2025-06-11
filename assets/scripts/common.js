function addEyeIconIntoPasswordField() {
    const passwordInputs = document.querySelectorAll('input[type="password"]');

    passwordInputs.forEach((passwordInput) => {
        if (passwordInput.dataset.eyeAttached) return;

        const entryItem = passwordInput.closest('.entry-item');
        const attrEntry = passwordInput.closest('.attrEntry');
        const wrapperItem = entryItem || attrEntry;

        if (!wrapperItem) return;

        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        wrapper.style.width = '100%';

        passwordInput.parentNode.insertBefore(wrapper, passwordInput);
        wrapper.appendChild(passwordInput);

        passwordInput.style.paddingRight = '30px';

        const eyeIcon = document.createElement('span');
        eyeIcon.className = 'fa-solid fa-eye';
        eyeIcon.style.position = 'absolute';
        eyeIcon.style.right = '10px';
        eyeIcon.style.top = '50%';
        eyeIcon.style.transform = 'translateY(-50%)';
        eyeIcon.style.cursor = 'pointer';
        eyeIcon.style.userSelect = 'none';
        eyeIcon.style.fontSize = '16px';
        eyeIcon.style.zIndex = '2';

        let visible = false;
        eyeIcon.addEventListener('click', () => {
            visible = !visible;
            const isHidden = passwordInput.type === 'password';
            passwordInput.type = isHidden ? 'text' : 'password';
            eyeIcon.className = visible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
        });

        wrapper.appendChild(eyeIcon);

        passwordInput.dataset.eyeAttached = 'true';
    });
}


$(document).ready(function () {
    addEyeIconIntoPasswordField()
})