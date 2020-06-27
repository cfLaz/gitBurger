export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
    };
}

//a good function uses just it's arguments
export const checkValidity = (value, rules) => {
    let isValid = true;
    //if(!rules) return true; -another way of avoiding undefined
    if(rules.required){ //isValid depends on if string is empty or not
        isValid = value.trim()!== '' && isValid;
        // .trim() removes any whitespace at the beginning and the end
    };
    if (rules.minLength) {
        isValid = (value.length >= rules.minLength && isValid);
    };
    if (rules.maxLength) {
        isValid = (value.length <= rules.maxLength && isValid);
    }
    if(rules.Email){
        //need to add email validity
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }
    /* my setup ** 
    if (rules.minLength) {
        isValid = (value.length >= rules.minLength) && (value.length <= rules.maxLength);
    } */
    return isValid;
}