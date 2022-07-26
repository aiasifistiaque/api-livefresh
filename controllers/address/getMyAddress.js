import Address from '../../models/addressModel.js';

const getMyAddress = async (req, res) => {
	try {
		const data = await Address.find({ user: req.user._id }).sort('-createdAt');

		return res.status(200).json({ doc: data });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getMyAddress;
