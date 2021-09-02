export function valida(input){
    const tipoInput = input.dataset.tipo

    if(validadores[tipoInput]){
        validadores[tipoInput](input)
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalido')
    }else {
        input.parentElement.classList.add('input-container--invalido')
    }
    
}

const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo nome não pode estar vazio'
    },
    email: {
        valueMissing: 'O campo email não pode estar vazio',
        typeMisMatch: 'O email digitado não é valido'    
    },
    senha: {
        valueMissing: 'O campo senha não pode estar vazio',
        patternMisMatch: 'O email digitado não é valido'    
    },
    cpf: {
        valueMissing: 'O campo cpf não pode estar vazio',
        customError: 'O cpf digitado não é valido' 
    }
}

const validadores = {
    dataNascimento:input => validaDataNascimento(input),
    cpf:input => validaCPF(input)
} 
const dataNascimento = document.querySelector('#nascimento');

dataNascimento.addEventListener('blur', (evento) => {
    validaDataNascimento(evento.target)
})

function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value)
    let mensagem = ""

    if(!maiorQue18(dataRecebida)){
        mensagem = "Você deve ser maior que 18 anos"
    }

    input.setCustomValidity(mensagem)
}

function maiorQue18(data) {
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

}

function validaCPF(input){
    const cpfFormatado = input.value.replace(/\D/g, "")
    let mensagem = "";

    if(!checaCPFRepetidos(cpfFormatado)){
        mensagem = "o cpf digitado não é válido"
    }

    input.setCustomValidity(mensagem)
}

function checaCPFRepetidos(cpf){
    const valoresRepetidos = [
        '000000000000',
        '11111111111',
        '22222222222',
        '33333333333'
    ]
    let cpfValido = true;

    valoresRepetidos.forEach(valor => {
        if(valor = cpf) {
            cpfValido = false
        }
    })

    return cpfValido
}