document.addEventListener('DOMContentLoaded', function() {
    const devices = document.querySelectorAll('.device');
    const deviceInfo = document.getElementById('device-info');

    devices.forEach(device => {
        device.addEventListener('click', function() {
            deviceInfo.textContent = this.getAttribute('data-info');
        });
    });
});