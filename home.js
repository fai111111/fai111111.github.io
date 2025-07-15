document.addEventListener('DOMContentLoaded', function() {
    // Example: Add event listeners for navigation links if they were to lead to different sections/pages
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            // Remove 'active' class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add 'active' class to the clicked link
            this.classList.add('active');
            
            const pageName = this.textContent.trim();
            console.log(`Navigating to: ${pageName}`);
            // In a real application, you would change content or navigate to a new page
            // For example: window.location.href = `${pageName.toLowerCase()}.html`;
            alert(`คุณคลิกที่ ${pageName}`);
        });
    });

    // Example: Add event listener for "เพิ่มเติม" buttons
    const viewMoreButtons = document.querySelectorAll('.view-more-button');
    viewMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const activityName = this.closest('.activity-card').querySelector('.activity-name').textContent;
            console.log(`View more details for: ${activityName}`);
            alert(`ดูรายละเอียดเพิ่มเติมสำหรับ: ${activityName}`);
        });
    });

    // Example: Add event listener for "รูปภาพเพิ่มเติม" button
    const moreImagesButton = document.getElementById('moreImagesButton'); // Assuming you add an ID to the button
    if (moreImagesButton) {
        moreImagesButton.addEventListener('click', function() {
            console.log('Load more activity images...');
            alert('โหลดรูปภาพกิจกรรมเพิ่มเติม...');
            // In a real application, you would dynamically load more images here
        });
    }
});
