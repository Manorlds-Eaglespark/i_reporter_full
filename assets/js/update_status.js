




document.getElementById('edit_status_form_redflag').addEventListener('submit', update_status_redflag)

function update_status_redflag(e) {
    e.preventDefault();

    let item_id = localStorage.getItem("item_id");

    feedback_bar = document.getElementById('feedback_bar11');
    data_ = {
        status: document.getElementById("redflag_status").value
    }
    
    fetch('http://127.0.0.1:5000/api/v2/red-flags/'+item_id+'/status',
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
                
                alert('Red-Flag Status was successfully updated.');
                window.location.href = "./redflag_detail_admin.html";  
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



