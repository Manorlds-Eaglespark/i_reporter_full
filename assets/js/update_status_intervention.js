
document.getElementById('edit-status-form').addEventListener('submit', update_status_intervention)

function update_status_intervention(e) {
    e.preventDefault();

    let item_id = localStorage.getItem("item_id");

    feedback_bar = document.getElementById('feedback_bar12');
    data_ = {
        status: document.getElementById("status").value
    }
    
    fetch('https://ireporter256version2.herokuapp.com/api/v2/interventions/'+item_id+'/status',
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
            if (data.status == '200')
            {
                
                alert('Intervention Status was successfully updated.');
                window.location.href = "./intervention_detail_admin.html";  
            }
            else
            {
                feedback_bar.innerHTML = `${data.error}`
            }

        })
        .catch(function (error) {
            console.log({"error":error});
        });
}
