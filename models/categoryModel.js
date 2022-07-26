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
			//lowercase: true,
		},
		description: {
			type: String,
			required: true,
		},
		displayOnHome: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Category = mongoose.model('Category', schema);

export default Category;
