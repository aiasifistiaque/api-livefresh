import Address from '../../models/addressModel.js';

const createAddress = async (req, res) => {
	const {
		address,
		area,
		city,
		postCode,
		recipientName,
		recipientNumber,
		additionalInfo,
	} = req.body;
	try {
		const item = await Address({
			user: req.user._id,
			address,
			area,
			city,
			postCode,
			recipientName,
			recipientNumber,
			additionalInfo,
		});

		const saved = await item.save();

		return res.status(201).json(saved);
	} catch (e) {
		console.log(e.message);
		return res.status(500).json({ status: 'error', message: e.message });
	}
};

export default createAddress;
