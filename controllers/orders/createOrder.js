import Order from '../../models/orderModel.js';
import User from '../../models/userModel.js';

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

		if (discount > 0) {
			const user = await User.findOne({ refCode: voucher }).select('-password');
			user.wallet =
				(user?.wallet ? user.wallet : 0) + (itemPrice - discount) / 10;
			console.log(user);
			await user.save();
		}

		return res.status(201).json(saved);
	} catch (e) {
		console.log(e.message);
		return res.status(500).json({ status: 'error', message: e.message });
	}
};

export default createOrder;
