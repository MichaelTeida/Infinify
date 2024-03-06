import { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema({
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  plan: {
    type: String,
  },
  tokens: {
    type: Number,
  },
});

const Transaction =
  models?.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
