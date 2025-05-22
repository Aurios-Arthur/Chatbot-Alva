// Seleciona elementos do DOM relacionados ao chatbot
const chatInput = document.querySelector(".chat-input textarea"); // Campo de entrada de texto
const sendChatBtn = document.querySelector(".chat-input span"); // Botão de envio de mensagem
const chatbox = document.querySelector(".chatbox"); // Área onde as mensagens aparecem
const chatbotTogller = document.querySelector(".chatbot-toggler"); // Botão para abrir/fechar o chatbot

let userMessage; // Variável para armazenar a mensagem do usuário
const API_KEY = "AIzaSyDDFy3bKhKwUBMnv4XvZm1a42RPRnZv2XM"; // Chave da API para requisições (precisa ser preenchida)

// Função para criar um elemento de mensagem (li) no chat
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li"); // Cria um elemento <li>
    chatLi.classList.add("chat", className); // Adiciona classe "chat" e define se é mensagem de entrada/saída
    let chatContent = className === "outgoing" 
        ? `<p>${message}</p>` 
        : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`; // Ícone para o chatbot
    chatLi.innerHTML = chatContent; // Define o conteúdo HTML do <li>
    return chatLi; // Retorna o elemento criado
}

// Função para gerar a resposta do chatbot
const generateResponse = (incomingChatLi) => {
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    const messageElement = incomingChatLi.querySelector("p"); // Seleciona o <p> dentro da mensagem do chatbot

    // Configuração da requisição para a API do chatbot
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          contents: [{ 
            role: "user", 
            parts: [{ text: userMessage }] // Envia a mensagem do usuário
          }] 
        }),
    };

    // Faz a requisição à API e exibe a resposta no chat
    fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
            messageElement.textContent = data.candidates[0].content.parts[0].text; // Insere a resposta no chat
        })
        .catch(() => {
            messageElement.textContent = "Oops, Algo deu errado"; // Exibe erro caso a requisição falhe
        })
        .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight)); // Rolagem automática para a última mensagem
}

// Função para processar a mensagem do usuário e gerar a resposta do chatbot 
const handleChat = () => {
    userMessage = chatInput.value.trim(); // Obtém o texto digitado e remove espaços extras
    if (!userMessage) return; // Se estiver vazio, não faz nada

    chatbox.appendChild(createChatLi(userMessage, "outgoing")); // Adiciona a mensagem do usuário ao chat
    chatbox.scrollTo(0, chatbox.scrollHeight); // Rolagem automática para o final

    setTimeout(() => {
        // Exibe uma mensagem temporária de "Pensando..." enquanto o chatbot processa
        const incomingChatLi = createChatLi("Pensando...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi); // Chama a função para obter resposta do chatbot
    }, 600);
}

// Alterna a visibilidade do chatbot ao clicar no botão
chatbotTogller.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

// Envia a mensagem ao clicar no botão de envio
sendChatBtn.addEventListener("click", handleChat);

