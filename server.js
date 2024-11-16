const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

// Middleware para processar os dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos (HTML, CSS, etc.)
app.use(express.static("public"));

// Rota para processar o formulário de agendamento
app.post("/agendar", (req, res) => {
  const { name, time, option } = req.body;

  // Template da mensagem para o WhatsApp
  const mensagem = encodeURIComponent(
    `Olá, sou ${name} e gostaria de agendar um horário na Barbearia do JAPA.\n` +
    `Horário preferido: ${time}\n` +
    `Serviço desejado: ${option}`
  );

  // Redirecionar para o link do WhatsApp
  const whatsappNumber = "5588981181120"; // Substitua pelo número do WhatsApp do barbeiro
  const waLink = `https://wa.me/${whatsappNumber}?text=${mensagem}`;
  res.redirect(waLink);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
