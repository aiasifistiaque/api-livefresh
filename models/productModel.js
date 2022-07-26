import mongoose from 'mongoose';

const schema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		images: [
			{
				url: String,
			},
		],

		status: {
			type: String,
			default: 'hidden',
		},
		tags: [
			{
				type: String,
			},
		],

		unit: {
			type: String,
			required: true,
			default: 'kg',
		},

		category: {
			type: String,
			required: true,
			lowercase: true,
		},

		subCategory: {
			type: String,
		},

		description: {
			type: String,
		},

		note: {
			type: String,
		},

		specs: [
			{
				name: String,
				value: String,
			},
		],

		price: {
			type: Number,
			required: true,
			default: 0,
		},

		currentPrice: {
			type: Number,
			default: 0,
		},

		stock: {
			type: Number,
			required: true,
			default: 1,
		},
		totalSold: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model('Product', schema);

export default Product;
