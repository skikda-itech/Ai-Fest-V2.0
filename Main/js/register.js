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
function sendMail(event){
    event.preventDefault();
    let role = document.getElementById('roleSelect').value;
    let workshopCheckboxes = document.querySelectorAll('input[name="workshop[]"]:checked');
    let workshops = Array.from(workshopCheckboxes).map(cb => cb.value);

    let parms={
        first_name:document.getElementById('first_name').value,
        last_name:document.getElementById('last_name').value,
        email:document.getElementById('email').value,
        field:document.getElementById('field').value,
        level:document.getElementById('level').value,
        role: role,
        project_name: document.getElementById('project_name').value,
        project_description: document.getElementById('project_description').value,
        workshop: workshops.join(', ')
    }

    let templateId = 'Ticket_id';
    if (role === 'workshop') {
        templateId = 'Ticket_id';
    } else {
        templateId = 'template_2c3oyuu';
    }

    emailjs.send("service_23mf99i", templateId, parms)
    .then((res) => {
        document.getElementById('first_name').value='';
        document.getElementById('last_name').value='';
        document.getElementById('email').value='';
        document.getElementById('field').value='';
        document.getElementById('level').value='';
        document.getElementById('roleSelect').value='';
        workshopCheckboxes.forEach(cb => cb.checked = false);
        console.log('res');
        alert('Email sent successfully');
    })
    .catch((err) => console.log(err));
}