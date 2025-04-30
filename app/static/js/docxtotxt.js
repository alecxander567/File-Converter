document.getElementById('uploadTxtForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var fileInput = document.getElementById('formTxtFile');
    if (!fileInput.files.length) {
        alert('Please select a file first.');
        return;
    }

    var formData = new FormData();
    formData.append('file', fileInput.files[0]);

    var uploadStatus = document.getElementById('uploadTxtStatus');
    var downloadLink = document.getElementById('downloadTxtLink');

    uploadStatus.innerHTML = '<div class="spinner-border text-warning" role="status"><span class="visually-hidden">Loading...</span></div>';
    downloadLink.innerHTML = '';

    fetch('/convert-docx-to-txt/', { 
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': '{{ csrf_token }}'
        }
    })
    .then(response => response.json())
    .then(data => {
        uploadStatus.innerHTML = '';

        if (data.download_url) {
            downloadLink.innerHTML = `
                <a href="${data.download_url}" class="btn btn-primary" download>
                    <i class="fas fa-download me-2"></i> Download TXT
                </a>
            `;
        } else {
            uploadStatus.innerHTML = `<div class="alert alert-danger">${data.error || 'Conversion failed.'}</div>`;
        }
    })
    .catch(error => {
        uploadStatus.innerHTML = `<div class="alert alert-danger">An error occurred. Please try again.</div>`;
        console.error('Error:', error);
    });
});