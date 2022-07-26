import Order from '../../models/orderModel.js';

const getAllOrders = async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;

	const query = req.query.from
		? req.query.from === 'past'
			? { status: { $in: ['completed', 'cancelled'] } }
			: { status: { $nin: ['completed', 'cancelled'] } }
		: {};

	try {
		const data = await Order.find(query).sort(sort).limit(perpage).skip(skip);
		const count = await Order.count(query);

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getAllOrders;
