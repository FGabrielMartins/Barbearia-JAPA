const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Usa a porta do Railway ou 3000 como padrão

// Configurar para servir arquivos estáticos na pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a raiz (/) que retorna o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para processar o formulário de agendamento
app.post('/agendar', (req, res) => {
  const nome = req.query.name || 'Cliente'; // Nome do cliente
  const horario = req.query.time || 'Sem horário definido'; // Horário escolhido
  const servico = req.query.option || 'Serviço não selecionado'; // Serviço escolhido

  // Redireciona para o WhatsApp com a mensagem formatada
  const mensagem = `Olá, sou ${nome}. Gostaria de agendar um horário às ${horario} para o serviço: ${servico}.`;
  const whatsappLink = `https://wa.me/5588981181120?text=${encodeURIComponent(mensagem)}`;
  res.redirect(whatsappLink);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
