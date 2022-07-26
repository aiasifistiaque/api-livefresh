import Order from '../../models/orderModel.js';

const getOrderById = async (req, res) => {
	try {
		const data = await Order.findById(req.params.id);

		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getOrderById;
