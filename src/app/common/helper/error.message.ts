import { InjectionToken } from "@angular/core";
import { ValidationErrors } from "@angular/forms";

export const errorMessages: ValidationErrors = {
  required: () => 'Required',
  enterValid: () => 'Please enter',
  email: () => 'Please enter valid email',
  phone_number: () => 'Phone number already exists',
  vat_number: () => 'This vat number is already associate with pharmacy network or pharmacy',
  user_name: () => 'User name already exists',
  user_name_length: () => 'User name must contain at least 2 characters.',
  age: () => 'Age is not valid',
  weight: () => 'Weight is not valid',
  height: () => 'Height is not valid',
  min: () => 'Min',
  max: ({ max }: any) => `Maximum allowed value is ${max}`,
  pattern: () => 'Invalid',
  maxlength: ({ requiredLength }: any) => `Maximum ${requiredLength} characters allowed`,
  minlength: ({ requiredLength }: any) => requiredLength
    ? `Should be atleast ${requiredLength} characters long`
    : 'Too short',
  maxSize: () => 'File size must be less than 50mb',
  validatePhoneNumber: () => 'Invalid phone number',
  validatePassword: () => 'Both password have to be same',
  email_or_phone_number: () => 'Please Select Email Or Phone Number',
  serverError: (message: string) => message,
  whiteSpace: () => 'Invalid',
  strong_password: () => 'A password must contains minimum 8 characters including one uppercase, lowercase letter, one special and numeric character.',
  confirmPassword: () => "Confirm password and password must be same",
  validBirthDate: () => 'Birth date is not valid',
  fileTypeError: () => 'Only jpg, pdf files are allowed!!',
  validPassword: () => 'Please enter valid password',
  customError : (message : string) => message 
}

export const ERROR_MESSAGES = new InjectionToken<ValidationErrors>('ERROR_MESSAGES');


