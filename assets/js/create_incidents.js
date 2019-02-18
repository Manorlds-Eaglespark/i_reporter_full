





document.getElementById('create-red-flag').addEventListener('submit', create_redflag)

function create_redflag(e) {
    e.preventDefault();
    data_ = {
        location: document.getElementById("location").value,
        image: document.getElementById("image").value,
        video: document.getElementById("video").value,
        comment: document.getElementById("comment").value
    }

    
    fetch('http://127.0.0.1:5000/api/v2/red-flags',
    {
        method: "POST",
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin": "*"
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
