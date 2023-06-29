const Loginvalidate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'This Field is Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'This field is required';
  } else if (values.password.includes(' ')) {
    errors.password = 'whitespaces not allowed';
  }

  return errors;
};

export default Loginvalidate;
