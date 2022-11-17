import Joi from 'joi';

const validPattern = /^[a-zа-яA-ZА-Я0-9!,-@#$%&ё* ]{0,}$/;

export const schema = Joi.object({
	_id: Joi.optional(),

	name: Joi.string().pattern(validPattern).min(2).max(30).required().messages({
		'string.base': `Имя должно быть типом текст`,
		'string.pattern.base': 'Использован недопустимый символ {#value}',
		'string.empty': `Поле не может быть пустым`,
		'string.min': `Имя должно состоять минимум из {#limit} символов`,
		'string.max': `Имя должно состоять максимум из {#limit} символов`,
		'any.required': `Поле обязательно для ввода`,
	}),

	surname: Joi.string().pattern(validPattern).min(2).max(30).allow('').messages({
		'string.base': `Фамилия должно быть типом текст`,
		'string.pattern.base': 'Использован недопустимый символ {#value}',
		'string.min': `Фамилия должно состоять минимум из {#limit} символов`,
		'string.max': `Фамилия должно состоять максимум из {#limit} символов`,
	}),

	nickname: Joi.string().pattern(validPattern).min(2).max(30).allow('').messages({
		'string.base': `Никнейм должно быть типом текст`,
		'string.pattern.base': 'Использован недопустимый символ {#value}',
		'string.min': `Никнейм должно состоять минимум из {#limit} символов`,
		'string.max': `Никнейм должно состоять максимум из {#limit} символов`,
	}),

	tags: Joi.string().pattern(validPattern).max(929).required().messages({
		'string.base': `Тэги должны быть типом текст`,
		'string.pattern.base': 'Использован недопустимый символ {#value}',
		'string.empty': `Поле не может быть пустым`,
		'string.max': `Тэги должны состоять максимум из {#limit} символов`,
		'any.required': `Поле обязательно для ввода`,
	}),

	bio: Joi.string().min(30).max(5024).required().messages({
		'string.base': `Биография должна быть типом текст`,
		'string.empty': `Поле не может быть пустым`,
		'string.min': `Биография должна состоять минимум из {#limit} символов`,
		'string.max': `Биография должна состоять максимум из {#limit} символов`,
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
