
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const recievedUUID = urlParams.get('uuid');
document.getElementById('uuid').value = recievedUUID;
if(urlParams.get('cmd')=='delete'){
    deleteCustomer();
}
function getUUID(){

}
function createCustomer() {
    const token = localStorage.getItem('token'); // Retrieve the token from storage
    const queryString = window.location.search;
    
    // Fetch input values and create a new customer object
    const customerObject = {
        "first_name": document.getElementById('first_name').value,
        "last_name": document.getElementById('last_name').value,
        "street": document.getElementById('street').value,
        "address": document.getElementById('address').value,
        "city": document.getElementById('city').value,
        "state": document.getElementById('state').value,
        "email": document.getElementById('email').value,
        "phone": document.getElementById('phone').value
    };
    const apiUrl = 'http://localhost:3001/sunbase/assignment.jsp?cmd=create';
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerObject)
    })
    .then(response => {
        if (response.ok) {
            // Customer created successfully
            alert('Customer Created successfully');
            console.log('Customer created successfully');
        } else {
            // Handle the failure
            alert('Try Again');
            console.error('Failed to create customer');
        }
    })
    .catch(error => {
        console.error('Error creating customer:', error);
    });
}

function updateCustomer() {
    const token = localStorage.getItem('token'); // Retrieve the token from storage
    
    // Fetch input values and create an updated customer object
    const customerObject = {
        "first_name": document.getElementById('first_name').value,
        "last_name": document.getElementById('last_name').value,
        "street": document.getElementById('street').value,
        "address": document.getElementById('address').value,
        "city": document.getElementById('city').value,
        "state": document.getElementById('state').value,
        "email": document.getElementById('email').value,
        "phone": document.getElementById('phone').value
    };

    // Include the UUID of the customer you want to update
    const uuid = document.getElementById('uuid').value;

    fetch(`http://localhost:3001/sunbase/assignment.jsp?cmd=update&uuid=${uuid}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerObject)
    })
    .then(response => {
        if (response.ok) {
            // Customer updated successfully
            alert('Customer updated successfully');
            console.log('Customer updated successfully');
        } else {
            // Handle the failure
            alert('Wrong UUID');
            console.error('Failed to update customer');
        }
    })
    .catch(error => {
        console.error('Error updating customer:', error);
    });
}

function deleteCustomer() {
    const token = localStorage.getItem('token'); // Retrieve the token from storage

    // Include the UUID of the customer you want to delete
    const uuid = document.getElementById('uuid').value;

    fetch(`http://localhost:3001/sunbase/assignment.jsp?cmd=delete&uuid=${uuid}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Customer deleted successfully
            alert('Customer deleted successfully');
            console.log('Customer deleted successfully');
        } else {
            // Handle the failure
            alert('Wrong UUID');
            console.error('Failed to delete customer');
        }
    })
    .catch(error => {
        console.error('Error deleting customer:', error);
    });
}

