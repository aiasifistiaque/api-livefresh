import mongoose from 'mongoose';

const schema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		address: {
			type: String,
			required: true,
		},
		area: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		additionalInfo: {
			type: String,
		},
		postCode: {
			type: Number,
		},
		recipientName: {
			type: String,
		},
		recipientNumber: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Address = mongoose.model('Address', schema);

export default Address;
