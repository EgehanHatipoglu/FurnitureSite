const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'antigravity_secret_key_123';

const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, JWT_SECRET);

            // In a real DB, you'd fetch the user and attach it:
            // req.user = await User.findById(decoded.id).select('-password');
            req.user = { id: decoded.id };

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
