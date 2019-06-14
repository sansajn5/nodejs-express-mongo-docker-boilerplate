// Working on early false and adding on each field
// WIP
module.exports.validationErrorBuilder = (errors) => {
  let errorMessage = '';
  errors.forEach((error) => {
    const childError = error.context.reason;
    childError.forEach((childErr) => {
      const { type } = childErr;
      const { key, value } = childErr.context;
      // eslint-disable-next-line no-use-before-define
      errorMessage += `${buildMessage(type, key, value)} `;
    });
  });
  return errorMessage;
};

const buildMessage = (type, key, value) => {
  switch (type) {
    case 'any.required':
      return `Field ${key} is required`;
    case 'string.base':
      return `Field ${key} must be string`;
    case 'number.base':
      return `Field ${key} must be number`;
    case 'any.allowOnly':
      return `${value} is an invalid ${key} field`;
    case 'string.guid':
      return `Field ${key} must be uuid type`;
    default:
      return '';
  }
};
