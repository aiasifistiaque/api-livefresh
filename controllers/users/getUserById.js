import User from '../../models/userModel.js';

const getUserById = async (req, res) => {
	try {
		const data = await User.findById(req.params.id);

		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getUserById;
