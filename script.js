const $modal = document.querySelector('.modal-container')
const $tbody = document.querySelector('tbody')
const $modalInputNome = document.querySelector('#modal-nome')
const $modalInputFuncao = document.querySelector('#modal-funcao')
const $modalInputSalario = document.querySelector('#modal-salario')
const $btnSalvar = document.querySelector('#btnSave')

let $itens
let id

function openModal(edit = false, index = 0) {
    $modal.classList.add('active')

    $modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            $modal.classList.remove('active')
        }
    }

    if (edit) {
        $modalInputNome.value = $itens[ index ].nome
        $modalInputFuncao.value = $itens[ index ].funcao
        $modalInputSalario.value = $itens[ index ].salario
        id = index
    } else {
        $modalInputNome.value = ''
        $modalInputFuncao.value = ''
        $modalInputSalario.value = ''
    }
}

function insertItem(item, index) {
    let $tr = document.createElement('tr')
    
    $tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.funcao}</td>
        <td>R$ ${item.salario}</td>
        <td class="acao">
            <button onclick="editItem(${index})"><i class='bx bxs-edit' ></i></button>
        </td>
        <td class="acao">
            <button onclick="deleteItem(${index})"><i class='bx bxs-trash' ></i></button>
        </td>
    `
    $tbody.appendChild($tr)
}

function editItem(index) {
    openModal(true, index)
}

function deleteItem(index){
    $itens.splice(index, 1)
    setItensBD()
    loadItens()
}

$btnSalvar.addEventListener('click', (ev) => {
    
    if ($modalInputNome.value == '' || $modalInputFuncao == '' || $modalInputSalario == '') {
        return
    }
    
    ev.preventDefault()

    if (id !== undefined) {
        $itens[id].nome = $modalInputNome.value
        $itens[id].funcao = $modalInputFuncao.value
        $itens[id].salario = $modalInputSalario.value
    } else {
        $itens.push({'nome': $modalInputNome.value, 'funcao': $modalInputFuncao.value, 'salario': $modalInputSalario.value})
    }
    
    setItensBD()

    $modal.classList.remove('active')
    loadItens()
    id = undefined
})

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify($itens))

function loadItens() {
    $itens = getItensBD()
    $tbody.innerHTML = ''
    $itens.forEach((item, index)=> {
        insertItem(item, index)
    });
}

loadItens()