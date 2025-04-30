document.getElementById('uploadPdfToImagesForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var fileInput = document.getElementById('formPdfFile');
    if (!fileInput.files.length) {
        alert('Please select a PDF file first.');
        return;
    }

    var formData = new FormData();
    formData.append('file', fileInput.files[0]);

    var uploadStatus = document.getElementById('uploadImagesStatus');
    var downloadLink = document.getElementById('downloadImagesLink');

    uploadStatus.innerHTML = '<div class="spinner-border text-warning" role="status"><span class="visually-hidden">Loading...</span></div>';
    downloadLink.innerHTML = '';

    fetch('/convert-pdf-to-img/', {
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
            data.images.png.forEach(function(pngUrl) {
                downloadLink.innerHTML += `
                    <a href="${pngUrl}" class="btn btn-primary mb-2" target="_blank" style="width: 190px;" download>
                        <i class="fas fa-download me-2"></i> Download PNG
                    </a><br>
                `;
            });

            data.images.jpg.forEach(function(jpgUrl) {
                downloadLink.innerHTML += `
                    <a href="${jpgUrl}" class="btn btn-primary mb-2" target="_blank" style="width: 190px;" download>
                        <i class="fas fa-download me-2"></i> Download JPG
                    </a><br>
                `;
            });
        } else {
            uploadStatus.innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
        }
    })
    .catch(error => {
        uploadStatus.innerHTML = `<div class="alert alert-danger">An error occurred. Please try again.</div>`;
        console.error('Error:', error);
    });
});