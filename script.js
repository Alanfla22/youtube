const content = document.querySelector(".content");
const treino = document.getElementById("frase");
const fileInput = document.querySelector("input[type=file]");

var tokens = [];

if (localStorage) {

    var frase_ingles = localStorage.key(0).split("-")[1];
    var frase_portugues = localStorage.getItem(localStorage.key(0));

    tokens.push(frase_portugues);
    tokens.push(tokenizacao(frase_ingles));
    tokens.push(frase_ingles);
    
    treino.innerText = tokens[0];

} else {

    content.innerText = "Sem frases";

}


fileInput.addEventListener("change", previewFile);

function previewFile() {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    // this will then display a text file
    content.innerText = "Importado!!!";
    const linhas = reader.result.split(/\r\n|\n/);
    escrever(linhas);


  });

  if (file) {
    
    reader.readAsText(file);
    
  }
}

function escrever(linhas) {

    for (var i = 0; i < linhas.length; i = i + 2) {
        localStorage.setItem(`${i}-` + linhas[i], linhas[i + 1]);
    }  

}



function tokenizacao(frase) {
    
    const caracteres = ['.', '\n', '?', '¿', ',', '¡', '!'];

    caracteres.forEach(c => {
        frase = frase.split(c).join('');
    });

    let tokens = frase
    .split(' ')
    .map(token => token.toLowerCase());

    // Embaralhamento (Fisher-Yates)
    for (let i = tokens.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tokens[i], tokens[j]] = [tokens[j], tokens[i]];
    }

    return tokens.join(' ') + ' ';
}




function mudarFrase() {

    var lista = [];

    for (let i = 0; i < localStorage.length; i++) {

        lista.push([localStorage.key(i).split("-")[0], localStorage.key(i).split("-")[1], localStorage.getItem(localStorage.key(i))]);


    }

    lista.sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

    var frases = lista.shift();

    lista.push(frases);

    localStorage.clear();

    for (var i = 0; i < lista.length; i++) {
        localStorage.setItem(`${i}-` + lista[i][1], lista[i][2]);
    }

    tokens[0] = lista[0][2];
    tokens[1] = tokenizacao(lista[0][1]);
    tokens[2] = lista[0][1];

    treino.innerText = tokens[0];


}

function alteracao() {

    var primeiro = tokens.shift();
    tokens.push(primeiro);
    treino.innerText = tokens[0];   

}














