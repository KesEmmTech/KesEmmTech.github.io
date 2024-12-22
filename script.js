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