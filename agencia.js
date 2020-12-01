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

    //Verificar se a pessoa já esta cadastrada
    if (localStorage.getItem("pessoasCadastradas")) {
        let participantes = localStorage.getItem("pessoasCadastradas").split(";");
        for (let i = 0; i < participantes.length; i++) {
            if (participantes[i] == nome) {
                alert("Pessoa já cadastrada!")
                inNome.focus();
                return;
            }
        }
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

    if (localStorage.getItem("pessoasCadastradas")) {
        //criar um vetor com a list de pessoas 
        let conteudoNomes = localStorage.getItem("pessoasCadastradas").split(";");
        let conteudoEmail = localStorage.getItem("emailCadastrado").split(";");
        let conteudoDestino = localStorage.getItem("destinoCadastrado").split(";");

        //criar referência ao divQuadro(local onde as tags h5 serão inseridas)
        let divQuadro = document.getElementById("divQuadro")

        for (let i = 0; i < conteudoNomes.length; i++) {
            let h5 = document.createElement("h5");

            let participantes = document.createTextNode(conteudoNomes[i]);
            let email = document.createTextNode(conteudoEmail[i]);
            let destino = document.createTextNode(conteudoDestino[i]);
            let h5Nome = document.createTextNode("Nome: ")
            let h5email = document.createTextNode(" - Email: ")
            let h5destino = document.createTextNode(" - Destino: ")
            h5.appendChild(h5Nome)
            h5.appendChild(participantes)   //participantes é filho de h5
            h5.appendChild(h5email)
            h5.appendChild(email)   //participantes é filho de h5
            h5.appendChild(h5destino)
            h5.appendChild(destino)   //participantes é filho de h5
            divQuadro.appendChild(h5);      //h5 filho de divQuadro
        }
    }


}
mostrarLista();

const selecionar = () => {

    let h5 = document.getElementsByTagName("h5");
    let numh5 = h5.length;

    if (numh5 == 0) {
        alert("Não há participantes para selecionar");
        return
    }

    let aux = -1; //variavel auxiliar para indicar linha selecionada
    //percorrendo a lista de elementos h5 inseridos na pagina
    for (let i = 0; i < numh5; i++) {
        //se a tag é da class ParticipanteSelecionado (indica que esta selecionada)
        if (h5[i].className == "ParticipanteSelecionado") {
            h5[i].className = "Normal"  //troca para normal
            aux = i;                    //muda valro da aux
            break                       //sai da repetição
        }
    }
    //se a linha selecionada for a última, voltar para o ínicio
    if (aux == numh5 - 1) {
        aux = -1;
    }

    h5[aux + 1].className = "ParticipanteSelecionado"; //mudar o estilo da pxima tag

}
let btSelecionar = document.querySelector('#btSelecionar');
btSelecionar.addEventListener("click", selecionar);


const excluir = () => {
    let h5 = document.getElementsByTagName("h5");           //obtém as tags h5 da página
    let numh5 = h5.length                                   //obtem quantidade de h5

    let aux = -1;

    for (let i = 0; i < numh5; i++) {
        //se a tag é da class ParticipanteSelecionado (indica que esta selecionada)
        if (h5[i].className == "ParticipanteSelecionado") {
            h5[i].className = "Normal"  //troca para normal
            aux = i;                    //muda valro da aux
            break                       //sai da repetição
        }
    }
    //se não há participante selecionado
    if (aux == -1) {
        alert("Primeiro selecione um participante para excluí-lo")
    }

    //confirmação    
    let listaPessoas = localStorage.getItem("pessoasCadastradas").split(";");
    let ok = confirm("Deseja excluir " + listaPessoas[aux] + "?")
    if (ok == false) {
        return;
    } else {

        let listaPessoas = localStorage.getItem("pessoasCadastradas").split(";");
        let listaEmail = localStorage.getItem("emailCadastrado").split(";");
        let listaDestino = localStorage.getItem("destinoCadastrado").split(";");

        //Excuir Pessoas
        listaPessoas.splice(aux, 1);
        localStorage.setItem("pessoasCadastradas", listaPessoas.join(';'));

        //excluir email
        listaEmail.splice(aux, 1);
        localStorage.setItem("emailCadastrado", listaEmail.join(';'));

        //excluir destino
        listaDestino.splice(aux, 1);
        localStorage.setItem("destinoCadastrado", listaDestino.join(';'));

        if (listaPessoas.length == 0) {
            localStorage.removeItem("pessoasCadastradas");
            localStorage.removeItem("emailCadastrado");
            localStorage.removeItem("destinoCadastrado");
        }
    }
    location.reload();
    mostrarLista();
}
let btExcluir = document.querySelector("#btExcluir");
btExcluir.addEventListener("click", excluir);


//funcção para excluir todos
const limparLista = () => {
    if (!localStorage.getItem("pessoasCadastradas")) {
        alert('Não há Pessoas Cadastradas!')
    } else {
        if (confirm("Deseja excluir todos os participantes?")) {
            localStorage.removeItem("pessoasCadastradas");
            localStorage.removeItem("emailCadastrado");
            localStorage.removeItem("destinoCadastrado");
        }
    }

    location.reload();
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
    //sortear vencedor
    let vencedor = participantes[Math.floor(Math.random() * participantes.length)]; //random do nome


    //buscar o pais do vencedor
    let cont = -1;
    for (let i = 0; i < participantes.length; i++) {
        cont++
        if (vencedor == participantes[i]) {
            break
        }
    }
    let locais = localStorage.getItem("destinoCadastrado").split(";");
    let localVencedor = "";
    for (let i = 0; i < locais.length; i++) {
        if (i == cont) {
            localVencedor = locais[i]
        }
    }

    alert("Parabéns " + vencedor + "! Você ganou uma viagem para\n" +
        "------------------------------------------\n" +
        localVencedor);

    
}
let btSortear = document.querySelector('#btSortear');
btSortear.addEventListener("click", sortear)

