import Category from '../../models/categoryModel.js';

const createCategory = async (req, res) => {
	const { name, image, description } = req.body;
	try {
		const exists = await Category.findOne({
			name: name.toLoweCase(),
		});
		if (exists)
			return res.status(400).json({
				status: 'error',
				message: 'Category already exists',
			});

		const item = await Category({
			user: req.user._id,
			name,
			image,
			description,
		});

		const saved = await item.save();

		return res.status(201).json(saved);
	} catch (e) {
		console.log(e.message);
		return res.status(500).json({ status: 'error', message: e.message });
	}
};

export default createCategory;
