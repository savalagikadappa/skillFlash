const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendMail } = require('../utils/email');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const signToken = (user) => jwt.sign({ sub: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, error: 'Email and password are required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ success: false, error: 'Email already registered' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    const user = await User.create({ email, password: hashedPassword, otp, otpExpires });
    try {
      await sendMail({ from: process.env.EMAIL_USER, to: email, subject: 'OTP for Signup', text: `Your OTP is ${otp}. Expires in 10 minutes.` });
    } catch (mailErr) {
      console.error('[signup] OTP email failed:', mailErr.message);
      // If email not configured, allow returning OTP in dev (never in production)
      if (process.env.NODE_ENV !== 'production') {
        return res.status(200).json({ success: true, message: 'OTP (email disabled in dev)', userId: user._id, otp });
      }
      return res.status(500).json({ success: false, error: 'Failed to send OTP' });
    }
    res.status(200).json({ success: true, message: 'OTP sent successfully', userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Signup failed' });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    if (user.otp !== otp) return res.status(400).json({ success: false, error: 'Invalid OTP' });
    if (user.otpExpires < new Date()) return res.status(400).json({ success: false, error: 'OTP expired' });
    user.isVerified = true; user.otp = undefined; user.otpExpires = undefined; await user.save();
    const token = signToken(user);
    res.status(200).json({ success: true, message: 'OTP verified', token });
  } catch (err) {
    console.error(err); res.status(500).json({ success: false, error: 'Verification failed' });
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    const otp = generateOTP();
    user.otp = otp; user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); await user.save();
    try {
      await sendMail({ from: process.env.EMAIL_USER, to: email, subject: 'New OTP', text: `OTP: ${otp}` });
    } catch (mailErr) {
      console.error('[resendOtp] Email failed:', mailErr.message);
      if (process.env.NODE_ENV !== 'production') {
        return res.status(200).json({ success: true, message: 'New OTP (email disabled in dev)', otp });
      }
      return res.status(500).json({ success: false, error: 'Failed to send OTP' });
    }
    res.status(200).json({ success: true, message: 'New OTP sent' });
  } catch (err) { console.error(err); res.status(500).json({ success: false, error: 'Failed to resend OTP' }); }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, error: 'Email and password required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, error: 'Invalid email or password' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ success: false, error: 'Invalid email or password' });
    if (!user.isVerified) return res.status(403).json({ success: false, error: 'Please verify your email first' });
    const token = signToken(user);
    res.status(200).json({ success: true, message: 'Login successful', token });
  } catch (err) { console.error(err); res.status(500).json({ success: false, error: 'Login failed' }); }
};
