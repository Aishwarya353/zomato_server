import mongoose from "mongoose";

export default async () => {
  const mongoDB =
    "mongodb+srv://aishuv353:aishu637408@cluster0.ix5kg.mongodb.net/book-my-show?retryWrites=true&w=majority&ssl=true";
  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
