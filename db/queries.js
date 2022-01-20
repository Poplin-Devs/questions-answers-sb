import mongoose from 'mongoose';
const { Schema } = mongoose;

mongoose.connect('mongodb://127.0.0.1:27017/questions-answers-sb', {
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

const Question = mongoose.model('question', questionSchema);

const Queries = {
  getQuestions: (product_id, callback) => {
    Question.find({ product_id: 39333 })
      .sort({ helpful: -1 })
      .then((questions) => {
        callback(questions);
      })
      .catch((error) => {
        console.log(error);
      })
  },

  getAnswers: (question_id, callback) => {
    Question.find({ "id": question_id })
      .then((question) => {
        let { answers } = question[0];
        answers = answers
          .filter((a) => {
            return !a.reported;
          })
          .sort((a, b) => {
            return b.helpful - a.helpful;
          });
        callback(answers);
      })
      .catch((error) => {
        console.log(error);
      })
  },

  markQuestionHelpful: (question_id, callback) => {
    Question.updateOne({ id: question_id }, { $inc: { helpful: 1 } }, { upsert: false })
      .then((success) => {
        callback(null, success);
      })
      .catch((error) => {
        console.log(error);
      })
  },

  markAnswerHelpful: (question_id, answer_id, callback) => {
    Question.updateOne({ id: question_id, "answers.id": answer_id }, { $inc: { "answers.$.helpful": 1 } }, { upsert: false })
      .then((success) => {
        callback(null, success);
      })
      .catch((error) => {
        console.log(error);
      })
  },

  reportQuestion: (question_id, callback) => {
    Question.updateOne({ id: question_id }, { $set: { reported: true } }, { upsert: false })
      .then((success) => {
        callback(null, success);
      })
      .catch((error) => {
        console.log(error);
      })
  },

  reportAnswer: (question_id, answer_id, callback) => {
    Question.updateOne({ id: question_id, "answers.id": answer_id }, { $set: { "answers.$.reported": true } }, { upsert: false })
      .then((success) => {
        console.log('this also worked!');
        callback(null, success);
      })
      .catch((error) => {
        console.log(error);
      })
  },

  addQuestion: (question, callback) => {
    Question.updateOne({ id: question.id }, { question: question }, { upsert: true })
      .then((success) => {
        console.log(success);
        callback(null, success);
      })
      .catch((error) => {
        console.log(error);
      })
  },

  addAnswer: (answer, callback) => {
    Question.updateOne({ id: answer.question_id }, { $push: { "answers": answer } }, { upsert: true })
      .then((success) => {
        console.log(success)
        callback(null, success);
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

export default Queries;