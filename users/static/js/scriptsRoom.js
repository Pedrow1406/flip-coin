let saldo = document.querySelector('#saldo');
let username = document.querySelector('#username');
let coin = document.querySelector(".coin");
let tailBtn = document.querySelector("#tail-button");
let headBtn = document.querySelector("#head-button");
let valor_sala_completo = document.querySelector("#valor-sala");
let button_container = document.querySelector('.buttons');

let saldo_valor = saldo.textContent.replace('Saldo: R$','');
let valor_sala = valor_sala_completo.textContent.replace('R$', '');


console.log(`${username.textContent} | ${saldo_valor}`);
console.log(`Valor Sala: ${valor_sala}`);


const url_get = headBtn.dataset.url;
const url_update = tailBtn.dataset.url;

async function getData(){
    const response = await fetch(url_get);
    const data = await response.json()
    const valorSala_saldoUser = {
        'room_value' : data.sala.valor_sala,
        'user_balance' : data.user.saldo,
    }
    console.log(valorSala_saldoUser);
    return  valorSala_saldoUser
};


tailBtn.addEventListener("click",  async () => {
const values =  await getData()
    console.log(values.user_balance);
    console.log(values.room_value);
    if (values.user_balance >= values.room_value){

        let i = Math.floor(Math.random() * 2);
        coin.style.animation = "none";
        if (i) {
            setTimeout(function () {
                coin.style.animation = "spin-tails 3s forwards";
            }, 100);
            var resultado = values.user_balance + values.room_value;
        }
        else {
            setTimeout(function () {
                coin.style.animation = "spin-heads 3s forwards";
            }, 100);
            var resultado = values.user_balance - values.room_value;
        };
        updateBalance(resultado)
        setTimeout(() => {
            updateStats(resultado)
        }, 3000);
        disableButton();
    }else{
        returnButton() 
    };
});
headBtn.addEventListener("click", async () => {
    const values = await getData()
    console.log(values.user_balance);
    console.log(values.room_value);
    if (values.user_balance >= values.room_value){
            let i = Math.floor(Math.random() * 2);
            coin.style.animation = "none";
            if (i) {
                setTimeout(function () {
                    coin.style.animation = "spin-heads 3s forwards";
                }, 100);
                
                var resultado = values.user_balance + values.room_value;
            }
            else {
                setTimeout(function () {
                    coin.style.animation = "spin-tails 3s forwards";
                }, 100);
                var resultado = values.user_balance - values.room_value;
            };
            updateBalance(resultado)
            setTimeout(() => {
                updateStats(resultado)
            }, 3000);
            disableButton();
        } else{
           returnButton() 
        };
});

function updateStats(valor_alterado) {
    console.log(valor_alterado);
    saldo.textContent = `Saldo: R$${valor_alterado}`;
};

function disableButton() {
    tailBtn.disabled = true;
    headBtn.disabled = true;
    setTimeout(() => {
        tailBtn.style.display = 'none';
        headBtn.style.display = 'none';
        tailBtn.disabled = false;
        headBtn.disabled = false;
        createButtons()
    }, 3000);
};


function createButtons(){
    const tryAgainBtn = tryButton()
    const returnBtn = returnButton()
    tryAgainBtn.addEventListener('click', () => {
        tailBtn.style.display = 'block';
        headBtn.style.display = 'block';
        tryAgainBtn.remove()
        returnBtn.remove()
    });
};
function tryButton(){
    const tryAgainBtn = document.createElement('button');
    tryAgainBtn.textContent = 'Try Again';
    tryAgainBtn.classList.add('btn');
    tryAgainBtn.classList.add('btn-warning');
    tryAgainBtn.classList.add('btn-lg');
    button_container.insertAdjacentElement('beforeend', tryAgainBtn);
    return tryAgainBtn;
};
function returnButton(){
    tailBtn.style.display = 'none';
    headBtn.style.display = 'none';
    const returnBtn = document.createElement('button');
    returnBtn.textContent = 'Return';
    returnBtn.classList.add('btn');
    returnBtn.classList.add('btn-danger');
    returnBtn.classList.add('btn-lg');
    button_container.insertAdjacentElement('beforeend', returnBtn);
    returnBtn.addEventListener('click', () => {
        window.location.href = '/users/room_listing/';
    });
    return returnBtn;
};
    
const csrftoken = getCookie('csrftoken');

async function updateBalance(resultado){
    let resultado_json = JSON.stringify({'saldo': resultado})
    const response = await fetch(url_update,{
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
            'X-CSRFToken': csrftoken
        },
        body: resultado_json
    });
    const data = await response.json()
};


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};