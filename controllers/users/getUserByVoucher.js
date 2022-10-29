import User from '../../models/userModel.js';

const getUserByVoucher = async (req, res) => {
	try {
		const data = await User.findOne({ voucher: req.query.id }).select(
			'-password'
		);

		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getUserByVoucher;
