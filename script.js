function handleFormSubmission(event) {
    event.preventDefault(); // Prevent immediate form submission

    // Populate location fields
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                document.getElementById("latitude").value = position.coords.latitude;
                document.getElementById("longitude").value = position.coords.longitude;
                document.getElementById("accuracy").value = position.coords.accuracy + " meters";

                // After fetching location, populate browser details and submit the form
                populateBrowserDetails();
                document.getElementById("existingForm").submit();
            },
            function (error) {
                console.error("Error fetching location:", error.message);
                document.getElementById("latitude").value = "Permission denied or unavailable";
                document.getElementById("longitude").value = "Permission denied or unavailable";
                document.getElementById("accuracy").value = "N/A";

                // Populate browser details and submit even if location fails
                populateBrowserDetails();
                document.getElementById("existingForm").submit();
            }
        );
    } else {
        console.warn("Geolocation is not supported by this browser.");
        document.getElementById("latitude").value = "Geolocation not supported";
        document.getElementById("longitude").value = "Geolocation not supported";
        document.getElementById("accuracy").value = "N/A";

        // Populate browser details and submit
        populateBrowserDetails();
        document.getElementById("existingForm").submit();
    }
}

function populateBrowserDetails() {
    const submissionTime = new Date();
    document.getElementById("submissionTime").value = 
        `${submissionTime.getDay()}/${submissionTime.getDate()}/${submissionTime.getMonth() + 1}/${submissionTime.getFullYear()} ` +
        `${submissionTime.getHours()}:${submissionTime.getMinutes()}:${submissionTime.getSeconds()}`;

    document.getElementById("ipAddress").value = "Dynamic IP (use a server-side script to fetch)";
    document.getElementById("browserName").value = navigator.appName;
    document.getElementById("browserVersion").value = navigator.appVersion;
    document.getElementById("userAgent").value = navigator.userAgent;
    document.getElementById("platform").value = navigator.platform;
    document.getElementById("screenWidth").value = window.screen.width;
    document.getElementById("screenHeight").value = window.screen.height;
}
