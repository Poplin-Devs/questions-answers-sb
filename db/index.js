import mongoose from 'mongoose';
const { Schema } = mongoose;

mongoose.connect('mongodb://44.201.101.48:27017/questions-answers-sb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('DB is connected!'))
  .catch(err => console.log('DB connection failed with error: ', err));

const questionSchema = new Schema({
  id: Number,
  product_id: Number,
  question_body: String,
  date_written: String,
  asker_name: String,
  asker_email: String,
  answers: [{
    question_id: Number,
    answerer_email: String,
    answerer_name: String,
    body: String,
    date_written: String,
    helpful: Number,
    id: Number,
    reported: Boolean,
    answer_photos: [{ id: Number, url: String }],
  }],
  reported: Boolean,
  helpful: Number
});

export default questionSchema;