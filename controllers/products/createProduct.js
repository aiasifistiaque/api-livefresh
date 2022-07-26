import Product from '../../models/productModel.js';

const createProduct = async (req, res) => {
	const {
		name,
		images,
		description,
		note,
		specs,
		price,
		stock,
		category,
		unit,
		currentPrice,
		tags,
	} = req.body;
	try {
		const item = await Product({
			user: req.user._id,
			name,
			images,
			description,
			note,
			specs,
			price,
			stock,
			category,
			unit,
			currentPrice,
			tags,
		});

		const saved = await item.save();

		return res.status(201).json(saved);
	} catch (e) {
		console.log(e.message);
		return res.status(500).json({ status: 'error', message: e.message });
	}
};

export default createProduct;
