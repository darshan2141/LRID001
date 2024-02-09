const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: function (value) {
                // You can customize the email validation logic
                // For simplicity, this example uses a regular expression
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address format'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    confirmPassword: {
        type: String,
        validate: {
            validator: function (value) {
                // Customize the password confirmation validation logic
                return value === this.password;
            },
            message: 'Password and confirm password do not match'
        }
    },
    postalCode: {
        type: String,
        required: [true, 'Postal code is required']
    }
});

module.exports = mongoose.model('users', userSchema);
