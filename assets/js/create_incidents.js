





document.getElementById('create-red-flag').addEventListener('submit', create_redflag)

function create_redflag(e) {
    e.preventDefault();
    data_ = {
        location: document.getElementById("location").value,
        image: document.getElementById("image").value,
        video: document.getElementById("video").value,
        comment: document.getElementById("comment").value
    }

    
    fetch('https://ireporter256version2.herokuapp.com/api/v2/red-flags',
    {
        method: "POST",
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin": "*",
            'Authorization': localStorage.getItem('access_token')
        },
        body: JSON.stringify(data_)
    })
        .then(res => res.json())
        .then(data => {

            if (data.status == '201')
            {
                
                alert('Red-Flag was successfully recorded.');
                window.location.href = "./home.html";
                
            }
            else
            {
                feedback_bar.innerHTML = `${data.error}`
            }
        });
}







document.getElementById('create-intervention').addEventListener('submit', create_intervention_)

function create_intervention_(e) {
    e.preventDefault();
    data_ = {
        location: document.getElementById("location_i").value,
        image: document.getElementById("image_i").value,
        video: document.getElementById("video_i").value,
        comment: document.getElementById("comment_i").value
    }

    
    fetch('https://ireporter256version2.herokuapp.com/api/v2/interventions',
    {
        method: "POST",
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin": "*",
            'Authorization': localStorage.getItem('access_token')
        },
        body: JSON.stringify(data_)
    })
        .then(res => res.json())
        .then(data => {

            if (data.status == '201')
            {
                
                alert('Intervention request was successfully recorded.');
                window.location.href = "./home.html";
                
            }
            else
            {
                feedback_bar.innerHTML = `${data.error}`
            }
        });
}
