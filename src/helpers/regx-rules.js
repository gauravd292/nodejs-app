// Minimum 8 and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const password = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])[a-zA-Z0-9~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹\s]{8,15}$/;

const alphaSpace = /^[A-Za-z\s]+$/;
const alphaSpaceDashComma = /^[A-Za-z\s-,]+$/;

const alphaNumericSpace = /^[A-Za-z0-9\s]+$/;
const alphaNumericSpaceDashComma = /^[A-Za-z0-9\s-,]+$/;

module.exports = {
    alphaSpace,
    alphaSpaceDashComma,
    alphaNumericSpace,
    alphaNumericSpaceDashComma,
    password
}