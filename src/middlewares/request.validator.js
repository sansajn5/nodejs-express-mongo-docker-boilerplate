/**
 * Validation method
 *
 * Validating each segment of request
 *
 * @author sansajn
 */
module.exports.validateRequest = (requestSchemas, req, res, next) => {
  const { url, method } = req;
  const requestSchema = requestSchemas[method][url];
  const validators = ['params', 'query', 'body']
    .map((key) => {
      const schema = requestSchema[key];
      const value = req[key];
      // eslint-disable-next-line max-len
      const validate = () => (schema ? schema.validate(value || {}, { abortEarly: false }) : Promise.resolve());
      return validate().then(result => ({ [key]: result }));
    });
  return Promise.all([...validators])
    .then((result) => {
      req.validated = Object.assign({}, ...result);
      next();
    })
    .catch((validationError) => {
      const error = validationError.details.map(d => d.message);
      res.json(error.toString(), 400);
    });
};
