const config = {
    maxAttempts: 30,
    checkInterval: 10, // ms
    // defaultHeading: "WELCOME BACK!",
    separatorText: "Don't have an account?"
};


function waitForElements() {
    return new Promise((resolve, reject) => {
        let attempts = 0;

        function checkElements() {

            const elements = {
                forgotPassword: document.getElementById('ForgotPasswordExchange'),
                createAccount: document.getElementById('SignUpExchange'),
                form: document.getElementById('localAccountForm'),
                isLoginPage: document.querySelector('#api.signIn'),
                heading: document.querySelector('.heading h1'),
                divider: document.querySelector('.divider'),
                socialSection: document.querySelector('.claims-provider-list-buttons.social')
            };

            const requiredElements = ['forgotPassword', 'createAccount', 'form', 'isLoginPage', /*'heading', 'socialSection'*/];
            const allElementsFound = requiredElements.every(key => elements[key]);

            if (allElementsFound) {
                resolve(elements);
            } else if (++attempts <= config.maxAttempts) {
                setTimeout(checkElements, config.checkInterval);
            } else {
                reject(new Error('Login page elements not found in time'));
            }
        }

        checkElements();
    });
}


function updateHeading(heading) {
    heading.innerHTML = window.CONTENT?.social_intro || config.defaultHeading;
}


function removeDivider(divider) {
    if (divider) {
        divider.remove();
    }
}


function styleAuthLinks(forgotPassword, createAccount) {
    forgotPassword.classList.add('link');
    createAccount.classList.add('link');
}


function moveSocialSection(form, socialSection) {
    form.parentNode.insertBefore(socialSection, form.nextSibling);
}


function reorganizeOptions(socialSection, createAccount, forgotPassword) {
    const options = socialSection.querySelector('.options');
    if (!options) return;


    options.innerHTML = '';


    const signUpContainer = document.createElement('div');
    signUpContainer.appendChild(createAccount);


    const separatorContainer = document.createElement('div');
    separatorContainer.className = 'separator';
    separatorContainer.innerHTML = `<hr />${config.separatorText}<hr />`;


    const forgotContainer = document.createElement('div');
    forgotContainer.appendChild(forgotPassword);

    options.appendChild(forgotContainer);
    options.appendChild(separatorContainer);
    options.appendChild(signUpContainer);
    options.style = "display: block;"

}


function removeSocialIntro(socialSection) {
    const socialIntro = socialSection.querySelector('.intro');
    if (socialIntro) {
        socialIntro.remove();
    }
}


// Function to wait for the #next button to be visible
function waitForNextButtonVisible() {
    return new Promise(resolve => {
        if (document.getElementById('next')) {
            resolve();
            return;
        }

        const observer = new MutationObserver((mutations, obs) => {
            if (document.getElementById('next')) {
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


async function reorganizeLoginPage() {
    try {
        const elements = await waitForElements();

        removeDivider(elements.divider);
        styleAuthLinks(elements.forgotPassword, elements.createAccount);
        moveSocialSection(elements.form, elements.socialSection);
        reorganizeOptions(elements.socialSection, elements.createAccount, elements.forgotPassword);
        removeSocialIntro(elements.socialSection);

        console.log('Login page successfully reorganized');
    } catch (error) {
        console.warn(error.message);
    }
}


// Function to handle the #next button click
async function setupNextButtonHandler() {
    try {
        // Wait for the #next button to be available
        await waitForNextButtonVisible();
        
        // Add click event listener to the #next button
        document.getElementById('next').addEventListener('click', function() {
            // Check if any element with .working class has display:block
            const workingElements = document.querySelectorAll('.working');
            
            workingElements.forEach(element => {
                // Check if the element has display:block style
                if (window.getComputedStyle(element).display === 'block') {
                    // Add the spinner class
                    element.classList.add('spinner');
                }
            });
        });
        
        console.log('Next button handler set up successfully');
    } catch (error) {
        console.warn('Failed to set up next button handler:', error.message);
    }
}


// Initialize the page
reorganizeLoginPage();
setupNextButtonHandler();