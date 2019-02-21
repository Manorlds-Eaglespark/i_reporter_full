


function logout_user(){
    localStorage.clear();
    window.location.href = "./index.html";
}


function post_redflag() {
    const feedback_bar = document.getElementById('feedback_bar');
    var data = JSON.stringify({
        location: document.getElementById("location").value,
        image: document.getElementById("image").value,
        video: document.getElementById("video").value,
        comment: document.getElementById("comment").value
    });


    fetch('https://ireporter256version2.herokuapp.com/api/v2/red-flags',
        {
            headers:new Headers({
                'Authorization': localStorage.getItem('access_token'),
                "Content-Type" : 'text/plain',
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json",
                "Origin": "http://maximum.blog"
            }),
            method: 'post',
            data: data
        }
    )
    .then(res => res.json())
    .then(data => {
    
    if (data.status == '200')
        {
        
        }
    else
        {
            feedback_bar.innerHTML = `${data.error}`
        }
        
        console.log({'data':data});
    })
    .catch(function (error) {
        console.log({"Error":error});
    });

}
