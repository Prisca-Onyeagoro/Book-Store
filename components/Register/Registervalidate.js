const Registervalidate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'This field is required';
  } else if (values.name.includes(' ')) {
    errors.name = 'whitespaces not allowed';
  }

  if (!values.email) {
    errors.email = 'This Field is Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'This field is required';
  } else if (values.password.includes(' ')) {
    errors.password = 'This field is required';
  }

  if (!values.cpassword) {
    errors.cpassword = 'This field is required';
  } else if (values.password !== values.cpassword) {
    errors.cpassword = ' Unmatched password try again';
  }

  return errors;
};

export default Registervalidate;
