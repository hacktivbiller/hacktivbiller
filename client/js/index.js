initPage = () => {
    if(!localStorage.access_token) {
        $("#auth").show()
        $("#register__page").hide()
        $("#main").hide()
    }else{
        $("#auth").hide()
        $("#main").show()
    }
}

login = (email, password) => {
    $.ajax({
        url: `http://localhost:3000/users/login`,
        method: `POST`,
        data: {
            email,
            password
        }
    })
    .then(user => {
        $("#login__email").val('')
        $("#login__password").val('')

        localStorage.setItem('access_token', user)
        initPage()
    })
    .fail(function(jqXHR, textStatus) {
        $("#login__password").val('')
        console.log(jqXHR)
    })
}

register = (username, email, password) => {
    $.ajax({
        url: `http://localhost:3000/users/register`,
        method: `POST`,
        data: {
            username,
            email,
            password
        }
    })
    .then(user => {
        $("#register__username").val('')
        $("#register__email").val('')
        $("#register__password").val('')
    })
    .fail(function(jqXHR, textStatus) {
        console.log(jqXHR)
        $("#register__password").val('')
    })
}

onSignIn = (googleUser) => {
    const access_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        url: `http://localhost:3000/users/loginGoogle`,
        method: `POST`,
        headers: {
            access_token
        }
    })
    .done(function(response) {
        console.log(response);
        localStorage.setItem('access_token', response.token)
        localStorage.setItem('name', response.name)
        localStorage.setItem('id', response.id)
        initPage()
    })
    .fail(function(jqXHR, textStatus) {
        console.log(jqXHR)
    })
}

logout = () => {
    var auth2 = gapi.auth2.getAuthInstance();

    auth2.signOut().then(function () {
        localStorage.clear()
        initPage()
    });
}

$(document).ready(function() {
    initPage()

    $("#login__form").on('submit', function() {
        event.preventDefault()
        const email = $("#login__email").val()
        const password = $("#login__password").val()
        
        login(email, password)
    })

    $("#register__form").on('submit', function() {
        event.preventDefault()
        const username = $("#register__username").val()
        const email = $("#register__email").val()
        const password = $("#register__password").val()
        
        register(username, email, password)
    })

    $("#login__register-btn").on('click', function() {
        $("#register__page").show()
        $("#login__page").hide()
    })

    $("#register__login-btn").on('click', function() {
        $("#register__page").hide()
        $("#login__page").show()
    })
})

$('#homepage').show()
$('#front-end').hide()

$('#buttonIn').click(function(){
    $('#front-end').show()
    $('#homepage').hide()
})

$('#buttonPrim').click(function(){
    $('#front-end').hide()
    $('#homepage').show()
})