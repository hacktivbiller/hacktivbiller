initPage = () => {
    if(!localStorage.access_token) {
        $("#auth").show()
        $("#register__page").hide()
        $("#main").hide()
        $('#homepage').hide()
        $('#front-end').hide()
        $("#results").hide()
    }else{
        // $("#register__page").hide()
        $("#auth").hide()
        $("#main").show()
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
        $("#results").show()
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
    init()

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

    $("#searchForm").on('submit', function(){
        event.preventDefault()
        searchResto()
    })
})

function searchResto(){
    let resto = $("#search").val()
    console.log(resto, 'ini dari function search')
    
    $.ajax({
        url : `http://localhost:3000/api/getRecipe?q=${resto}`,
        method : `GET`,
        headers : {
            user_key : '5528ebc19275edba27466b8b73841709'
        }
    })
        .done(function(response){
            let array = response.restaurants[0].restaurant.photos
            // let arrReviews = response.restaurants[0].restaurant.all_reviews.reviews
            console.log(response)
            console.log(array)
            $('#contentPhotos').empty()
            $('#crsl').empty()

            // <img
            //           class="d-block img-fluid"
            //           src="http://glasgowwestend.today/wp-content/uploads/sites/11/2016/11/Kelbourne-Saint-1-copy-1-900x350.jpeg"
            //           alt="First slide"
            //         />

            // <p max-length='200'>${rev.review.review_text}</p>
            array.forEach(data => {
                let random = (Math.round(Math.random()*40)+10)*1000
                console.log(data)
                $('#contentPhotos').append(
                    `<div class="col-lg-4 col-md-6 mb-4">
                    <div class="card h-100">
                      <a href="#"
                        ><img
                          class="card-img-top"
                          src=${data.photo.url}
                          alt=""
                      /></a>
                      <div class="card-body">
                        <h4 class="card-title">
                          <a href="#">Food</a>
                        </h4>
                        <h5>Rp.${random}</h5>
                        <p class="card-text">
                          ${data.photo.caption}
                        </p>
                      </div>
                      <div class="card-footer">
                        <small class="text-muted"
                          >&#9733; &#9733; &#9733; &#9733; &#9734;</small
                        >
                      </div>
                    </div>
                  </div>`
                )
            });
            carosel()       

        })
        .fail(function(jqXHR, textStatus){
            console.log(jqXHR)
        })
}

function carosel(){
    let str = 'restaurants-900x350'
    $.ajax({
        url : `https://localhost:3000/gImage/${str}`,
        method : "GET"
    })
        .done(function(response){
            
            let img = response.image_results
            img.forEach((el, i) => {
                if(i < 3){
                    $('#crsl').append(
                        `<div class="carousel-item active">
                            <img
                            class="d-block img-fluid"
                            src="${el.image}"
                            alt="First slide"
                            />
                        </div>`
                    )
                }
            })

            
        })
        .fail(function(jqXHR, textStatus){
            console.log(jqXHR)
        })
}
function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: "review" + encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            order: "relevance",
            maxResults: 3,
            publishedAfter: "2019-01-01T00:00:00Z"
       }); 
       // execute the request
       request.execute(function(response) {
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
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
    });
}
