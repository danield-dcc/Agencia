const imgDestino = document.querySelector("#imgDestino");
const outCadastros = document.querySelector("#outCadastros")

const rbCanada = document.querySelector("#rbCanada");
const rbFilipinas = document.querySelector("#rbFilipinas");
const rbAustralia = document.querySelector("#rbAustralia");
const rbFranca = document.querySelector("#rbFranca");
const rbJapao = document.querySelector("#rbJapao");

let destino = "Canada";

const mudarFoto = () => {
    if (rbCanada.checked) {
        imgDestino.src = 'canada.jpg';
        destino = "Canada";
    }
    else if (rbFilipinas.checked) {
        imgDestino.src = 'filipinas.jpg';
        destino = "Filipinas";
    }
    else if (rbAustralia.checked) {
        imgDestino.src = 'australia.jpg';
        destino = "Australia";
    }
    else if (rbFranca.checked) {
        imgDestino.src = 'franca.jpg';
        destino = "França";
    }
    else if (rbJapao.checked) {
        imgDestino.src = 'japan.jpg'
        destino = "Japão";
    }

    console.log(destino);
}
rbCanada.addEventListener('change', mudarFoto);
rbFilipinas.addEventListener('change', mudarFoto);
rbAustralia.addEventListener('change', mudarFoto);
rbFranca.addEventListener('change', mudarFoto);
rbJapao.addEventListener('change', mudarFoto);


//cadastrar pessoas
const cadastarPessoa = () => {
    let inNome = document.querySelector('#inNome');
    let inEmail = document.querySelector("#inEmail");

    let nome = inNome.value;  //obter o conteudo de inNome
    let email = inEmail.value;  //obter o conteudo de inEmal


      // Validar os dados de entrada
  if (email == "" || nome == "") {
    alert("Preencha todos os campos corretamente!");
    inNome.focus();
    return;
  }

    //verificar se há localStorage
    if (localStorage.getItem("pessoasCadastradas")) {
        //se houver conteudo
        //obter o conteudo salvo

        let pessoasCadastradas = localStorage.getItem("pessoasCadastradas") + ";" + nome;
        let emailCadastrado = localStorage.getItem("emailCadastrado") + ";" + email;
        let destinoCadastrado = localStorage.getItem("destinoCadastrado") + ";" + destino;

        //salvar
        localStorage.setItem("pessoasCadastradas", pessoasCadastradas);
        localStorage.setItem("emailCadastrado", emailCadastrado);
        localStorage.setItem("destinoCadastrado", destinoCadastrado);
    } else {
        //sava o primeiro dado (sem o ';')
        localStorage.setItem("pessoasCadastradas", nome);
        localStorage.setItem("emailCadastrado", email);
        localStorage.setItem("destinoCadastrado", destino);
    }

    mostrarLista();

}
//refêrencia ao botão
let btCadastrar = document.getElementById('btCadastrar');
btCadastrar.addEventListener('click', cadastarPessoa);


const mostrarLista = () => {
    let outCadastros = document.querySelector("#outCadastros");
    //verificar se a lista não esta vazia

    if (!localStorage.getItem("pessoasCadastradas")) {
        outCadastros.textContent = "";
        return;
    }

    let conteudoNomes = localStorage.getItem("pessoasCadastradas").split(";");
    let conteudoEmail = localStorage.getItem("emailCadastrado").split(";");
    let conteudoDestino = localStorage.getItem("destinoCadastrado").split(";");

    let linhas = "";

    for (let i = 0; i < conteudoNomes.length; i++) {
        linhas += "Nome: " + conteudoNomes[i] + " -" + " Email:" + conteudoEmail[i] + " -" + " Destino:" + conteudoDestino[i] + "\n"
    }

    outCadastros.textContent = linhas;

}
mostrarLista();


const excluir = () => {
    if (!localStorage.getItem("pessoasCadastradas")) {
        alert('Não há Pessoas Cadastradas!')
    }

    let listaPessoas = localStorage.getItem("pessoasCadastradas").split(";");
    let listaEmail = localStorage.getItem("emailCadastrado").split(";");
    let listaDestino = localStorage.getItem("destinoCadastrado").split(";");
    listaPessoas.shift();
    let linhasPessoas = ""

    //Excuir Pessoas
    for (let i = 0; i < listaPessoas.length; i++) {
        linhasPessoas += listaPessoas[i] + ";";
        let pessoas = linhasPessoas.substr(0, linhasPessoas.length - 1);
        localStorage.setItem("pessoasCadastradas", pessoas);
    }

    //excluir email
    listaEmail.shift();
    let linhasEmail = ""
    for (let i = 0; i < listaEmail.length; i++) {
        linhasEmail += listaEmail[i] + ";";
        let email = linhasEmail.substr(0, linhasEmail.length - 1);
        localStorage.setItem("emailCadastrado", email);
    }

    //excluir destino
    listaDestino.shift();
    let linhasDestino = ""
    for (let i = 0; i < listaDestino.length; i++) {
        linhasDestino += listaDestino[i] + ";";
        let destino = linhasDestino.substr(0, linhasDestino.length - 1);
        localStorage.setItem("destinoCadastrado", destino);
    }


    if (linhasPessoas.length == 0) {
        localStorage.removeItem("pessoasCadastradas");
        localStorage.removeItem("emailCadastrado");
        localStorage.removeItem("destinoCadastrado");
    }

    mostrarLista();
}
let btExcluir = document.querySelector("#btExcluir");
btExcluir.addEventListener("click", excluir);


//funcção para excluir todos
const limparLista = () => {
    if (!localStorage.getItem("pessoasCadastradas")) {
        alert('Não há Pessoas Cadastradas!')
    }else{
        if (confirm("Deseja excluir todos os participantes?")) {
            localStorage.removeItem("pessoasCadastradas");
            localStorage.removeItem("emailCadastrado");
            localStorage.removeItem("destinoCadastrado");
        }
        
    }

    
    mostrarLista();
}
let btLimpar = document.getElementById("btLimpar");
btLimpar.addEventListener("click", limparLista);



//botão sortear
const sortear = () => {
    if (!localStorage.getItem("pessoasCadastradas")) {
        alert('Não há Pessoas Cadastradas!')
    }

    let participantes = localStorage.getItem("pessoasCadastradas").split(";");
 


    participantes = participantes[Math.floor(Math.random() * participantes.length)]; //random do nome
    let mensagem = "Parabéns " + participantes + " você é o(a) grande vencedor(a)!";

    alert(mensagem);

   // console.log(participantes);
}
let btSortear = document.querySelector('#btSortear');
btSortear.addEventListener("click", sortear)

