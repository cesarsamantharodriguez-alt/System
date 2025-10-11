import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    employeeId: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
    dateJoined: { type: Date, required: true },
    status: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Employee", employeeSchema);
