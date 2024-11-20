import { Schema, model, models } from "mongoose";

const SaleSchema = new Schema({
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

const Sale = models?.Sale || model("Sale", SaleSchema);

export default Sale;
