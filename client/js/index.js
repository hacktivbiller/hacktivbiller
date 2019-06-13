initPage = () => {
    if(!localStorage.access_token) {
        $("#auth").show()
        $("#main").hide()
    }else{
        $("#auth").hide()
        $("#main").show()
    }
}

login = (email, password) => {
    $.ajax({
        url: `http://localhost:3000/login`,
        method: `POST`,
        data: {
            email,
            password
        }
    })
    .then(user => {
        $("#login__email").val('')
        $("#login__password").val('')

        console.log(user);
    })
    .fail(function(jqXHR, textStatus) {
        $("#login__password").val('')
        console.log(jqXHR)
    })
}

register = (username, email, password) => {
    $.ajax({
        url: `http://localhost:3000/register`,
        method: `POST`,
        data: {
            username,
            email,
            password
        }
    })
    .then(user => {
        console.log(user);
        $("#register__username").val('')
        $("#register__email").val('')
        $("#register__password").val('')
    })
    .fail(function(jqXHR, textStatus) {
        console.log(jqXHR)
        $("#register__password").val('')
    })
}

$(document).ready(function() {
    initPage()

    $("#login__form").on('submit', function() {
        event.preventDefault()
        const email = $("#register__email").val()
        const password = $("#register__password").val()
        
        login(email, password)
    })

    $("#register__form").on('submit', function() {
        event.preventDefault()
        const username = $("#register__username").val()
        const email = $("#register__email").val()
        const password = $("#register__password").val()
        
        register(username, email, password)
    })
})