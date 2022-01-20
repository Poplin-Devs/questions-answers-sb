import express from 'express';
import Queries from '../db/queries.js';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())

app.get('/qa/questions', (req, res) => {
  const { product_id } = req.query;
  Queries.getQuestions(product_id, (questions) => {
    res.status(200).send(questions);
  });
})

app.get('/qa/questions/:question_id/answers', (req, res) => {
  const { question_id } = req.params;
  console.log('this is working! here is the qid:', question_id);
  Queries.getAnswers(question_id, (answers) => {
    res.status(200).send(answers);
  })
})

app.put('/qa/questions/:question_id/:put_type', (req, res) => {
  const { question_id, put_type } = req.params;
  if (put_type === 'helpful') {
    Queries.markQuestionHelpful(question_id, (error, success) => {
      res.status(200).send(success);
    })
  } else if (put_type === 'report') {
    Queries.reportQuestion(question_id, (error, success) => {
      res.status(200).send(success);
    });
  }
});

app.put('/qa/answers/:answer_id/:put_type', (req, res) => {
  const { answer_id, put_type } = req.params;
  const { question_id } = req.body;
  if (put_type === 'helpful') {
    Queries.markAnswerHelpful(question_id, answer_id, (error, success) => {
      res.status(200).send(success);
    });
  } else if (put_type === 'report') {
    Queries.reportAnswer(question_id, answer_id, (error, success) => {
      res.status(200).send(success);
    });
  }
});

app.post('/qa/questions', (req, res) => {
  let new_question_id = Math.floor(Math.random() * 99999999999);
  req.body.id = new_question_id;
  console.log(req.body);
  Queries.addQuestion(req.body, (error, success) => {
    res.status(201).send(success);
  });
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  let new_answer_id = Math.floor(Math.random() * 99999999999);
  req.body.id = new_answer_id;
  console.log(req.body)
  Queries.addAnswer(req.body, (error, success) => {
    res.status(201).send(success);
  });
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

