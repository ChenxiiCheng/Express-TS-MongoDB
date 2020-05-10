import 'dotenv/config';
import 'colors';
import mongoConfig from '@config/mongo';
import mongoose from 'mongoose';
import app from './app';

mongoose.connect(
  `mongodb+srv://${mongoConfig.username}:${mongoConfig.password}@xxxxxxx/${mongoConfig.docname}?xxxxxxxx`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`.blue);
});
