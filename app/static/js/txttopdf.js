document.getElementById('uploadTxtToPdfForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var fileInput = document.getElementById('txtFile');
    if (!fileInput.files.length) {
        alert('Please select a TXT file first.');
        return;
    }

    var formData = new FormData();
    formData.append('file', fileInput.files[0]);

    var uploadStatus = document.getElementById('uploadTxtToPdfStatus');
    var downloadLink = document.getElementById('downloadTxtToPdfLink');

    uploadStatus.innerHTML = '<div class="spinner-border text-warning" role="status"><span class="visually-hidden">Loading...</span></div>';
    downloadLink.innerHTML = '';

    fetch('/convert-txt-to-pdf/', {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': '{{ csrf_token }}'
        }
    })
    .then(response => response.json())
    .then(data => {
        uploadStatus.innerHTML = '';

        if (data.success) {
            downloadLink.innerHTML = `
                <a href="${data.download_link}" class="btn btn-primary" download>
                    <i class="fas fa-download me-2"></i> Download PDF
                </a>
            `;
        } else {
            uploadStatus.innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
        }
    })
    .catch(error => {
        uploadStatus.innerHTML = `<div class="alert alert-danger">An error occurred. Please try again.</div>`;
        console.error('Error:', error);
    });
});