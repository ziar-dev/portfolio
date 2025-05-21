const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

// Fonction pour afficher un message dans le chat
function addMessage(text, sender = "bot") {
  const msg = document.createElement("div");
  msg.classList.add("chat-message", sender);
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Fonction pour appeler l’API OpenAI via ton backend sécurisé
async function sendToChatGPT(message) {
  addMessage("Analyse en cours... ⏳", "bot");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    document.querySelector(".bot:last-of-type").remove(); // supprime "Analyse en cours"
    addMessage(data.reply || "❌ Aucun diagnostic reçu. Réessayez.", "bot");

  } catch (error) {
    document.querySelector(".bot:last-of-type").remove();
    addMessage("❌ Une erreur est survenue. Veuillez réessayer plus tard.", "bot");
    console.error("Erreur lors de l'appel API :", error);
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
