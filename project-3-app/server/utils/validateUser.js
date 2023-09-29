module.exports = {
    validateUserRegistration: function (name, email, password) {
      const errors = [];
  
      if (!name || !email || !password) {
        errors.push('All fields are required');
      }
  
      if (name.length < 1 || name.length > 36) {
        errors.push('Name must be between 1 and 36 characters');
      }
  
      return errors;
    },
  };