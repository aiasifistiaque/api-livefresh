import Order from '../../models/orderModel.js';

const editOrderStatus = async (req, res) => {
	try {
		const data = await Order.findById(req.params.id);

		data.status = req.body.status;

		await data.save();

		return res.status(200).json({ message: 'updated' });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default editOrderStatus;
