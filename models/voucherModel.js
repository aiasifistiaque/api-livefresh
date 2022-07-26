import mongoose from 'mongoose';

const schema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		description: {
			type: String,
		},
		code: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		upto: {
			type: Number,
		},
		discount: {
			type: Number,
		},

		status: {
			type: String,
			default: 'active',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Voucher = mongoose.model('Voucher', schema);

export default Voucher;
