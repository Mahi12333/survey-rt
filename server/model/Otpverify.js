import mongoose from "mongoose";

const OtpverifySchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: Number, required: true },
    expires_at: { type: Date, required: true },
    type: {
      type: String,
      enum: ["registration", "forgotPassword"],
      default: "registration",
    },
  },
  { timestamps: true, collection: "tbl_otpverifys" }
);

export default mongoose.model("Otpverify", OtpverifySchema);
