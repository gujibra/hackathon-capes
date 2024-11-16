import Groq from "groq-sdk";

const api_Key = ""; //tem q arrumar isso
const groq = new Groq({ apiKey: api_Key.toString(), dangerouslyAllowBrowser: true});



export async function verificarDadosAi(pergunta) {
  try {    
    const content = `Forneça um relatorio sobre os dados suspeitos direto do texto abaixo,  verificando os dados apresentados se tem algum errado ou suspeito como dados totalmente anomalos um do outro, sem frases como "Aqui está a analise" ou "Este é o que encontrei": ` + pergunta;
   
    const chatCompletion = await getGroqChatCompletion(content);  
    const resposta = chatCompletion.choices[0]?.message?.content || "Sem resposta.";
    
    return resposta; 
  } catch (error) {
    return "Erro ";
  }
}

export async function verficarIncertezasiaAI(pergunta) {
  try {    
    const content = `Forneça um relatorio sobre as incertezas presente no texto, verificando se essas incertezas podem gerar novas hipoteses ou nao, sem frases como "Aqui está a analise" ou "Este é o que encontrei": ` + pergunta;
   
    const chatCompletion = await getGroqChatCompletion(content);  
    const resposta = chatCompletion.choices[0]?.message?.content || "Sem resposta.";
    
    return resposta; 
  } catch (error) {
    return "Erro ";
  }
  
}

export async function verficarOrtografiaAI(pergunta) {
  try {    
    const content = `Forneça um relatorio sobre a coesão e coerencia,  verificando os dados apresentados se tem algo escrito errado ou de maneira confusa, apenas fale oque pode estar de errado, sem frases como "Aqui está a analise" ou "Este é o que encontrei": ` + pergunta;
   
    const chatCompletion = await getGroqChatCompletion(content);  
    const resposta = chatCompletion.choices[0]?.message?.content || "Sem resposta.";
    
    return resposta; 
  } catch (error) {
    return "Erro ";
  }
  
}

export async function getGroqChatCompletion(conteudo) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: conteudo
      },
    ],
    model: "llama3-8b-8192",
  });
}
