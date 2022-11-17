import Joi from 'joi';

const validPattern = /^[a-zа-яA-ZА-Я0-9!,-@#$%&ё* ]{0,}$/;

export const schema = Joi.object({
	_id: Joi.optional(),

	title: Joi.string().pattern(validPattern).min(2).max(50).required().messages({
		'string.base': `Заголовок должен быть типом текст`,
		'string.empty': `Поле не может быть пустым`,
		'string.pattern.base': 'Использован недопустимый символ {#value}',
		'string.min': `Заголовок должен состоять минимум из {#limit} символов`,
		'string.max': `Заголовок должен состоять максимум из {#limit} символов`,
		'any.required': `Поле обязательно для ввода`,
	}),

	alias: Joi.string().pattern(validPattern).min(2).max(30).required().messages({
		'string.base': `Alias должен быть типом текст`,
		'string.empty': `Поле не может быть пустым`,
		'string.pattern.base': 'Использован недопустимый символ {#value}',
		'string.min': `Alias должен состоять минимум из {#limit} символов`,
		'string.max': `Alias должен состоять максимум из {#limit} символов`,
		'any.required': `Поле обязательно для ввода`,
	}),

	createdAt: Joi.date().required().messages({
		'date.base': ` Неправильно введена дата`,
		'any.required': `Поле обязательно для ввода`,
	}),

	article: Joi.string().min(30).max(5024).required().messages({
		'string.base': `Содержание должно быть типом текст`,
		'string.empty': `Поле не может быть пустым`,
		'string.min': `Содержание должно состоять минимум из {#limit} символов`,
		'string.max': `Содержание должно состоять максимум из {#limit} символов`,
		'any.required': `Поле обязательно для ввода`,
	}),

	category: Joi.string().pattern(validPattern).min(2).max(30).required().messages({
		'string.base': `Категория должна быть типом текст`,
		'string.empty': `Поле не может быть пустым`,
		'string.pattern.base': 'Использован недопустимый символ {#value}',
		'string.min': `Категория должна состоять минимум из {#limit} символов`,
		'string.max': `Категория должна состоять максимум из {#limit} символов`,
		'any.required': `Поле обязательно для ввода`,
	}),

	images: Joi.optional(),
});
