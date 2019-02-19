

document.getElementById('create_red_flag').addEventListener('submit', create_redflag);
document.getElementById('create_intervention').addEventListener('submit', create_intervention);
document.getElementById('logout').addEventListener('click', logout_user);


function get_user_name(){

    fetch('http://127.0.0.1:5000/api/v2/current_user',
    {
        headers:{
            'Authorization': localStorage.getItem('access_token')
        }
    })
    .then(res => res.json())
    .then(data => {
    console.log(data)
    if (data.status == '200')
        {
            localStorage.setItem('first_name', data.data.firstname);
            localStorage.setItem('last_name', data.data.lastname);
            localStorage.setItem('user_id', data.data.id);
            document.getElementById("user_identifier").innerHTML = `${ data.data.firstname}` + ` ${ data.data.lastname}`;
        }
    else
        {
            feedback_bar.innerHTML = `${data.error}`
        }
        
    })
    .catch(function (error) {
        console.log({"Error":error});
    });

}





function create_redflag(e) {
    e.preventDefault();
    data_ = {   
        location: document.getElementById("location").value.split(),
        images: document.getElementById("image").value.split(),
        videos: document.getElementById("video").value.split(),
        comment: document.getElementById("comment").value
    }

    console.log(data_);
    
    fetch('http://127.0.0.1:5000/api/v2/red-flags',
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
                window.location.href = "./home.html";
                alert('Red-Flag was successfully recorded.');   
            }
            else
            {
                feedback_bar1.innerHTML = `${data.error}`
            }
        });
}



function create_intervention(e) {
    e.preventDefault();
    data_ = {   
        location: document.getElementById("location_i").value.split(),
        images: document.getElementById("image_i").value.split(),
        videos: document.getElementById("video_i").value.split(),
        comment: document.getElementById("comment_i").value
    }
    
    fetch('http://127.0.0.1:5000/api/v2/interventions',
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

            console.log(data);

            if (data.status == '201')
            {
                window.location.href = "./home.html";
                alert('Intervention Request was successfully recorded.');   
            }
            else
            {
                feedback_bar2.innerHTML = `${data.error}`
            }
        });
}

function logout_user(){
    localStorage.clear();
    window.location.href = "./index.html";
}