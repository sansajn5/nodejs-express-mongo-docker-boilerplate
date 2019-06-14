/**
 * Validation method
 *
 * Validating each segment of request
 *
 * @author sansajn
 */
module.exports.validateRequest = (requestSchemas, req, res, next) => {
  // eslint-disable-next-line prefer-const
  let { url, method } = req;
  if (url.includes('?')) {
    const urlTokens = url.split('?');
    // eslint-disable-next-line prefer-destructuring
    url = urlTokens[0];
  }
  const requestSchemaWithMethod = requestSchemas[method];
  const requestSchema = requestSchemaWithMethod ? requestSchemaWithMethod[url] : null;
  if (requestSchema) {
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
  } next();
};
