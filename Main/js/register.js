function showAdditionalFields() {
    var selectElement = document.getElementById('roleSelect');
    var participantFields = document.getElementById('participantFields');
    var workshopFields = document.getElementById('workshopFields');

    if (selectElement.value === 'participant') {
        participantFields.style.display = 'block';
        workshopFields.style.display = 'none';
    } else if (selectElement.value === 'workshop') {
        participantFields.style.display = 'none';
        workshopFields.style.display = 'block';
    } else {
        participantFields.style.display = 'none';
        workshopFields.style.display = 'none';
    }
}
function sendMail(){
    let parms={
        first_name:document.getElementById('first_name').value,
        last_name:document.getElementById('last_name').value,
        email:document.getElementById('email').value,
        field:document.getElementById('field').value,
        level:document.getElementById('level').value,
        role:document.getElementById('roleSelect').value,
        workshop:document.getElementById('workshopSelect').value,
        message:document.getElementById('message').value
    }

    emailjs.send("service_23mf99i","Ticket_id",parms)
    .then((res) => {
        document.getElementById('first_name').value='';
        document.getElementById('last_name').value='';
        document.getElementById('email').value='';
        document.getElementById('field').value='';
        document.getElementById('level').value='';
        document.getElementById('roleSelect').value='';
        document.getElementById('workshopSelect').value='';
        document.getElementById('message').value='';
        console.log('res');
        alert('Email sent successfully');
    })
    .catch((err) => console.log(err));
}