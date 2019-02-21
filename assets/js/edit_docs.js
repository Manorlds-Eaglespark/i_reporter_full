

document.getElementById('new-location-form').addEventListener('submit', edit_redflag_location)

function edit_redflag_location(e) {
    let item_id = localStorage.getItem("item_id");
    e.preventDefault();
    data_ = {
        location: document.getElementById("location").value
    }

    fetch('https://ireporter256version2.herokuapp.com/api/v2/red-flags/'+item_id+'/location',
    {
        method: "PATCH",
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

            if (data.status == '202')
            {
                
                alert('Red-Flag Location was successfully Updated.');
                window.location.href = "./redflag_detail.html";
                
            }
            else
            {
                feedback_bar.innerHTML = `${data.error}`
            }
        });
}




document.getElementById('new-comment-form').addEventListener('submit', edit_redflag_comment)

function edit_redflag_comment(e) {
    let item_id = localStorage.getItem("item_id");
    e.preventDefault();
    data_ = {
        comment: document.getElementById("comment").value
    }

    fetch('https://ireporter256version2.herokuapp.com/api/v2/red-flags/'+item_id+'/comment',
    {
        method: "PATCH",
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

            if (data.status == '202')
            {
                
                alert('Red-Flag Comment was successfully Updated.');
                window.location.href = "./redflag_detail.html";
                
            }
            else
            {
                feedback_bar.innerHTML = `${data.error}`
            }
        });
}
