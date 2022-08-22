import mongoose from 'mongoose';

const schema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		orderItems: [
			{
				name: { type: String, required: true },
				countInStock: { type: Number },
				image: { type: String },
				price: { type: Number, required: true },
				qty: { type: Number, required: true },
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
			},
		],
		status: { type: String, required: true, default: 'placed' },
		seen: { type: Number, required: true, default: 0 },
		address: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Address',
		},

		shippingAddress: {
			recipientName: { type: String, required: true },
			recipientNumber: { type: String, required: true },
			address: { type: String, required: true },
			area: { type: String, required: true },
			city: { type: String, required: true },
			postCode: { type: String },
		},
		paymentMethod: {
			type: String,
			required: true,
			default: 'cash',
		},
		paymentStatus: {
			type: String,
			required: true,
			default: 'pending',
		},

		itemPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		vat: {
			type: Number,
			required: true,
			default: 0.0,
		},
		discount: {
			type: Number,
			required: true,
			default: 0.0,
		},
		shippingPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		paidAt: {
			type: Date,
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		deliveredAt: {
			type: Date,
		},
		// voucher: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'Voucher',
		// },
		voucher: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model('Order', schema);

export default Order;
