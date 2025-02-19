// import mongoose from "mongoose";

// const NonAvailableServiceSchema = new mongoose.Schema({
//     serviceName: { type: String, unique: true, required: true },
//     createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.models.NonAvailableService ||
//     mongoose.model("NonAvailableService", NonAvailableServiceSchema);

import mongoose from "mongoose";

const NonAvailableServiceSchema = new mongoose.Schema({
    serviceName: { type: String, unique: true, required: true },
    searchCount: { type: Number, default: 1, required: true }, // Ensure default and required
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.NonAvailableService ||
    mongoose.model("NonAvailableService", NonAvailableServiceSchema);
