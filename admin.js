// Admin-specific JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Image upload preview
    const fileUpload = document.getElementById('file-upload');
    const previewContainer = document.getElementById('image-preview');
    
    if (fileUpload && previewContainer) {
        fileUpload.addEventListener('change', function(e) {
            previewContainer.innerHTML = '';
            
            if (this.files.length > 0) {
                previewContainer.classList.remove('hidden');
                
                Array.from(this.files).forEach(file => {
                    if (file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const imgContainer = document.createElement('div');
                            imgContainer.className = 'relative';
                            
                            const img = document.createElement('img');
                            img.src = e.target.result;
                            img.className = 'preview-image rounded border p-1 w-full';
                            
                            const removeBtn = document.createElement('button');
                            removeBtn.className = 'absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center';
                            removeBtn.innerHTML = '&times;';
                            removeBtn.onclick = () => imgContainer.remove();
                            
                            imgContainer.appendChild(img);
                            imgContainer.appendChild(removeBtn);
                            previewContainer.appendChild(imgContainer);
                        }
                        reader.readAsDataURL(file);
                    }
                });
            } else {
                previewContainer.classList.add('hidden');
            }
        });
    }

    // Form submission
    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const productName = this.querySelector('input[type="text"]').value;
            if (!productName) {
                alert('Please enter a product name');
                return;
            }

            // In a real app, you would send data to server here
            console.log('Product data:', {
                name: productName,
                description: this.querySelector('textarea').value,
                price: this.querySelector('input[type="number"]').value,
                category: this.querySelector('select').value,
                images: fileUpload.files
            });

            alert('Product saved successfully!');
            this.reset();
            previewContainer.classList.add('hidden');
            previewContainer.innerHTML = '';
        });
    }

    // Drag and drop functionality
    const dropZone = document.querySelector('.border-dashed');
    if (dropZone) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, unhighlight, false);
        });

        function highlight() {
            dropZone.classList.add('border-indigo-500');
        }

        function unhighlight() {
            dropZone.classList.remove('border-indigo-500');
        }

        dropZone.addEventListener('drop', handleDrop, false);

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            fileUpload.files = files;
            const event = new Event('change');
            fileUpload.dispatchEvent(event);
        }
    }
});