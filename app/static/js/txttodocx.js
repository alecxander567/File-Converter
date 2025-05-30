document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('uploadTxtToDocxForm').addEventListener('submit', function(e) {
        e.preventDefault();

        var fileInput = document.getElementById('formTxtToDocxFile');
        if (!fileInput.files.length) {
            alert('Please select a file first.');
            return;
        }

        var formData = new FormData();
        formData.append('file', fileInput.files[0]);

        var uploadStatus = document.getElementById('uploadTxtToDocxStatus');
        var downloadLink = document.getElementById('downloadTxtToDocxLink');

        uploadStatus.innerHTML = '<div class="spinner-border text-warning" role="status"><span class="visually-hidden">Loading...</span></div>';
        downloadLink.innerHTML = '';

        fetch('/convert-txt-to-docx/', { 
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
                        <i class="fas fa-download me-2"></i> Download DOCX
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
});
