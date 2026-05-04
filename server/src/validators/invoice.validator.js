import Joi from 'joi';

const itemSchema = Joi.object({
  description: Joi.string().required(),
  hsn: Joi.string().allow('', null),
  quantity: Joi.number().positive().required(),
  rate: Joi.number().positive().required(),
  taxRate: Joi.number().min(0).required()
});

const schema = Joi.object({
  customer: Joi.object({
    name: Joi.string().required(),
    gstin: Joi.string().allow('', null),
    address: Joi.string().allow('', null)
  }).required(),
  items: Joi.array().items(itemSchema).min(1).required()
});

export function validateInvoice(req, res, next) {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
}
