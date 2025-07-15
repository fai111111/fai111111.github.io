document.addEventListener('DOMContentLoaded', function() {
    // Example: Add event listeners for "เพิ่มเติม" buttons
    const viewMoreButtons = document.querySelectorAll('.view-more-button');
    viewMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const activityName = this.closest('.activity-card').querySelector('.activity-name').textContent;
            console.log(`View more details for: ${activityName}`);
            alert(`ดูรายละเอียดเพิ่มเติมสำหรับ: ${activityName}`);
            // In a real application, you might navigate to a specific activity detail page
            // window.location.href = 'activity-detail.html?name=' + encodeURIComponent(activityName);
        });
    });

    // Example: Add event listener for navigation links (if you want client-side routing)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Only prevent default if it's the current active link or not meant for full page reload
            if (this.getAttribute('href') === '#') {
                event.preventDefault();
                console.log(`Navigating to: ${this.textContent.trim()}`);
                alert(`คุณคลิกที่ ${this.textContent.trim()}`);
            } else if (this.classList.contains('active')) {
                event.preventDefault(); // Prevent reload if already on active page
            }
            
            // Remove 'active' class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add 'active' class to the clicked link
            this.classList.add('active');

            // If it's a real link, let default behavior take over if not '#'
            if (this.getAttribute('href') !== '#') {
                window.location.href = this.getAttribute('href');
            }
        });
    });
});