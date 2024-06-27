import express from 'express';
import ordersRouter from './routes/orders';
import { consumeMessages } from './consumer'; // Importer le consommateur de messages

const app = express();
const port = 3000;

app.use(express.json());
app.use('/orders', ordersRouter);

// Démarrer le consommateur de messages
consumeMessages('orderQueue');

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
