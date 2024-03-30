const form_login = document.querySelector('#form_login')
const urlLogin = form_login.getAttribute('action')
const username = document.querySelector('#username')
const csrftoken = getCookie('csrftoken');

form_login.addEventListener('submit', (event) => {
    event.preventDefault()
    postForm({username: username.value})
});
async function postForm(data){
    for (const key in data) {
        localStorage.setItem(key, data[key])
        }
    data_json = JSON.stringify(data)
    try{
        const response = await fetch('/users/login/', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: data_json
        });
            const json = await response.json()
            console.log(json)
            window.location.href = json.url
            
    } catch(error){
        console.log(error);
    }
}

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
}