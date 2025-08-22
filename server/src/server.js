require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

if (!process.env.MONGODB_URI) { console.error('Missing MONGODB_URI'); process.exit(1); }
if (!process.env.JWT_SECRET) { console.error('Missing JWT_SECRET'); process.exit(1); }

connectDB(process.env.MONGODB_URI);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
