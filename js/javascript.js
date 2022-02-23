const funcaoPrincipal = () => {//array function
    const inputEmail = document.querySelector('input[type="email"]')
    const inputSenha = document.querySelector('input[type="senha"]')
    const botaoLogin = document.querySelector('.loginButton')

    //verificar se o botao existe
    if (botaoLogin) {
        botaoLogin.addEventListener('click', (evento) => {
            evento.preventDefault()//para evitar erros padrões

            botaoLogin.textContent = '...loading'

            //usar a API fetch que fornece uma interface javascript para acessar e manipular partes do piperline do HTML
            fetch('https://reqres.in/api/login', {
                method: 'POST',
                //headers, para informar o tipo do arquivo
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: inputEmail.value,
                    password: inputSenha.value
                })
            })
                //acessar classe then responsavel pelo o recebimento da resposta do json
                .then((response) => {
                    //vamos ver primeiro se a response é diferente de status=200
                    if (response.status !== 200) {
                        return manipularErro()//cortando o fluxo
                    }
                    manipularSuccess()
                })
                //usar o catch para pegar qualquer erro na requisição 
                .catch(() => {
                    manipularErro();
                })
        })
    }

    //função para remover classe (success) e adicionar classe (error), e adicionar no textContent a frase = 'error =('
    const manipularErro = () =>{
        botaoLogin.classList.remove('success')
        botaoLogin.classList.add('erro')
        botaoLogin.textContent = 'erro =('
    }

    const manipularSuccess = () => {
        botaoLogin.classList.remove('error')
        botaoLogin.classList.add('success')
        botaoLogin.textContent = 'Enviado :)'
    }

    const validarEmail = (evento) => { 
        const input = evento.currentTarget//alvo atual
        //agora vamos usar o regex que é uma expressão regular para obter uma string vinda de um conjunto de caracteres.
        //regex (expressão regular) vai receber codigo para validação de email
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //agora vamos testar o regex
        const emailTest = regex.test(input.value)
        //vamos verificar a resposta do email teste 
        if (!emailTest && emailTest !== "eve.holt@reqres.in") {
            botaoLogin.setAttribute('disabled', 'disabled')
            //agora adicionar a class error no proximo elemento seguinte que está em baixo do inputEmail (o span seguinte)
            input.nextElementSibling.classList.add('error')//add class error
        } else {
            botaoLogin.removeAttribute('disabled')//remover atributo disabled
            input.nextElementSibling.classList.remove('error')//remover class error
        }
    }

    //vamos validar o campo senha
    const validarSenha = (evento) => { //vai ser uma array function
        const input = evento.currentTarget //alvo atual
        //vamos definir o tamanho da senha
        if (input.value.length < 8 || input.value !== "cityslicka") {
            //vamos desabilitar o botão Login para não deixar fazer login
            botaoLogin.setAttribute('disabled', 'disabled')
            //agora adicionar a class error no proximo elemento seguinte que está em baixo do inputEmail (o span seguinte)
            input.nextElementSibling.classList.add('error')
        } else {
            //vamos remover tudo que foi feito antes
            botaoLogin.removeAttribute('disabled')
            input.nextElementSibling.classList.remove('error')
        }

    }
       
    //testar a função validarEmail
    inputEmail.addEventListener('input', validarEmail)
    //testar a função ValidarSenha
    inputSenha.addEventListener('input', validarSenha)
 
}
//onload quando carregar o html vai chamar a função iniciar
window.onload = funcaoPrincipal