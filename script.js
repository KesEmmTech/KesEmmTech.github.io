document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('namePlaceholder').textContent = "Leticia";//Replace Leticia with name of prom date
    
    const promDate = new Date(2025, 5, 7);
    
    // You can add more messages to be displayed if you want
    const messages = [  
        "I am requesting for a little of your time...",  
        "I have always wanted to ask you out but ...",  
        "I have always been scared of confronting you directly...",
        "Your personality is different from the rest...", 
        "And I can't think of any one else to ask out but you...", 
        "I may not stand a chance though but any way...",
        "Here's my question..."  
    ];
    
    createHearts();
    createFloatingHearts();
    createSparkles();
    
    typeMessages(messages);
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const reallyNoBtn = document.getElementById('reallyNoBtn');
    const maybeYesBtn = document.getElementById('maybeYesBtn');
    const noConfirmation = document.getElementById('noConfirmation');
    const userAnswerField = document.getElementById('userAnswer');
    
    const envelope = document.getElementById('envelope');
    setTimeout(() => {
        envelope.classList.add('open');
    }, 1000);
    
    yesBtn.addEventListener('click', function() {
        userAnswerField.value = "YES";
        const modal = new bootstrap.Modal(document.getElementById('successModal'));
        modal.show();
        
        triggerConfetti();
        
        document.querySelector('.heart-beat').style.animation = 'beat 0.6s infinite ease-in-out';
    });
    
    noBtn.addEventListener('click', function() {
        userAnswerField.value = "NO";
        noConfirmation.style.display = 'block';
        this.style.display = 'none';
        document.querySelector('.yes-btn').style.display = 'none';
    });
    
    reallyNoBtn.addEventListener('click', function() {
        noConfirmation.innerHTML = '<p class="text-danger">😢 Okay, I understand... but I hope you change your mind!</p>';
        setTimeout(() => {
            noConfirmation.style.display = 'none';
            noBtn.style.display = 'block';
            document.querySelector('.yes-btn').style.display = 'block';
        }, 3000);
    });
    
    maybeYesBtn.addEventListener('click', function() {
        userAnswerField.value = "MAYBE (changed to YES)";
        noConfirmation.style.display = 'none';
        noBtn.style.display = 'block';
        document.querySelector('.yes-btn').style.display = 'block';
        animateHeart();
    });
    
    const nameElement = document.getElementById('namePlaceholder');
    nameElement.addEventListener('click', function() {
        animateHeart();
    });
    
    const heartElement = document.querySelector('.heart-beat');
    heartElement.addEventListener('click', function() {
        animateHeart();
    });
    
    // Updated form submission logic
    const form = document.getElementById('promProposal');  
    form.addEventListener('submit', function(e) {  
        e.preventDefault();  
        
        // Set the user's answer if not already set
        if (!userAnswerField.value) {
            userAnswerField.value = "NO ANSWER PROVIDED";
        }
        
        const message = document.getElementById('message').value;
        const formData = new FormData(form);
        
        // Submit the form data to FormSubmit.co
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Show success message
                if (message.trim() !== '') {
                    alert("Your sweet message has been sent! 💌\n\n\"" + message + "\"");
                } else {
                    alert("Thank you for your response! 💖");
                }
                
                // Reset the form
                this.reset();
                userAnswerField.value = "";
                
                // If they said yes, show the success modal
                if (userAnswerField.value === "YES") {
                    const modal = new bootstrap.Modal(document.getElementById('successModal'));
                    modal.show();
                }
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Oops! Something went wrong. Please try again later.");
        });
    });
    
    function createHearts() {  
        const heartsContainer = document.querySelector('.hearts');  
        const heartCount = 20;  
        
        for (let i = 0; i < heartCount; i++) {  
            const heart = document.createElement('div');  
            heart.innerHTML = '❤️';  
            heart.classList.add('heart');  
            
            heart.style.left = Math.random() * 100 + 'vw';  
            heart.style.top = Math.random() * 100 + 'vh';  
            heart.style.fontSize = (15 + Math.random() * 20) + 'px';  
            heart.style.animationDuration = 4 + Math.random() * 8 + 's';  
            heart.style.animationDelay = Math.random() * 5 + 's';  
            
            heartsContainer.appendChild(heart);  
        }  
    }
    
    function createFloatingHearts() {
        const container = document.querySelector('.floating-hearts');
        const heartCount = 15;
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.fontSize = (10 + Math.random() * 15) + 'px';
            heart.style.color = `rgba(255, ${100 + Math.random() * 155}, ${100 + Math.random() * 155}, 0.7)`;
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = (70 + Math.random() * 20) + 'vh';
            heart.style.animation = `float ${10 + Math.random() * 15}s linear infinite`;
            heart.style.animationDelay = Math.random() * 10 + 's';
            
            container.appendChild(heart);
        }
    }
    
    function createSparkles() {
        const container = document.querySelector('.sparkles');
        const sparkleCount = 30;
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.style.left = Math.random() * 100 + 'vw';
            sparkle.style.top = Math.random() * 100 + 'vh';
            sparkle.style.animationDelay = Math.random() * 5 + 's';
            sparkle.style.width = (3 + Math.random() * 5) + 'px';
            sparkle.style.height = (3 + Math.random() * 5) + 'px';
            
            container.appendChild(sparkle);
        }
    }
    
    function typeMessages(messages) {  
        const container = document.getElementById('typing-container');  
        let messageIndex = 0;  
        let charIndex = 0;  
        let currentText = '';  
        let isDeleting = false;  
        let typingSpeed = 100;
        
        function type() {  
            const currentMessage = messages[messageIndex];  
            
            if (isDeleting) {  
                currentText = currentMessage.substring(0, charIndex - 1);  
                charIndex--;  
                typingSpeed = 50;
            } else {  
                currentText = currentMessage.substring(0, charIndex + 1);  
                charIndex++;  
                typingSpeed = 100 + Math.random() * 50;
            }  
            
            container.innerHTML = '<span class="typing-text">' + currentText + '</span>';  
            
            if (!isDeleting && charIndex === currentMessage.length) {  
                typingSpeed = 2000;
                isDeleting = true;  
            } else if (isDeleting && charIndex === 0) {  
                isDeleting = false;  
                messageIndex++;  
                if (messageIndex >= messages.length) {  
                    messageIndex = 0;  
                }  
                typingSpeed = 500;
            }  
            
            setTimeout(type, typingSpeed);  
        }  
        
        setTimeout(type, 1000);  
    }
    
    function updateCountdown() {
        const now = new Date();
        const diff = promDate - now;
        
        if (diff <= 0) {
            document.getElementById('countdown-timer').innerHTML = "Prom is today! 🎉";
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    function triggerConfetti() {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#ff4d6d', '#ff8fa3', '#ffb3c1', '#d9b8ff', '#b8e1ff']
        });
        
        setTimeout(() => confetti({
            particleCount: 100,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        }), 300);
        
        setTimeout(() => confetti({
            particleCount: 100,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        }), 600);
    }
    
    function animateHeart() {
        const heart = document.querySelector('.heart-beat');
        heart.style.animation = 'none';
        void heart.offsetWidth;
        heart.style.animation = 'beat 0.6s ease-in-out, float 3s ease-in-out infinite';
        
        const floatingHeart = document.createElement('div');
        floatingHeart.innerHTML = '❤️';
        floatingHeart.style.position = 'absolute';
        floatingHeart.style.fontSize = '30px';
        floatingHeart.style.color = 'var(--dark-pink)';
        floatingHeart.style.left = '50%';
        floatingHeart.style.top = '50%';
        floatingHeart.style.transform = 'translate(-50%, -50%)';
        floatingHeart.style.animation = 'float 2s ease-out forwards';
        floatingHeart.style.opacity = '1';
        floatingHeart.style.zIndex = '1000';
        document.body.appendChild(floatingHeart);
        
        setTimeout(() => {
            floatingHeart.remove();
        }, 500);
    }
});
