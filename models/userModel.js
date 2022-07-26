import Joi from 'joi';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
		},
		wallet: {
			type: Number,
			required: true,
			default: 0,
		},
		bio: {
			type: String,
		},

		email: { type: String, trim: true },
		phone: { type: String, trim: true, required: true, unique: true },

		role: {
			type: String,
			required: true,
			trim: true,
			default: 'user',
		},
		refCode: { type: String, trim: true },
		password: { type: String, required: true, minlength: 8, maxlength: 1024 },
		primaryAddress: {
			address: { type: String, trim: true },
			area: { type: String, trim: true },
			city: { type: String, trim: true },
			postCode: { type: Number },
			coords: { lat: String, lng: String },
		},
	},

	{
		timestamps: true,
	}
);

schema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{
			_id: this._id,
			name: this.name,
			wallet: this.wallet,
			role: this.role,
		},
		process.env.JWT_PRIVATE_KEY
	);
	return token;
};

const User = mongoose.model('User', schema);
export default User;
