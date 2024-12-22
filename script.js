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

// Fetch location and populate hidden fields
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            document.getElementById("latitude").value = position.coords.latitude;
            document.getElementById("longitude").value = position.coords.longitude;
            document.getElementById("accuracy").value = position.coords.accuracy + " meters";
        },
        function (error) {
            console.error("Error fetching location:", error.message);
            document.getElementById("latitude").value = "Permission denied or unavailable";
            document.getElementById("longitude").value = "Permission denied or unavailable";
            document.getElementById("accuracy").value = "N/A";
        }
    );
} else {
    console.warn("Geolocation is not supported by this browser.");
    document.getElementById("latitude").value = "Geolocation not supported";
    document.getElementById("longitude").value = "Geolocation not supported";
    document.getElementById("accuracy").value = "N/A";
                }
