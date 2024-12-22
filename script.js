document.addEventListener("DOMContentLoaded", () => {
            // Fetch the user's IP address
            fetch("https://api.ipify.org?format=json")
                .then((response) => response.json())
                .then((data) => {
                    document.getElementById("ipAddress").value = data.ip;
                })
                .catch((error) => console.error("Error fetching IP address:", error));

            // Collect browser details and insert them into hidden fields
            document.getElementById("browserName").value = navigator.appName;
            document.getElementById("browserVersion").value = navigator.appVersion;
            document.getElementById("userAgent").value = navigator.userAgent;
            document.getElementById("platform").value = navigator.platform;
            document.getElementById("screenWidth").value = screen.width;
            document.getElementById("screenHeight").value = screen.height;
        });
       
 document.getElementById("contactForm").addEventListener("submit", function () {
    const currentDateTime = new Date();

    // Format the date and time
    const formattedDateTime = `${currentDateTime.getDay()}/${currentDateTime.getDate()}/${currentDateTime.getMonth() + 1}/${currentDateTime.getFullYear()} ` +
                              `${currentDateTime.getHours()}:${currentDateTime.getMinutes()}:${currentDateTime.getSeconds()}`;

    // Set the formatted date and time into the hidden field
    document.getElementById("submissionTime").value = formattedDateTime;
});