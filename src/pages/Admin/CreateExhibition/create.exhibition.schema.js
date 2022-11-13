import Joi from 'joi';

const validPattern = /^[a-zа-яA-ZА-Я0-9!,@#$%&* ]{0,}$/;

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

	startDate: Joi.date().required().messages({
		'date.base': ` Неправильно введена дата`,
		'any.required': `Поле обязательно для ввода`,
	}),

	endDate: Joi.date().required().messages({
		'date.base': ` Неправильно введена дата`,
		'any.required': `Поле обязательно для ввода`,
	}),

	city: Joi.string().pattern(validPattern).min(2).max(30).required().messages({
		'string.base': `Город должен быть типом текст`,
		'string.empty': `Поле не может быть пустым`,
		'string.pattern.base': 'Использован недопустимый символ {#value}',
		'string.min': `Город должен состоять минимум из {#limit} символов`,
		'string.max': `Город должен состоять максимум из {#limit} символов`,
		'any.required': `Поле обязательно для ввода`,
	}),

	description: Joi.string().min(30).max(5024).required().messages({
		'string.base': `Описание должно быть типом текст`,
		'string.empty': `Поле не может быть пустым`,
		'string.min': `Описание должно состоять минимум из {#limit} символов`,
		'string.max': `Описание должно состоять максимум из {#limit} символов`,
		'any.required': `Поле обязательно для ввода`,
	}),

	tags: Joi.string().pattern(validPattern).max(929).required().messages({
		'string.base': `Описание должно быть типом текст`,
		'string.empty': `Поле не может быть пустым`,
		'string.pattern.base': 'Использован недопустимый символ {#value}',
		'string.max': `Тэги должны состоять максимум из {#limit} символов`,
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

	alias: Joi.string().pattern(validPattern).min(2).max(30).required().messages({
		'string.base': `Alias должен быть типом текст`,
		'string.empty': `Поле не может быть пустым`,
		'string.pattern.base': 'Использован недопустимый символ {#value}',
		'string.min': `Alias должен состоять минимум из {#limit} символов`,
		'string.max': `Alias должен состоять максимум из {#limit} символов`,
		'any.required': `Поле обязательно для ввода`,
	}),

	images: Joi.optional(),
});
