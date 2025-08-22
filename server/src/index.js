const express = require('express');
console.error('Legacy index.js was invoked. Use "node src/server.js" as the start command.');
process.exit(1);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const signToken = (user) => {
    return jwt.sign({ sub: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
};


const TaskSchema = new mongoose.Schema({
    problemTitle: { type: String, required: true, trim: true },
    problemDescription: { type: String, required: true, trim: true },
    budget: { type: Number, required: true, min: 0 },
    deadline: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);

// ------------------ Middleware ------------------
const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ success: false, error: 'Missing Authorization header' });
    const token = authHeader.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { sub, email }
        next();
    } catch (err) {
        return res.status(401).json({ success: false, error: 'Invalid or expired token' });
    }
};

app.post('/add-task', auth, async (req, res) => {
    try {
        const { problemTitle, problemDescription, budget, deadline } = req.body;
        if (!problemTitle || !problemDescription || !budget || !deadline) {
            return res.status(400).json({ success: false, error: 'All fields are required.' });
        }
    const task = new Task({ problemTitle, problemDescription, budget, deadline, user: req.user.sub });
        await task.save();
        res.status(201).json({ success: true, message: 'Task added successfully', task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Failed to add task' });
    }
});

app.get('/tasks', async (req, res) => {
    try {
    const tasks = await Task.find().sort({ createdAt: -1 }).populate('user', 'email');
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error retrieving tasks' });
    }
});


const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// --- Handlers (so we can reuse for /api/auth/* compatibility) ---
const handleSignup = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, error: 'Email and password are required' });
        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ success: false, error: 'Email already registered' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        const user = new User({ email, password: hashedPassword, otp, otpExpires });
        await user.save();
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'OTP for Signup',
            text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
        };
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ success: false, error: 'Failed to send OTP' });
            }
            res.status(200).json({ success: true, message: 'OTP sent successfully' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Signup failed' });
    }
};

const handleVerifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });
        if (user.otp !== otp) return res.status(400).json({ success: false, error: 'Invalid OTP' });
        if (user.otpExpires < new Date()) return res.status(400).json({ success: false, error: 'OTP has expired' });
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();
        const token = signToken(user);
        res.status(200).json({ success: true, message: 'OTP verified successfully', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Verification failed' });
    }
};

const handleResendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'New OTP for Signup',
            text: `Your new OTP is ${otp}. It will expire in 10 minutes.`,
        };
        transporter.sendMail(mailOptions, (error) => {
            if (error) return res.status(500).json({ success: false, error: 'Failed to send OTP' });
            res.status(200).json({ success: true, message: 'New OTP sent successfully' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Failed to resend OTP' });
    }
};

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, error: 'Email and password required' });
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ success: false, error: 'Invalid email or password' });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ success: false, error: 'Invalid email or password' });
        if (!user.isVerified) return res.status(403).json({ success: false, error: 'Please verify your email first' });
        const token = signToken(user);
        res.status(200).json({ success: true, message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Login failed' });
    }
};

// Original non-prefixed routes (legacy)
app.post('/signup', handleSignup);
app.post('/verify-otp', handleVerifyOtp);
app.post('/resend-otp', handleResendOtp);
app.post('/login', handleLogin);

// API-prefixed compatibility routes expected by frontend
app.post('/api/auth/signup', handleSignup);
app.post('/api/auth/verify-otp', handleVerifyOtp);
app.post('/api/auth/resend-otp', handleResendOtp);
app.post('/api/auth/login', handleLogin);

// Task routes with prefix compatibility
app.post('/add-task', auth, async (req, res) => { /* legacy existing implementation above unchanged */ }); // placeholder to keep legacy note
// Replace legacy inline implementation with shared handler pattern if desired later
app.post('/api/tasks', auth, async (req, res) => {
    try {
        const { problemTitle, problemDescription, budget, deadline } = req.body;
        if (!problemTitle || !problemDescription || !budget || !deadline) {
            return res.status(400).json({ success: false, error: 'All fields are required.' });
        }
        const task = new Task({ problemTitle, problemDescription, budget, deadline, user: req.user.sub });
        await task.save();
        res.status(201).json({ success: true, message: 'Task added successfully', task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Failed to add task' });
    }
});

app.get('/api/tasks', async (_req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 }).populate('user', 'email');
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error retrieving tasks' });
    }
});

// Health endpoint for monitoring
app.get('/health', (_req, res) => res.json({ status: 'ok', ts: Date.now() }));

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.error(err.stack);
    res.status(500).json({ success: false, error: 'Internal server error' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;