import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World')
})

// Importar as rotas
import routes from './routes/apiRoutes.js';

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Servidor API rodando em http://localhost:${PORT}`);
});

