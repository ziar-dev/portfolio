// /api/chat.js — fonction serverless pour Vercel
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ message: 'Message requis' });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // Sécurisé ici !
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Tu es un technicien informatique. Lorsque l’utilisateur décrit un problème (ex: Wifi, disque dur, lenteur…), tu poses 1 ou 2 questions techniques si nécessaire, puis tu fournis un diagnostic structuré, avec des causes probables, des recommandations claires, et un ton rassurant."
          },
          { role: "user", content: message }
        ],
        temperature: 0.6
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Réponse vide. Essayez à nouveau.";

    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur IA", error: err.message });
  }
}
