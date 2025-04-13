document.addEventListener("DOMContentLoaded", () => {
    // Click Counter
    let count = 0;
    const countDisplay = document.getElementById("countDisplay");
    document.getElementById("clickBtn").addEventListener("click", () => {
        count++;
        countDisplay.textContent = count;
    });

    // Color Changer
    document.getElementById("colorBtn").addEventListener("click", () => {
        const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`;
        document.body.style.backgroundColor = randomColor;
    });

    // Form Validation with localStorage persistence
    const formInputs = ['name', 'email'];

    // Load saved form data
    formInputs.forEach(id => {
        const savedValue = localStorage.getItem(`form_${id}`);
        if (savedValue) {
            document.getElementById(id).value = savedValue;
        }
    });

    document.getElementById("submitBtn").addEventListener("click", () => {
        const submitBtn = document.getElementById("submitBtn");
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const errorDiv = document.getElementById("formError");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !emailPattern.test(email)) {
            errorDiv.textContent = "Please enter a valid name and email.";
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            return;
        }

        // Save form data
        formInputs.forEach(id => {
            localStorage.setItem(`form_${id}`, document.getElementById(id).value);
        });

        // Simulate async submission
        setTimeout(() => {
            errorDiv.textContent = "";
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            alert("Form submitted successfully!");
        }, 1000);
    });

    // Calculator
    document.getElementById("calcBtn").addEventListener("click", () => {
        const calcBtn = document.getElementById("calcBtn");
        const originalText = calcBtn.textContent;
        calcBtn.disabled = true;
        calcBtn.textContent = "Calculating...";

        try {
            const num1 = Number(document.getElementById("num1").value);
            const num2 = Number(document.getElementById("num2").value);
            let result = "";

            if (Number.isFinite(num1) && Number.isFinite(num2)) {
                result += `Add: ${num1 + num2}\n`;
                result += `Subtract: ${num1 - num2}\n`;
                result += `Multiply: ${num1 * num2}\n`;
                result += `Divide: ${num2 !== 0 ? (num1 / num2).toFixed(2) : "Cannot divide by zero"}`;
            } else {
                result = "Please enter valid numbers.";
            }
            document.getElementById("calcResult").textContent = result;
        } catch (error) {
            console.error("Calculation error:", error);
            document.getElementById("calcResult").textContent = "An error occurred during calculation.";
        } finally {
            calcBtn.disabled = false;
            calcBtn.textContent = originalText;
        }
    });

    // Digital Clock
    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = days[now.getDay()];
        const date = now.getDate();
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        const monthName = months[now.getMonth()];
        const year = now.getFullYear();

        const timeElement = document.getElementById('time');
        const dateElement = document.getElementById('date');
        const dayElement = document.getElementById('day');

        if (timeElement && dateElement && dayElement) {
            timeElement.innerHTML = `
                <span class="clock-hours">${hours}</span>:
                <span class="clock-minutes">${minutes}</span>:
                <span class="clock-seconds">${seconds}</span>
            `;
            dateElement.textContent = `${monthName} ${date}, ${year}`;
            dayElement.textContent = dayName;
        }
    }

    updateClock();
    setInterval(updateClock, 1000);

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // Dark Mode Toggle
    const toggleModeBtn = document.getElementById("toggleModeBtn");

    function applyDarkMode(isDark) {
        document.body.classList.toggle("dark-mode", isDark);
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        toggleModeBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    }

    const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
    if (darkModeEnabled || window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyDarkMode(true);
    }

    toggleModeBtn.addEventListener("click", () => {
        const isDark = !document.body.classList.contains("dark-mode");
        applyDarkMode(isDark);
    });

    // Quote Generator
    const quotes = [
        "Believe you can and you're halfway there.",
        "Every moment is a fresh beginning.",
        "Turn your wounds into wisdom.",
        "Wherever life plants you, bloom with grace.",
        "Do something today that your future self will thank you for."
    ];
    document.getElementById("quoteBtn").addEventListener("click", () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        document.getElementById("quoteDisplay").textContent = quotes[randomIndex];
    });

    // Image Slider
    const images = ["1.jpeg", "2.jpeg", "3.jpeg"];
    let currentImage = 0;
    const sliderImage = document.getElementById("sliderImage");
    document.getElementById("prevBtn").addEventListener("click", () => {
        currentImage = (currentImage - 1 + images.length) % images.length;
        sliderImage.src = images[currentImage];
    });
    document.getElementById("nextBtn").addEventListener("click", () => {
        currentImage = (currentImage + 1) % images.length;
        sliderImage.src = images[currentImage];
    });

    // BMI Calculator
    document.getElementById("bmiBtn").addEventListener("click", () => {
        const weight = parseFloat(document.getElementById("weight").value);
        const height = parseFloat(document.getElementById("height").value);
        if (!isNaN(weight) && !isNaN(height) && height > 0) {
            const bmi = weight / ((height / 100) ** 2);
            let category = "";
            if (bmi < 18.5) category = "Underweight";
            else if (bmi < 25) category = "Normal";
            else if (bmi < 30) category = "Overweight";
            else category = "Obese";
            document.getElementById("bmiResult").textContent = `BMI: ${bmi.toFixed(2)} - ${category}`;
        } else {
            document.getElementById("bmiResult").textContent = "Please enter valid values.";
        }
    });

    // Word Counter
    document.getElementById("textInput").addEventListener("input", () => {
        const text = document.getElementById("textInput").value.trim();
        const wordCount = text ? text.split(/\s+/).length : 0;
        document.getElementById("wordCount").textContent = `Word Count: ${wordCount}`;
    });
});


