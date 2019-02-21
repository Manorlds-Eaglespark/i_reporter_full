
document.getElementById('delete-red-flag').addEventListener('click', delete_this_incident_redflag)

function delete_this_incident_redflag() {
    let item_id = localStorage.getItem("item_id");
    const feedback_bar = document.getElementById('feedback_bar');
    fetch('http://127.0.0.1:5000/api/v2/red-flags/'+ item_id,
    {
        method: "DELETE",
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin": "*",
            'Authorization': localStorage.getItem('access_token')
        }
    })
        .then(res => res.json())
        .then(data => {

            if (data.status == '200')
            {
                
                alert('Red-Flag was successfully deleted.');
                window.location.href = "./home.html";
                
            }
            else
            {
                feedback_bar.innerHTML = `${data.error}`
            }
        });
}



document.getElementById('delete-intervention').addEventListener('click', delete_this_incident_intervention)

function delete_this_incident_intervention() {
    let item_id = localStorage.getItem("item_id");
    const feedback_bar = document.getElementById('feedback_bar');
    fetch('http://127.0.0.1:5000/api/v2/interventions/'+ item_id,
    {
        method: "DELETE",
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin": "*",
            'Authorization': localStorage.getItem('access_token')
        }
    })
        .then(res => res.json())
        .then(data => {

            if (data.status == '200')
            {
                
                alert('Intervention was successfully deleted.');
                window.location.href = "./home.html";
                
            }
            else
            {
                feedback_bar.innerHTML = `${data.error}`
            }
        });
}
