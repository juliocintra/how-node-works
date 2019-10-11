/**
 * Ao executar esse arquivo com o comando `node process.js`, o node começara a leitura do script;
 * 
 * Veja que o mesmo possui a função `init` usando `async await`, porém o node 
 * NÃO irá esperar a chamada desta função para que o restante do arquivo seja lido.
 * 
 * Isso acontece pois o node trabalha com I/O não bloqueante, fazendo com que funções 
 * que exigem mais processamento sejam jogadas para background (em outra thread), e
 * enquanto não resolvidas ele continuará a leitura do arquivo sem esperar o resultado da PROMISE.
 * 
 * Mesmo utilizando uma função com `await` ele não esperou, pois o restante do arquivo não está
 * dentro de uma função `async`, fazendo com que o node continue seu fluxo normal, e quando a PROMISE 
 * estiver resolvida será mostrado seu valor.
 * 
 * (Para ver como este exemplo funcionaria de forma síncrona, vá para o script `process-waiting.js`)
 * 
 * O responsável por verificar se existe alguma função resolvida é o chamado `EVENT LOOP`, pois
 * sua finalidade é buscar na `TASK` funções de callback ou promise já resolvidas para
 * devolve-las a `STACK` com o seu devido valor.
 * 
 * `STACK` = é a pilha de ações a serem feitas pelo script.
 * `BACKGROUND(libuv)` = é para onde funções com processamento são jogados para serem executadas.
 * `TASK` = é onde as taferas executadas pela libuv vão após serem terminadas.
 * `EVENT LOOP` = é quem fica observando na TASK as tarefas em background que foram finalizadas e 
 *  as devolve para a STACK, podendo assim mostrar seu valor.
 */

const fs = require('fs');

console.log(1);

const readFile = file => new Promise((resolve, reject) => {
    fs.readFile(file, (err, content) => {
        if (err) {
            reject(err);
        } else {
            resolve(content);
        }
    })
})

const init = async() => {
    console.log(await readFile(__filename));
}

init();

console.log(2);
console.log(3);