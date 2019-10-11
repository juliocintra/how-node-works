/**
 * Neste exemplo podemos ver que temos as mesmas funções do arquivo `process.js`.
 * 
 * Com a diferença de que foi adicionada a função `waitingResponse`, que ao ser executada
 * é mostrado o primeiro `console.log()` mas como podemos oberservar, dessa vez é esperado 
 * o retorno da função `init`, pois todo o contexto que deve ser mostrado está dentro 
 * de uma função `async` e é utilizado o `await` para esperar o retorno da função;
 *  
 */

const fs = require('fs');

const readFile = file => new Promise((resolve, reject) => {
    fs.readFile(file, (err, content) => {
        if (err) {
            reject(err);
        } else {
            resolve(content);
        }
    })
})

const init = async () => {
    console.log(await readFile(__filename));
}

async function waitingResponse() {
    console.log(1);

    await init();

    console.log(2);
    console.log(3);
}

waitingResponse();