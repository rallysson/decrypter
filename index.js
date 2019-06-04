require("dotenv").config();
const { get } = require("axios");
const fs = require("fs");
const request = require("request");
const sha1 = require("js-sha1");
const { getSlug, getDecodedString } = require("./utils");

get(getSlug("generate-data"))
  .then(({ data }) => {
    fs.writeFileSync("answer.json", JSON.stringify(data));
    const decifrado = getDecodedString(data)
    
    const respostaDesafio = {
      ...data,
      decifrado,
      resumo_criptografico: sha1(decifrado)
    };
    
    fs.writeFileSync("answer.json", JSON.stringify(respostaDesafio));
    
    let formData = {
      answer: fs.createReadStream(__dirname + "/answer.json")
    };
  
    request.post(
      { url: getSlug("submit-solution"), formData },
      (err, _httpResponse, body) => {
        if (err) {
          return console.error("Erro ao enviar o Arquivo:", err);
        }
        console.log("Enviado Com sucesso, resposta:", body);
      }
    );
  })
  .catch(e => console.error(e.error || e.message));
