/**
 * Este exemplo é para esclarecer a diferença de uma função de `callback` para uma `promise`
 * 
 * Uma `promise` pode ser considerado um callback, mas a sua diferença é o seu retorno é uma
 * promessa no futuro.
 * 
 * No exemplo abaixo temos tres funções de `setTimeOut` que serão executadas após um determinado
 * tempo. Mais abaixo ainda, temos três funções que farão a leitura desse mesmo arquivo usando 
 * `promises`.
 * 
 * Foi criada um função chamada `read` que em sua estrutura, por ordem serão chamadas as funções 
 * de `timeOut`, e logo abaixo as funções de leitura de arquivo.
 * 
 * Veja que ao executar o script com o comando `node second-process.js` será exibido primeiramente
 * a leitura dos arquivos e após isso as funções de `timeOut` (em ordem de menor tempo).
 * 
 * O que ocorreu foi que, mesmo todas funções sendo chamadas usando o `await`, foram aguardadas
 * somente as funções de leitura de arquivo, pois quando criado uma `promise` o node entende que,
 * a função chamada possui um valor no futuro para retornar e por isso deve aguardar o resultado. 
 * Equanto as funções de callback simplesmente são executadas quando finalizadas. 
 * 
 * -- CRIAR A INSTRUÇÃO DE COMO FUNCIONA O NODE --
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

// CALBACK
const set = setTimeout(() => {
    console.log(1);
}, 3000);

const set2 = setTimeout(() => {
    console.log(2);
}, 2000);

const set3 = setTimeout(() => {
    console.log(3);
}, 1000);

// PROMISE
const init = async() => {
    console.log('1', await readFile('games.log'));
}

const init2 = async() => {
    console.log('2', await readFile('games.log'));
}

const init3 = async() => {
    console.log('3', await readFile('games.log'));
}

const read = async () => {
    await set;
    await set2;
    await set3;

    await init();
    await init2();
    await init3();
}

read();