import Voucher from '../../models/voucherModel.js';

const createVoucher = async (req, res) => {
	const { code, description, type, upto } = req.body;
	try {
		const item = await Voucher({
			user: req.user._id,
			code,
			description,
			type,
			upto,
		});

		const saved = await item.save();

		return res.status(201).json(saved);
	} catch (e) {
		console.log(e.message);
		return res.status(500).json({ status: 'error', message: e.message });
	}
};

export default createVoucher;
