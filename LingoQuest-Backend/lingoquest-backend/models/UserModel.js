// models/UserModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    targetLanguage: { type: String, required: true, default: 'Spanish' },
    role: {
      type: String,
      enum: ['Learner', 'Tutor'],
      required: true,
      default: 'Learner'
    },

    // Gamification
    points: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },

    completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' }],
  },
  {
    timestamps: true,
  }
);

// FIXED PASSWORD HASH HOOK
UserSchema.pre('save', async function () {
  // Only hash if the password was modified
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance method to check password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
