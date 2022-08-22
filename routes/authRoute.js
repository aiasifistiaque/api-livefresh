import User from '../models/userModel.js';
import express from 'express';
import _ from 'lodash';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import { protect } from '../middleware/auth.js';
import getUserByToken from '../controllers/users/getUserByToken.js';
import voucher_codes from 'voucher-code-generator';
import Voucher from '../models/voucherModel.js';
import updateMyInfo from '../controllers/users/updateMyInfo.js';
import getNewUserDiscount from '../controllers/users/getNewUserDiscount.js';

const router = express.Router();

//const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

router.post('/login', async (req, res) => {
	try {
		const { error } = loginValidate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ phone: req.body.phone });
		if (!user)
			return res.status(400).send({
				status: 'error',
				message: 'This number is not yet registered',
			});

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res
				.status(400)
				.send({ status: 'error', message: 'Wrong password' });

		const token = user.generateAuthToken();
		return res.status(200).json({ token: `Bearer ${token}` });
	} catch (e) {
		return res.status(500).send({ status: 'error', message: e.message });
	}
});

router.post('/register', async (req, res) => {
	const { error } = await registerValidate(req.body);
	if (error)
		return res
			.status(400)
			.send({ message: error.details[0].message, error: error });

	if (req.body.password != req.body.confirm)
		return res.status(400).send({ message: 'Passwords do not match' });

	try {
		let user = await User.findOne({ phone: req.body.phone });
		if (user)
			return res.status(400).send({
				status: 'error',
				message: 'This phone number is already registered',
			});

		const { phone, password, role } = req.body;

		const voucher = voucher_codes.generate({
			length: 8,
			count: 1,
		});

		user = new User({ phone, password, role, refCode: voucher[0] });
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);

		const saved = await user.save();

		const voucherCreate = new Voucher({
			user: saved._id,
			code: saved.refCode,
			type: 'user',
		});

		await voucherCreate.save();

		const token = user.generateAuthToken();
		return res
			.status(200)
			.header('x-auth-token', token)
			.json({ token: `Bearer ${token}` });
	} catch (e) {
		res.status(500).send({ message: e.message });
	}
});

function loginValidate(user) {
	const schema = Joi.object({
		phone: Joi.string().min(5).max(255).required().length(11).messages({
			'any.required': 'Phone Number is required',
			'string.length': 'Invalid Phone number',
		}),
		password: Joi.string().min(6).max(255).required().messages({
			'string.min': 'Password must be 6 characters long',
		}),
	});
	return schema.validate(user);
}

function registerValidate(user) {
	const schema = Joi.object({
		name: Joi.string().min(2).max(50),
		phone: Joi.string().min(5).max(255).required().length(11).messages({
			'any.required': 'Phone Number is required',
			'string.length': 'Invalid Phone number',
		}),
		password: Joi.string().min(6).max(255).required().messages({
			'string.min': 'Password must be 6 characters long',
		}),
		confirm: Joi.ref('password'),
		role: Joi.string(),
	});
	return schema.validate(user);
}

router.get('/self', protect, getUserByToken);
router.put('/self', protect, updateMyInfo);
router.get('/discount/:amount', protect, getNewUserDiscount);

export default router;
