function authenticateUser() {
    const login_id = document.getElementById('login_id').value;
    const password = document.getElementById('password').value;

    const apiUrl = 'http://localhost:3001/sunbase/assignment_auth.jsp';


    fetch(apiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },

        body: JSON.stringify({
            login_id: login_id,
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Authentication failed');
        }
        return response.json();
    })
    .then(data => {
        const token = data.access_token;
        // Save the token in localStorage or a secure way for later use
        window.localStorage.setItem("token", token);
        console.log('Bearer Token:', token);
        window.location = "file:///C:/Users/Sameer/Desktop/SunbaseData_Assignment/customerList.html"
    })
    .catch(error => {
        alert('Wrong username or password');
        console.error('Authentication error:', error);
    });
}
