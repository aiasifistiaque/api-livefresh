import Order from '../../models/orderModel.js';
import User from '../../models/userModel.js';

const getUseReferral = async (req, res) => {
	const { amount, referral } = req.body;
	try {
		const ref = await User.findOne({ refCode: referral });
		if (!ref) {
			return res.status(404).json({ message: 'invalid referral code' });
		}
		const data = await Order.findOne({
			referral: referral,
			user: req.user._id,
		});

		if (data) {
			return res.status(400).json({ message: 'referral code already used' });
		}

		//const amount = req.params.amount;
		// console.log(typeof amount);

		const discount = (amount * 10) / 100;
		// console.log(discount);
		return res.status(200).json({ status: 'valid', discount, amount });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getUseReferral;
