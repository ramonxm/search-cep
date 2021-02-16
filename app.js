let submitButton = document.querySelector('.app form button')
let zipCodeField = document.querySelector('.app form input')
let content = document.querySelector('.app main')

submitButton.addEventListener('click', run)

function run(event) {
    event.preventDefault()
    let zipCode = zipCodeField.value
    zipCode = zipCode.replace(' ','')
    zipCode = zipCode.replace('.','')
    zipCode = zipCode.trim()
    
    axios
        .get('https://viacep.com.br/ws/' + zipCode + '/json/')
        .then(function(response){
            if(response.data.erro){
               throw new Error('CEP inválido')
            }
            content.innerHTML = ''
            createLine(response.data.logradouro)
            createLine(response.data.bairro)
            createLine(response.data.localidade + '/' + response.data.uf)
        })
        .catch(function(error){
            console.log(error)
            content.innerHTML = ''
            createLine('Ops! Algo deu errado.')
        })
    }

function createLine(text){
    let line = document.createElement('p')
    var text = document.createTextNode(text)

    line.appendChild(text)
    content.appendChild(line)
}