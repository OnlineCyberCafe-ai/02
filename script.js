// Initialize EmailJS with your User ID
(function(){
  emailjs.init("BVIemZ27RhdbGAbVg"); 
})();

// Disable hamburger menu toggle to keep navigation always visible
function toggleMenu() {
  // No-op: Hamburger menu is disabled to ensure desktop mode
}

// Modal functions
function openModal() {
  document.getElementById('contactModal').style.display = 'flex';
  document.getElementById('contactForm').reset();
  document.getElementById('formMessage').style.display = 'none';
  document.getElementById('otherFormInput').style.display = 'none';
}

function closeModal() {
  document.getElementById('contactModal').style.display = 'none';
  document.getElementById('contactForm').reset(); // Clears all form fields
  document.getElementById('otherFormInput').style.display = 'none'; // Hides "Other" input
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('contactModal');
  if (event.target == modal) {
    closeModal();
  }
}

// Toggle visibility of other form input
function toggleOtherInput() {
  const formName = document.getElementById('formName').value;
  const otherInput = document.getElementById('otherFormInput');
  otherInput.style.display = formName === 'Other' ? 'block' : 'none';
  if (formName !== 'Other') {
    otherInput.value = '';
  }
}

// Send email using EmailJS
function sendEmail() {
  const fullName = document.getElementById('fullName').value;
  const whatsappNumber = document.getElementById('whatsappNumber').value;
  let formName = document.getElementById('formName').value;
  const otherFormInput = document.getElementById('otherFormInput').value;
  const messageElement = document.getElementById('formMessage');

  // Use other form input if "Other" is selected
  if (formName === 'Other') {
    formName = otherFormInput;
  }

  // Basic validation
  if (!fullName || !whatsappNumber || !formName) {
    messageElement.textContent = 'Please fill out all fields.';
    messageElement.className = 'message error';
    messageElement.style.display = 'block';
    return;
  }

  // Add current date and time (11:45 AM IST, September 03, 2025)
  const submissionTime = new Date('2025-09-03T11:45:00+05:30').toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const templateParams = {
    full_name: fullName,
    whatsapp_number: whatsappNumber,
    form_name: formName,
    submission_time: submissionTime
  };

  emailjs.send('service_m8m6gn7', 'template_pvs848c', templateParams)
    .then(function(response) {
      messageElement.textContent = 'Your request has been sent successfully!';
      messageElement.className = 'message';
      messageElement.style.display = 'block';
      document.getElementById('contactForm').reset(); // Clear form data after successful submission
      setTimeout(closeModal, 2000); // Close modal after 2 seconds
    }, function(error) {
      messageElement.textContent = 'Failed to send your request. Please try again.';
      messageElement.className = 'message error';
      messageElement.style.display = 'block';
    });
}