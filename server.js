const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080; // Usa a porta do Railway ou 3000 como padrão

// Middleware para interpretar o corpo da requisição (formulários)
app.use(express.urlencoded({ extended: true }));

// Configurar para servir arquivos estáticos na pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a raiz (/) que retorna o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para processar o formulário de agendamento
app.post('/agendar', (req, res) => {
  const nome = req.body.name || 'Cliente'; // Nome do cliente
  const horario = req.body.time || 'Sem horário definido'; // Horário escolhido
  const servicos = req.body.option || []; // Serviços escolhidos

  // Formata os serviços em uma string separada por vírgulas
  const listaServicos = Array.isArray(servicos) ? servicos.join(', ') : servicos;

  // Redireciona para o WhatsApp com a mensagem formatada
  const mensagem = `Olá, sou ${nome}. Gostaria de agendar um horário às ${horario} para os serviços: ${listaServicos}.`;
  const whatsappLink = `https://wa.me/5588981181120?text=${encodeURIComponent(mensagem)}`;
  res.redirect(whatsappLink);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
