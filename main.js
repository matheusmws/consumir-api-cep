'use strict';

const limparFormulario = (endereco) => {
    document.getElementById('endereço').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('estado').value = "";
}

const preencherFormulario = (endereco) => {
    document.getElementById('endereço').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

const cepValido = (cep) => cep.length == 8 && /^[0-9]+$/.test(cep);  //expressão regular para verificar se são números de 0 a 9.


const pesquisarCep = async() => {
    limparFormulario();

    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();

        if (endereco.hasOwnProperty('erro')) {
            console.log(endereco);
            document.getElementById('endereço').value = 'CEP não encontrado!';

        } else {
        preencherFormulario(endereco);
        }
    } else {
        document.getElementById('endereço').value = 'Digite CEP válido!';
    }
}
document.getElementById('cep').addEventListener('focusout', pesquisarCep);