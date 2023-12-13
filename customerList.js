// customerList.js

document.addEventListener('DOMContentLoaded', function () {
    getCustomerList();
});

function getCustomerList() {
    // Assume your API endpoint is correct; update if needed
    const apiUrl = 'http://localhost:3001/sunbase/assignment.jsp?cmd=get_customer_list';

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch customer list');
        }
        return response.json();
    })
    .then(data => {
        // Display the customer list in the table dynamically
        populateCustomerTable(data);
    })
    .catch(error => {
        console.error('Error fetching customer list:', error);
    });
}

function populateCustomerTable(customerList) {
    const customerTableBody = document.getElementById('customerListBody');

    // Clear existing table rows
    customerTableBody.innerHTML = '';

    // Iterate over data and populate the table
    customerList.forEach(customer => {
        // Create table row for each customer
        const row = customerTableBody.insertRow();

        // Populate cells with customer data
        const firstNameCell = row.insertCell();
        const lastNameCell = row.insertCell();
        const emailCell = row.insertCell();
        const addressCell = row.insertCell();
        const cityCell = row.insertCell();
        const stateCell = row.insertCell();
        const phoneCell = row.insertCell();
        const actionsCell = row.insertCell();

        firstNameCell.textContent = customer.first_name;
        lastNameCell.textContent = customer.last_name;
        emailCell.textContent = customer.email;
        addressCell.textContent = customer.address;
        cityCell.textContent = customer.city;
        stateCell.textContent = customer.state;
        phoneCell.textContent = customer.phone;

        // Add action buttons
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.className = 'update-button';
        updateButton.addEventListener('click', () => handleUpdate(customer.uuid)); // Replace with your update logic

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => handleDelete(customer.uuid)); // Replace with your delete logic

        actionsCell.appendChild(updateButton);
        actionsCell.appendChild(deleteButton);
    });
}

function handleUpdate(uuid) {
    // Add logic for updating the customer with the given uuid
    window.location.href = `customerManagement.html?uuid=${uuid}&cmd=update`;
    console.log('Update customer with UUID:', uuid);
}

function handleDelete(uuid) {
    // Add logic for deleting the customer with the given uuid
    window.location.href = `customerManagement.html?uuid=${uuid}&cmd=delete`;
    console.log('Delete customer with UUID:', uuid);
}
