





function post_redflag() {
    const feedback_bar = document.getElementById('feedback_bar');
    var data = JSON.stringify({
        location: document.getElementById("location").value,
        image: document.getElementById("image").value,
        video: document.getElementById("video").value,
        comment: document.getElementById("comment").value
    });


    fetch('http://127.0.0.1:5000/api/v2/red-flags',
        {
            headers:new Headers({
                'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTAzMDA0MTUsImlhdCI6MTU1MDI5MzIxNSwic3ViIjoyLCJhZG4iOiJGYWxzZSJ9.5AbekCM-quMiebNR1hmFaPfEcxVOv0Ax6-X2yXrl6xI',
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
