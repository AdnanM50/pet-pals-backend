import mongoose, { Schema, Document, Model } from 'mongoose';

interface ICategory extends Document {
    name: string;
}

const categorySchema: Schema<ICategory> = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

const Category: Model<ICategory> = mongoose.model<ICategory>('Category', categorySchema);
export default Category;
