require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const bcrypt = require('bcrypt');
const User = require('./models/User');

if (!process.env.MONGODB_URI) { console.error('Missing MONGODB_URI'); process.exit(1); }
if (!process.env.JWT_SECRET) { console.error('Missing JWT_SECRET'); process.exit(1); }

connectDB(process.env.MONGODB_URI);

// Seed a demo test user for recruiters / quick testing
(async () => {
	try {
		const email = process.env.TEST_USER_EMAIL || 'temp@gmail.com';
		const plain = process.env.TEST_USER_PASSWORD || '1234';
		let user = await User.findOne({ email });
		if (!user) {
			const password = await bcrypt.hash(plain, 10);
			user = await User.create({ email, password, isVerified: true });
			console.log(`[seed] Created demo user ${email}`);
		} else if (!user.isVerified) {
			user.isVerified = true; await user.save();
			console.log(`[seed] Marked existing demo user as verified (${email})`);
		}
	} catch (err) {
		console.warn('[seed] Demo user creation failed:', err.message);
	}
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
