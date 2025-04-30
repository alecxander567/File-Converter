document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('uploadJpgToPdfForm').addEventListener('submit', function (e) {
        e.preventDefault();

        var fileInput = document.getElementById('formJpgFile');
        if (!fileInput.files.length) {
            alert('Please select at least one JPG or PDF file.');
            return;
        }        

        var formData = new FormData();
        for (var i = 0; i < fileInput.files.length; i++) {
            formData.append('files', fileInput.files[i]);
        }

        var uploadStatus = document.getElementById('uploadPdfStatus');
        var downloadLink = document.getElementById('downloadPdfLink2');

        uploadStatus.innerHTML = '<div class="spinner-border text-warning" role="status"><span class="visually-hidden">Loading...</span></div>';
        downloadLink.innerHTML = '';

        fetch('/upload-images-to-pdf/', {
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

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrfToken = getCookie('csrftoken');
});
