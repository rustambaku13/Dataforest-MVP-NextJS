import validator from 'validator';

export const isEditorEmpty = (text) => {
  if (!text.replace(/<(.|\n)*?>/g, '').trim().length) {
    return true;
  }
  return false;
}

export const validateName = (rule, value, callback) => {
  if (validator.isEmpty(value)) {
    callback('Please provide your username!');
  }
  if (value.length < 3 || value.length > 15) {
    callback('Name has to be between 3 and 15 characters!');
  }
  callback();
}

export const compareToFirstPassword = (password) => (rule, value, callback) => {
  if (value && value !== password) {
    callback('Two passwords that you entered are inconsistent!');
  }
  callback();
}

export const validateToNextPassword = (rule, value, callback) => {
  const lowercase = /[a-z]/g;
  const uppercase = /[A-Z]/g;
  const number = /[0-9]/g;
  if (value === '') {
    callback('Please input your password!');
  }
  else if (value.length < 8) {
    callback('Password should be longer than 8 characters!');
  }
  else if (!value.match(number)) {
    callback('Password needs to contain at least one number!');
  }
  else if (!value.match(lowercase)) {
    callback('Password needs to contain at least one lowercase letter!');
  }
  else if (!value.match(uppercase)) {
    callback('Password needs to contain at least one uppercase letter!');
  }
  callback();
}

export const validateEmail = (rule, value, callback) => {
  if (validator.isEmpty(value)) {
    callback("Please provide your email!");
  }
  else if (!validator.isEmail(value)) {
    callback('Email is not valid!');
  }
  callback();
}