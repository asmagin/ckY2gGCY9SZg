$(document).ready(function () {
    window.CONTENT.verifying_blurb = "";

    $('#continue').on('click', async function () {
        $('#simplemodal-data #verifying_blurb').addClass('working')
    });
});