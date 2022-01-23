import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

export default app;

