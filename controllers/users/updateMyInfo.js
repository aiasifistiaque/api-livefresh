import User from '../../models/userModel.js';

const updateMyInfo = async (req, res) => {
	const { name, email } = req.body;
	try {
		const data = await User.findById(req.user._id);
		data.name = name;
		data.email = email;

		await data.save();

		return res.status(200).json({ message: 'Updated Successfully' });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default updateMyInfo;
