$(document).ready(function () {
    window.CONTENT.verifying_blurb = "";

    $('#continue').on('click', async function () {
        $('#verifying_blurb').addClass('working')
    });
});