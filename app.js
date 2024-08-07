function openMenu() {
    document.body.classList += " menu--open"
}

function closeMenu() {
    document.body.classList.remove( 'menu--open')
}

// API Key: zAwAjj/EKd4+VfWxKCJFng==SEtRAmMkvpuHC19l
// API Cars: https://api.api-ninjas.com/v1/cars?limit=2&model=
// API Motorcycles: https://api.api-ninjas.com/v1/motorcycles



function searchMotorcycles() {
    const searchTerm = document.querySelector('input[type="text"]').value.trim().toLowerCase();
    const apiKey = 'zAwAjj/EKd4+VfWxKCJFng==SEtRAmMkvpuHC19l';
    
    const searchParams = new URLSearchParams({
        make: searchTerm,
        model: searchTerm,
        limit: 6
    });

    fetch(`https://api.api-ninjas.com/v1/motorcycles?${searchParams.toString()}`, {
        headers: {
            'X-Api-Key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('API Response:', data);
        const limitedData = Array.isArray(data) ? data.slice(0, 6) : [];
        displayMotorcycles(limitedData);
    })
    .catch(error => console.error('Error:', error));
}

function displayMotorcycles(motorcycles) {
    const contentWrapper = document.querySelector('.content-wrapper');
    
    const existingContent = document.querySelector('.motorcycle-grid, .no-results');
    if (existingContent) {
        existingContent.remove();
    }

    if (motorcycles.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.textContent = 'No results';
        contentWrapper.appendChild(noResults);
    } else {
        const motorcycleGrid = document.createElement('div');
        motorcycleGrid.className = 'motorcycle-grid';

        motorcycles.forEach(motorcycle => {
            const motorcycleBox = document.createElement('div');
            motorcycleBox.className = 'motorcycle-box';
            motorcycleBox.innerHTML = `
            <div class=moto__data-container>
                <div class=icon__container>
                    <i class="fa-solid fa-motorcycle"></i>
                </div>    
                <div class=moto__data>
                    <h3>${motorcycle.make} ${motorcycle.model}</h3>
                    <p>Year: ${motorcycle.year}</p>
                    <p>Engine: ${motorcycle.engine}</p>
                    <p>Power: ${motorcycle.power}</p>
                    </div>
            </div>        
            `;
            motorcycleGrid.appendChild(motorcycleBox);
        });

        contentWrapper.appendChild(motorcycleGrid);
    }
}