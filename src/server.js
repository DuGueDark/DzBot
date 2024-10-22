import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use(express.json())

// Importar as rotas
import routes from './routes/apiRoutes.js';

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Servidor API rodando em http://localhost:${PORT}`);
});

