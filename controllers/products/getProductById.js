import Product from '../../models/productModel.js';

const getProductById = async (req, res) => {
	try {
		const data = await Product.findById(req.params.id);

		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getProductById;
