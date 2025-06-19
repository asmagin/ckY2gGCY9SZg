function addRequiredSign()  {
    window.SA_FIELDS.AttributeFields.forEach((fields) => {
        fields.DISPLAY_FIELDS.forEach((field) => {
            if(!field.IS_REQ) return;

            const fieldLabel = $(`#${field.ID}_label`);
            fieldLabel.text(fieldLabel.text() + '*');
        })
    })
}

$(document).ready(function (){
    addRequiredSign()
})