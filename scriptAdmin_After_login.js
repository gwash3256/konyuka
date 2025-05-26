document.addEventListener('DOMContentLoaded', function () {
    const carCards = document.querySelectorAll('.car-card');
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const carIndexInput = document.getElementById('car-index');
    const editNameInput = document.getElementById('edit-name');
    const editDetailsInput = document.getElementById('edit-details');
    const editPriceInput = document.getElementById('edit-price');
    const editMaintenanceInput = document.getElementById('edit-maintenance');
    const closeModalButton = document.querySelector('.close-modal');

    let currentEditingIndex = null; // Stores which car card is being edited
    let carImages = {}; // Store images separately for each car

    // Close modal when clicking close button
    closeModalButton.addEventListener('click', () => editModal.classList.remove('active'));

    carCards.forEach((card, index) => {
        let images = JSON.parse(card.dataset.images.replace(/'/g, '"'));
        carImages[index] = images;
        let currentImageIndex = 0;
        const carImage = card.querySelector('.car-image');

        function updateImageDisplay() {
            if (carImages[index].length > 0) {
                carImage.src = carImages[index][currentImageIndex];
            } else {
                carImage.src = 'placeholder.jpg'; // Default image if none exist
            }
        }

        // Image Navigation for each car separately
        card.querySelector('.prev-btn').addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + carImages[index].length) % carImages[index].length;
            updateImageDisplay();
        });

        card.querySelector('.next-btn').addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % carImages[index].length;
            updateImageDisplay();
        });

        // Edit Images for this specific car
        card.querySelector('.edit-image-btn').addEventListener('click', () => {
            let imageEditModal = document.createElement('div');
            imageEditModal.classList.add('edit-modal', 'active');
            imageEditModal.innerHTML = `
                <h3>Edit Images for ${card.querySelector('h3').textContent}</h3>
                <div id="image-preview">
                    ${carImages[index].map((img, i) => `
                        <div class="image-item">
                            <img src="${img}" width="100">
                            <button class="delete-img" data-index="${i}">❌</button>
                        </div>`).join('')}
                </div>
                <input type="file" id="new-image" accept="image/*">
                <button id="add-image">Add Image</button>
                <button id="close-image-modal">Close</button>
            `;
            document.body.appendChild(imageEditModal);

            // Add New Image to This Car
            document.getElementById('add-image').addEventListener('click', () => {
                let input = document.getElementById('new-image');
                if (input.files && input.files[0]) {
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        carImages[index].push(e.target.result);
                        updateImageDisplay();
                        imageEditModal.remove();
                        card.querySelector('.edit-image-btn').click(); // Reopen modal with new images
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            });

            // Delete Image from This Car
            document.querySelectorAll('.delete-img').forEach((btn) => {
                btn.addEventListener('click', function () {
                    let imgIndex = parseInt(this.dataset.index);
                    carImages[index].splice(imgIndex, 1);
                    updateImageDisplay();
                    imageEditModal.remove();
                    card.querySelector('.edit-image-btn').click(); // Reopen modal
                });
            });

            // Close Image Edit Modal
            document.getElementById('close-image-modal').addEventListener('click', () => {
                imageEditModal.remove();
            });
        });

        // Edit Car Details - Open Modal
        card.querySelector('.edit-btn').addEventListener('click', () => {
            editModal.classList.add('active');
            currentEditingIndex = index; // Store which car is being edited

            // Fill in existing values
            editNameInput.value = card.querySelector('h3').textContent;
            editDetailsInput.value = card.querySelector('p:nth-child(2)').textContent;
            editPriceInput.value = card.querySelector('p:nth-child(3)').textContent.replace('Price: ', '');
            editMaintenanceInput.value = card.querySelector('p:nth-child(4)').textContent.replace('Maintainance Due: ', '');
        });
    });

    // Save Changes Button - Updates Details on the Correct Car Card & Closes Modal
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (currentEditingIndex === null) return; // Prevents errors if no card is selected

        let selectedCard = carCards[currentEditingIndex];

        // Update text content
        selectedCard.querySelector('h3').textContent = editNameInput.value;
        selectedCard.querySelector('p:nth-child(2)').textContent = editDetailsInput.value;
        selectedCard.querySelector('p:nth-child(3)').textContent = `Price: ${editPriceInput.value}`;
        selectedCard.querySelector('p:nth-child(4)').textContent = `Maintainance Due: ${editMaintenanceInput.value}`;

        editModal.classList.remove('active'); // Close modal after saving
        currentEditingIndex = null; // Reset
    });
});
