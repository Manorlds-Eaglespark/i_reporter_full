


document.getElementById('edit-location-form').addEventListener('submit', edit_intervention_location)

function edit_intervention_location(e) {
    let item_id = localStorage.getItem("item_id");
    e.preventDefault();
    data_ = {
        location: document.getElementById("location").value
    }

    fetch('https://ireporter256version2.herokuapp.com/api/v2/interventions/'+item_id+'/location',
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
                
                alert('Intervention Location was successfully Updated.');
                window.location.href = "./intervention_detail.html";
                
            }
            else
            {
                feedback_bar.innerHTML = `${data.error}`
            }
        });
}




document.getElementById('edit-comment-form').addEventListener('submit', edit_intervention_comment)

function edit_intervention_comment(e) {
    let item_id = localStorage.getItem("item_id");
    e.preventDefault();
    data_ = {
        comment: document.getElementById("comment").value
    }

    fetch('https://ireporter256version2.herokuapp.com/api/v2/interventions/'+item_id+'/comment',
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
        
                alert('Intervention Comment was successfully Updated.');
                window.location.href = "./intervention_detail.html";
                
            }
            else
            {
                feedback_bar.innerHTML = `${data.error}`
            }
        });
}