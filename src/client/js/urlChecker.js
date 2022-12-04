import validator from 'validator';

function checkForURL(inputText) {
    console.log("::: Running checkForURL :::", inputText);

    if(validator.isURL(inputText)) {
       return true;
    } else {
        return false
    }
}

export { checkForURL }
