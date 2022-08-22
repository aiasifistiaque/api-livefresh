import Order from '../../models/orderModel.js';

const getNewUserDiscount = async (req, res) => {
	try {
		const data = await Order.findOne({ user: req.user._id });

		if (!data) {
			const amount = req.params.amount;
			// console.log(typeof amount);

			const discount = (amount * 10) / 100;
			// console.log(discount);
			return res.status(200).json({ status: 'valid', discount, amount });
		}

		return res.status(200).json({ status: 'not valid', discount: 0 });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getNewUserDiscount;
