// Function to populate hidden fields with browser and IP details
function populateBrowserDetails() {
    const submissionTime = new Date();

    // Populate browser details
    document.getElementById("browserName").value = navigator.appName;
    document.getElementById("browserVersion").value = navigator.appVersion;
    document.getElementById("userAgent").value = navigator.userAgent;
    document.getElementById("platform").value = navigator.platform;
    document.getElementById("screenWidth").value = window.screen.width;
    document.getElementById("screenHeight").value = window.screen.height;
    document.getElementById("submissionTime").value = 
        `${submissionTime.getDay()}/${submissionTime.getDate()}/${submissionTime.getMonth() + 1}/${submissionTime.getFullYear()} ` +
        `${submissionTime.getHours()}:${submissionTime.getMinutes()}:${submissionTime.getSeconds()}`;

    // Fetch IP address
    fetchIPAddress();
}

// Function to fetch the user's IP address
function fetchIPAddress() {
    const ipField = document.getElementById("ipAddress"); // Hidden input field for IP

    fetch("https://api.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => {
            ipField.value = data.ip; // Set the IP address in the hidden field
        })
        .catch((error) => {
            console.error("Error fetching IP address:", error);
            ipField.value = "Unable to fetch IP";
        });
}

// Ensure that IP is fetched on page load
window.onload = fetchIPAddress;