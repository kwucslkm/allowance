import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './db';
import allowanceRoutes from './routes/allowances';

const app = express();
app.use(bodyParser.json());
app.use('/api/allowances', allowanceRoutes);

sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
  });
});
