import express from 'express';
import fs from 'fs';
import cors from 'cors';

const host = "127.0.0.1";
const port = 3000;
const app = express();
app.use(cors());

let content = fs.readFileSync('./public/index.sjs').toString();

let htmlContent = "";

// IF
const regexEndIf = /<\/if>/g;
const coincidences = content.match(regexEndIf);
for(let i = 0; i<coincidences.length; i++){

  const indexStart = content.indexOf("<if");
  const indexEnd = content.indexOf("</if>");

  if (indexStart !== -1 || indexEnd !== -1) {
    const ifTag = content.substring(indexStart, indexEnd);

    let ifContent = ifTag.replace(/<if[^>]*condition=\{([^}]*)\}[^>]*>|<\/if>/g, '').trim();
    ifContent = ifTag.replace(/<else>.*?<\/else>/gs, '').trim();
    const conditional = ifTag.replace(/.*?condition={([^}]*)}[\s\S]*/, '$1').trim();


    if(eval(conditional)){
      htmlContent+=ifContent;
      
    }else{
      const elseContent = ifTag.replace(/.*<else>(.*?)<\/else>.*/s, '$1').trim();
      htmlContent+=elseContent;
    }

    content = content.slice(indexEnd+5);
  }
}

// FOR
content = fs.readFileSync('./public/index.sjs').toString();
const regexEndFor = /<\/for>/g;
const coincidencesFor = content.match(regexEndFor);
for(let i = 0; i<coincidencesFor.length; i++){

  const indexStart = content.indexOf("<for");
  const indexEnd = content.indexOf("</for>");

  if (indexStart !== -1 || indexEnd !== -1) {
    const forTag = content.substring(indexStart, indexEnd).trim();
    const splitFor = forTag.replaceAll("\n", "").split(" ");

    const forNames = {
      "start": splitFor[1],
      "timer": splitFor[2],
      "advance": splitFor[3]
    }

    const contenidoFor = forTag.replace(/<for[^>]*>(.*?)/s, '$1').trim();
    console.log(contenidoFor);
    const forLoopString = `for (${forNames.start}; ${forNames.timer}; ${forNames.advance}) { 
      htmlContent+=contenidoFor;
    }`;
    eval(forLoopString);



    content = content.slice(indexEnd+5);
  }
}



app.get("/", (req, res)=>{
  res.send(htmlContent);
});

app.listen(port, host, ()=>{
	console.log("servidor funcionando en ", host,":",port);
})

