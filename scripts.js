document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.querySelector("main");

    window.addEventListener("hashchange", () => {
        renderPage(location.hash);
    });

    renderPage(location.hash || "#home");

    function renderPage(hash) {
        switch (hash) {
            case "#anxiety":
                mainContent.innerHTML = `
                    <section class="full-section anxiety-section">
                        <h1>Controle de Ansiedade</h1>
                        <p>Entenda como a ansiedade afeta seu corpo e mente.</p>
                    </section>

                    <section class="content-box">
                        <h2>Técnicas de Respiração</h2>
                        <ul>
                            <li>Respiração 4-7-8: Inspire por 4s, segure por 7s, expire por 8s.</li>
                            <li>Respiração abdominal: foque em encher e esvaziar o abdômen lentamente.</li>
                        </ul>
                    </section>

                    <section class="content-box light">
                        <h2>Rotina para Reduzir Ansiedade</h2>
                        <p>Exercícios leves, alimentação equilibrada e sono regular ajudam a estabilizar o emocional.</p>
                    </section>
                `;
                break;

            case "#meditation":
                mainContent.innerHTML = `
                    <section class="full-section meditation-section">
                        <h1>Meditação Guiada</h1>
                        <p>Encontre um momento de paz no seu dia.</p>
                    </section>

                    <section class="content-box">
                        <h2>Áudio: Respiração Consciente</h2>
                        <audio controls>
                            <source src="audio/respiracao_consciente.mp3" type="audio/mpeg">
                            Seu navegador não suporta o elemento de áudio.
                    </section>

                    <section class="content-box light">
                        <h2>Dicas para Meditar</h2>
                        <ul>
                            <li>Encontre um lugar silencioso.</li>
                            <li>Feche os olhos e concentre-se na respiração.</li>
                            <li>Se distrações surgirem, apenas volte ao foco.</li>
                        </ul>
                    </section>
                `;
                break;

            case "#motivation":
               mainContent.innerHTML = `
                    <section class="full-section motivation-section">
                        <h1>Mensagens de Motivação</h1>
                        <p>Alimente sua mente com positividade.</p>
                    </section>

                    <section class="quote-box">
                        <blockquote>"Mesmo que ninguém veja, continue. Você é sua maior motivação."</blockquote>
                        <blockquote>"A força está em levantar mesmo quando tudo diz para parar."</blockquote>
                    </section>

                    <section class="content-box light">
                        <h2>Dicas para Manter a Motivação</h2>
                        <ul>
                            <li>Estabeleça metas pequenas e diárias.</li>
                            <li>Celebre pequenas vitórias.</li>
                            <li>Afaste-se de ambientes e pessoas negativas.</li>
                        </ul>
                    </section>
                `;
                break;

            case "#help":
               mainContent.innerHTML = `
                    <section class="full-section help-section">
                        <h1>Ajuda Imediata</h1>
                        <p>Se estiver em perigo ou em crise emocional, procure ajuda imediatamente.</p>
                    </section>

                    <section class="help-numbers">
                         <div class="phone-number">
                            <strong>CVV</strong>
                            <p>Apoio emocional 24h</p>
                            <p><strong>Telefone:</strong> 188</p>
                        </div>
                        <div class="phone-number">
                            <strong>Polícia</strong>
                            <p>Emergências</p>
                            <p><strong>Telefone:</strong> 190</p>
                        </div>
                        <div class="phone-number">
                            <strong>Bombeiros</strong>
                            <p>Emergências</p>
                            <p><strong>Telefone:</strong> 193</p>
                        </div>
                    </section>

                    <section class="content-box light">
                        <h2>Quando procurar ajuda?</h2>
                        <p>Se sentir que não está conseguindo lidar sozinho, busque apoio profissional ou ligue para os serviços indicados.</p>
                    </section>
                `;
                break;

            default:
                mainContent.innerHTML = `
                    <section class="intro full-section">
                        <h1>Bem-vindo ao ALVA Chatbot</h1>
                        <p>Seu assistente emocional, sempre ao seu lado.</p>
                    </section>

                    <section class="card-section">
                        <div class="info-card">
                            <h2>Ansiedade</h2>
                            <p>Aprenda técnicas práticas para controlar a ansiedade.</p>
                        </div>
                        <div class="info-card">
                            <h2>Meditação</h2>
                            <p>Explore áudios guiados para acalmar a mente e restaurar o equilíbrio.</p>
                        </div>
                        <div class="info-card">
                            <h2>Motivação</h2>
                            <p>Receba mensagens diárias para manter o foco e a positividade.</p>
                        </div>
                    </section>

                    <section class="highlight-section">
                        <h2>Você não está sozinho</h2>
                        <p>ALVA é uma ferramenta pensada para acolher e orientar.</p>
                    </section>
                `;
        }
    }
});

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

