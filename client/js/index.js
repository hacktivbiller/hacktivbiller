initPage = () => {
    if(!localStorage.access_token) {
        $("#auth").show()
        $("#register__page").hide()
        $("#main").hide()
        $("#results").show()
    }else{
        $("#auth").hide()
        $("#main").show()
        $("#results").hide()
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
function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("#formyutub").on("submit", function(e) {
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 3,
            order: "viewCount",
            publishedAfter: "2019-01-01T00:00:00Z"
       }); 
       // execute the request
       request.execute(function(response) {
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
              console.log(item)
            $.get("tpl/item.html", function(data) {
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
          });
          resetVideoHeight();
       });
    });
    
    $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyB1r4dpBP-lLxR-TfKyMicVkcm4f2gfmms");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
        console.log('siap')
    });
}
