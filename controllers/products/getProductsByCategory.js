import Product from '../../models/productModel.js';

const getProductsByCategory = async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;

	const query = req.params.id === 'all' ? {} : { category: req.params.id };

	try {
		const data = await Product.find(query).sort(sort).limit(perpage).skip(skip);
		const count = await Product.count(query);

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getProductsByCategory;
