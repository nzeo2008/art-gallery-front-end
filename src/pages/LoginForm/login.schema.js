import Joi from 'joi';

export const schema = Joi.object({
	email: Joi.string()
		.max(256)
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } })
		.required()
		.messages({
			'string.base': `Email должен быть типом текст`,
			'string.empty': `Поле не может быть пустым`,
			'string.email': `Допускаются только [.com, .net, .ru]`,
			'string.max': `Email должен состоять максимум из {#limit} символов`,
			'any.required': `Поле обязательно для ввода`,
		}),
	password: Joi.string().min(8).max(20).required().messages({
		'string.base': `Пароль должен быть типом текст`,
		'string.empty': `Поле не может быть пустым`,
		'string.min': `Пароль должен состоять минимум из {#limit} символов`,
		'string.max': `Пароль должен состоять максимум из {#limit} символов`,
		'any.required': `Поле обязательно для ввода`,
	}),
});
