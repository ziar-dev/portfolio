const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

// Ajoute un message dans l'interface
function addMessage(text, sender = "bot") {
  const msg = document.createElement("div");
  msg.classList.add("chat-message", sender);
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Envoie le message à ton backend sécurisé (API route Vercel)
async function sendToChatGPT(message) {
  addMessage("Analyse en cours... ⏳", "bot");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    // Supprime le message "Analyse en cours"
    document.querySelector(".bot:last-of-type").remove();

    // Affiche la réponse de ChatGPT
    addMessage(data.reply || "Je n’ai pas pu obtenir de réponse. Essayez de reformuler.", "bot");

  } catch (error) {
    document.querySelector(".bot:last-of-type").remove();
    addMessage("❌ Erreur : impossible de contacter l’IA. Vérifiez la connexion ou réessayez plus tard.", "bot");
  }
}

// Gère l’envoi du message utilisateur
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  userInput.value = "";

  await sendToChatGPT(message);
});
