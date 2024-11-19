const express = require('express');
const path = require('path');

const app = express();

// Porta dinâmica fornecida pelo Railway ou 8080 como padrão local
const PORT = process.env.PORT || 8080;

// Middleware para interpretar o corpo da requisição (formulários)
app.use(express.urlencoded({ extended: true }));

// Configurar para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a raiz (/) que retorna o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para processar o formulário de agendamento
app.post('/agendar', (req, res) => {
  const nome = req.body.name?.trim() || 'Cliente'; // Nome do cliente, com fallback
  const horario = req.body.time?.trim() || 'Sem horário definido'; // Horário
  const servicos = req.body.option || []; // Serviços selecionados

  // Garante que 'servicos' seja sempre uma lista
  const listaServicos = Array.isArray(servicos)
    ? servicos.map(s => s.trim()).join(', ') // Remove espaços e junta os serviços
    : servicos.trim();

  // Formata a mensagem para o WhatsApp
  const mensagem = `Olá, sou ${nome}. Gostaria de agendar um horário às ${horario} para os serviços: ${listaServicos}.`;

  // Verifica se algum campo essencial está vazio
  if (!nome || !horario || !listaServicos) {
    return res.status(400).send('Por favor, preencha todas as informações corretamente.');
  }

  // Redireciona para o WhatsApp com a mensagem formatada
  const whatsappLink = `https://wa.me/5588981181120?text=${encodeURIComponent(mensagem)}`;
  res.redirect(whatsappLink);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
