import Order from '../../models/orderModel.js';

const createOrder = async (req, res) => {
	const {
		orderItems,
		address,
		shippingAddress,
		itemPrice,
		vat,
		discount,
		shippingPrice,
		totalPrice,
		voucher,
	} = req.body;
	try {
		const item = await Order({
			user: req.user._id,
			orderItems,
			address,
			shippingAddress,
			itemPrice,
			vat,
			discount,
			shippingPrice,
			totalPrice,
			voucher,
		});

		const saved = await item.save();

		return res.status(201).json(saved);
	} catch (e) {
		console.log(e.message);
		return res.status(500).json({ status: 'error', message: e.message });
	}
};

export default createOrder;
