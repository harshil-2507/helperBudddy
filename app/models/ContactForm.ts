import mongoose from 'mongoose';

const FormSubmissionSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const FormSubmission =
  mongoose.models.FormSubmission || mongoose.model('FormSubmission', FormSubmissionSchema);

export default FormSubmission;