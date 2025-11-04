
// Application State
let currentStep = 1;
const totalSteps = 6;
const stepNames = ["Contact", "Consumption", "Plant Cost", "CM1", "Environment", "Financial"];

// Data Storage
const appData = {
    contact: {
        name: "",
        phone: "",
        address: "",
        company: ""
    },
    consumption: {
        monthlyBill: "",
        currentTariff: "",
        solarAtlas: ""
    },
    cm1: {
        purchaseCostPerKW: ""
    },
    financial: {
        currentBillPaymentYear: ""
    }
};

// Calculations Cache
let calculations = {
    phase2: {},
    proposalPrice: 0,
    plantCostWOGST: 0,
    cm1: 0,
    environmental: {},
    financial: {}
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProgressBar();
    renderStep();
    updateNavigation();
});

// Progress Bar
function renderProgressBar() {
    const progressBar = document.getElementById('progressBar');
    
    const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    
    let html = '<div class="progress-steps">';
    html += '<div class="progress-line"><div class="progress-line-fill" style="width: ' + percentage + '%"></div></div>';
    
    for (let i = 1; i <= totalSteps; i++) {
        const isCompleted = i < currentStep;
        const isActive = i === currentStep;
        
        html += '<div class="step-item">';
        html += '<div class="step-circle ' + (isCompleted ? 'completed' : '') + ' ' + (isActive ? 'active' : '') + '">';
        html += isCompleted ? '✓' : i;
        html += '</div>';
        html += '<div class="step-label ' + (isActive ? 'active' : '') + '">' + stepNames[i - 1] + '</div>';
        html += '</div>';
    }
    
    html += '</div>';
    progressBar.innerHTML = html;
}

// Step Rendering
function renderStep() {
    const stepContent = document.getElementById('stepContent');
    
    switch(currentStep) {
        case 1:
            stepContent.innerHTML = renderContactStep();
            break;
        case 2:
            calculatePhase2();
            stepContent.innerHTML = renderConsumptionStep();
            break;
        case 3:
            calculatePlantCost();
            stepContent.innerHTML = renderPlantCostStep();
            break;
        case 4:
            calculateCM1();
            stepContent.innerHTML = renderCM1Step();
            break;
        case 5:
            calculateEnvironmental();
            stepContent.innerHTML = renderEnvironmentalStep();
            break;
        case 6:
            calculateFinancial();
            stepContent.innerHTML = renderFinancialStep();
            break;
    }
    
    attachEventListeners();
}

// Step 1: Contact
function renderContactStep() {
    return `
        <div class="form-section">
            <div class="section-header">
                <h2>Contact Information</h2>
                <p>Please provide your details to get started</p>
            </div>
            <div class="form-grid two-col">
                <div class="form-group">
                    <label for="name">Full Name *</label>
                    <input type="text" id="name" value="${appData.contact.name}" maxlength="100" placeholder="Enter your name">
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number *</label>
                    <input type="text" id="phone" value="${appData.contact.phone}" maxlength="15" placeholder="Enter your phone">
                </div>
                <div class="form-group full-width">
                    <label for="address">Address *</label>
                    <input type="text" id="address" value="${appData.contact.address}" maxlength="200" placeholder="Enter your address">
                </div>
                <div class="form-group full-width">
                    <label for="company">Company Name *</label>
                    <input type="text" id="company" value="${appData.contact.company}" maxlength="100" placeholder="Enter company name">
                </div>
            </div>
        </div>
    `;
}

// Step 2: Consumption
function renderConsumptionStep() {
    const calcs = calculations.phase2;
    const hasCalcs = calcs.unitsMonth > 0;
    
    return `
        <div class="form-section">
            <div class="section-header">
                <h2>Consumption Data</h2>
                <p>Enter your electricity consumption details</p>
            </div>
            <div class="form-grid two-col">
                <div class="form-group">
                    <label for="monthlyBill">Monthly Bill (₹) *</label>
                    <input type="text" id="monthlyBill" value="${appData.consumption.monthlyBill}" placeholder="e.g., 5000">
                </div>
                <div class="form-group">
                    <label for="currentTariff">Current Tariff (₹/unit) *</label>
                    <input type="text" id="currentTariff" value="${appData.consumption.currentTariff}" placeholder="e.g., 8.5">
                </div>
                <div class="form-group full-width">
                    <label for="solarAtlas">Solar Atlas Input (kWh/m²/day) *</label>
                    <input type="text" id="solarAtlas" value="${appData.consumption.solarAtlas}" placeholder="e.g., 5.5">
                </div>
            </div>
            ${hasCalcs ? `
                <div class="info-card">
                    <h3>Calculated Values</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">Units/Month:</span>
                            <span class="info-value">${calcs.unitsMonth.toFixed(2)}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Units/Day:</span>
                            <span class="info-value">${calcs.unitsDay.toFixed(2)}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Generation/Day:</span>
                            <span class="info-value">${calcs.generationsDay.toFixed(2)}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Plant Capacity:</span>
                            <span class="info-value">${calcs.plantCapacity.toFixed(2)} W</span>
                        </div>
                        <div class="info-item" style="grid-column: 1/-1">
                            <span class="info-label">Sanctioned Load:</span>
                            <span class="info-value highlight">${calcs.sanctionedLoad.toFixed(2)} W</span>
                        </div>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

// Step 3: Plant Cost
function renderPlantCostStep() {
    const sl = calculations.phase2.sanctionedLoad;
    const pp = calculations.proposalPrice;
    const pc = calculations.plantCostWOGST;
    
    if (sl > 100000) {
        return `
            <div class="form-section">
                <div class="alert error">
                    <span>⚠️</span>
                    <div>
                        <strong>Out of Range</strong><br>
                        The calculated sanctioned load (${sl.toFixed(2)} W) exceeds our maximum capacity range. Please contact us directly for custom solutions.
                    </div>
                </div>
            </div>
        `;
    }
    
    const priceRange = getPriceRange(sl);
    
    return `
        <div class="form-section">
            <div class="section-header">
                <h2>Plant Cost Analysis</h2>
                <p>Based on your sanctioned load calculation</p>
            </div>
            <div class="info-card" style="background: linear-gradient(135deg, rgba(26, 155, 142, 0.1), rgba(72, 179, 130, 0.05)); border-color: rgba(26, 155, 142, 0.2);">
                <div style="padding: 1rem;">
                    <div class="info-item" style="padding-bottom: 1rem; border-bottom: 1px solid var(--border); margin-bottom: 1rem;">
                        <span class="info-label">Sanctioned Load</span>
                        <span style="font-size: 1.25rem; font-weight: 600;">${sl.toFixed(2)} W</span>
                    </div>
                    <div class="info-item" style="padding-bottom: 1rem; border-bottom: 1px solid var(--border); margin-bottom: 1rem;">
                        <span class="info-label">Price Range</span>
                        <span style="font-size: 1rem; font-weight: 500;">${priceRange}</span>
                    </div>
                    <div class="info-item" style="padding-bottom: 1rem; border-bottom: 1px solid var(--border); margin-bottom: 1rem;">
                        <span class="info-label">Proposal Price per W</span>
                        <span class="info-value highlight" style="font-size: 1rem;">₹${pp.toLocaleString()}</span>
                    </div>
                    <div class="info-item" style="padding-top: 0.5rem;">
                        <span style="font-weight: 500;">Plant Cost (W/O GST)</span>
                        <span class="info-value highlight" style="font-size: 1.5rem; font-weight: 700;">₹${pc.toLocaleString('en-IN')}</span>
                    </div>
                </div>
            </div>
            <div class="alert info">
                <span>ℹ️</span>
                <div>This cost is calculated based on the benchmark pricing for your sanctioned load range. GST and other applicable taxes will be added separately.</div>
            </div>
        </div>
    `;
}

// Step 4: CM1
function renderCM1Step() {
    const pc = calculations.plantCostWOGST;
    const plantCap = calculations.phase2.plantCapacity;
    const pckw = calculations.proposalPrice;
    const purchaseCost = appData.cm1.purchaseCostPerKW;
    const cm1 = calculations.cm1;
    
    return `
        <div class="form-section">
            <div class="section-header">
                <h2>CM1 Calculation</h2>
                <p>Cost margin analysis based on your purchase cost</p>
            </div>
            <div class="info-card">
                <h3>Auto-Fed Values</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Plant Cost:</span>
                        <span class="info-value">₹${pc.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Plant Capacity:</span>
                        <span class="info-value">${plantCap.toFixed(2)} W</span>
                    </div>
                    <div class="info-item" style="grid-column: 1/-1">
                        <span class="info-label">Plant Cost/KW:</span>
                        <span class="info-value highlight">₹${pckw.toLocaleString()}</span>
                    </div>
                </div>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label for="purchaseCostKW">Purchase Cost per KW (₹) *</label>
                    <input type="text" id="purchaseCostKW" value="${purchaseCost}" placeholder="Enter your purchase cost per KW">
                </div>
            </div>
            ${purchaseCost && parseFloat(purchaseCost) > 0 ? `
                <div class="stat-card success" style="margin-top: 1.5rem;">
                    <div style="text-align: center;">
                        <div class="stat-label">Cost Margin (CM1)</div>
                        <div style="font-size: 2.5rem; font-weight: 700; color: var(--success); margin: 1rem 0;">
                            ${(cm1 * 100).toFixed(2)}%
                        </div>
                        <div class="stat-unit">${cm1 > 0 ? 'Positive margin' : 'Negative margin'}</div>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

// Step 5: Environmental
function renderEnvironmentalStep() {
    const env = calculations.environmental;
    
    return `
        <div class="form-section">
            <div class="section-header">
                <h2>Environmental Impact</h2>
                <p>Your contribution to a greener planet</p>
            </div>
            <div class="stats-grid">
                <div class="stat-card success">
                    <div class="stat-icon">🌱</div>
                    <div class="stat-label">Annual CO₂ Savings</div>
                    <div class="stat-value">${env.co2SavingsYear.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
                    <div class="stat-unit">kg CO₂/year</div>
                </div>
                <div class="stat-card success">
                    <div class="stat-icon">🌳</div>
                    <div class="stat-label">25-Year CO₂ Savings</div>
                    <div class="stat-value">${env.lifetimeCO2Savings.toFixed(3)}</div>
                    <div class="stat-unit">Million kg CO₂</div>
                </div>
            </div>
            <div class="info-card" style="text-align: center; margin-top: 1rem;">
                <p style="font-size: 0.875rem; color: var(--muted-foreground);">
                    Equivalent to planting approximately 
                    <span style="font-weight: 600; color: var(--success);">${Math.round(env.co2SavingsYear / 21.77).toLocaleString()}</span> 
                    trees per year
                </p>
            </div>
        </div>
    `;
}

// Step 6: Financial
function renderFinancialStep() {
    const pc = calculations.plantCostWOGST;
    const currentBill = appData.financial.currentBillPaymentYear;
    const fin = calculations.financial;
    
    return `
        <div class="form-section">
            <div class="section-header">
                <h2>Financial Summary</h2>
                <p>Long-term savings and investment analysis</p>
            </div>
            <div class="info-card">
                <div class="info-item">
                    <span class="info-label">Plant Cost (W/O GST):</span>
                    <span class="info-value">₹${pc.toLocaleString('en-IN')}</span>
                </div>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label for="currentBillYear">Current Bill Payment per Year (₹) *</label>
                    <input type="text" id="currentBillYear" value="${currentBill}" placeholder="Enter annual electricity bill">
                </div>
            </div>
            ${currentBill && parseFloat(currentBill) > 0 ? `
                <div class="stats-grid" style="margin-top: 1.5rem;">
                    <div class="stat-card info">
                        <div class="stat-icon">📅</div>
                        <div class="stat-label">Payback Period</div>
                        <div class="stat-value">${fin.paybackYears.toFixed(1)}</div>
                        <div class="stat-unit">years</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">📈</div>
                        <div class="stat-label">25-Year Bill Total</div>
                        <div class="stat-value" style="font-size: 1.5rem;">₹${fin.next25Years.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
                    </div>
                    <div class="stat-card success" style="grid-column: 1/-1;">
                        <div class="stat-icon">💰</div>
                        <div class="stat-label">Lifetime Savings (25 Years)</div>
                        <div class="stat-value" style="font-size: 2.5rem; color: var(--success);">₹${fin.lifetimeSavings.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
                        <div class="stat-unit">After plant cost and maintenance (₹3L/year)</div>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

// Calculations
function calculatePhase2() {
    const mb = parseFloat(appData.consumption.monthlyBill) || 0;
    const ct = parseFloat(appData.consumption.currentTariff) || 0;
    const sa = parseFloat(appData.consumption.solarAtlas) || 0;
    
    calculations.phase2 = {
        unitsMonth: ct > 0 ? mb / ct : 0,
        unitsDay: ct > 0 ? (mb / ct) / 30 : 0,
        generationsDay: (sa * 1000) / 365,
        plantCapacity: 0,
        sanctionedLoad: 0
    };
    
    const gd = calculations.phase2.generationsDay;
    calculations.phase2.plantCapacity = gd > 0 ? (calculations.phase2.unitsDay / gd) * 1000 : 0;
    calculations.phase2.sanctionedLoad = calculations.phase2.plantCapacity * 0.8;
}

function calculatePlantCost() {
    const sl = calculations.phase2.sanctionedLoad;
    calculations.proposalPrice = getProposalPrice(sl);
    calculations.plantCostWOGST = sl * calculations.proposalPrice;
}

function calculateCM1() {
    const puckw = parseFloat(appData.cm1.purchaseCostPerKW) || 0;
    const pp = calculations.proposalPrice;
    calculations.cm1 = (pp > 0 && puckw > 0) ? 1 - (puckw / pp) : 0;
}

function calculateEnvironmental() {
    const sl = calculations.phase2.sanctionedLoad;
    calculations.environmental = {
        co2SavingsYear: 0.792 * sl * 365,
        lifetimeCO2Savings: (sl * 25) / 1000000
    };
}

function calculateFinancial() {
    const cbpy = parseFloat(appData.financial.currentBillPaymentYear) || 0;
    const pc = calculations.plantCostWOGST;
    
    calculations.financial = {
        next25Years: cbpy * 25,
        paybackYears: cbpy > 0 ? pc / cbpy : 0,
        lifetimeSavings: (cbpy * 25) - pc - (300000 * 25)
    };
}

// Helper Functions
function getProposalPrice(sanctionedLoad) {
    if (sanctionedLoad <= 100) return 39500;
    if (sanctionedLoad <= 500) return 37000;
    if (sanctionedLoad <= 1000) return 35000;
    if (sanctionedLoad <= 10000) return 33400;
    if (sanctionedLoad <= 100000) return 30500;
    return 0;
}

function getPriceRange(sanctionedLoad) {
    if (sanctionedLoad <= 100) return "0 - 100 W";
    if (sanctionedLoad <= 500) return "100 - 500 W";
    if (sanctionedLoad <= 1000) return "500 - 1,000 W";
    if (sanctionedLoad <= 10000) return "1,000 - 10,000 W";
    if (sanctionedLoad <= 100000) return "10,000 - 100,000 W";
    return "Out of Range";
}

// Event Listeners
function attachEventListeners() {
    // Contact Step
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const companyInput = document.getElementById('company');
    
    if (nameInput) nameInput.addEventListener('input', (e) => appData.contact.name = e.target.value);
    if (phoneInput) phoneInput.addEventListener('input', (e) => appData.contact.phone = e.target.value);
    if (addressInput) addressInput.addEventListener('input', (e) => appData.contact.address = e.target.value);
    if (companyInput) companyInput.addEventListener('input', (e) => appData.contact.company = e.target.value);
    
    // Consumption Step
    const monthlyBillInput = document.getElementById('monthlyBill');
    const currentTariffInput = document.getElementById('currentTariff');
    const solarAtlasInput = document.getElementById('solarAtlas');
    
    if (monthlyBillInput) {
        monthlyBillInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9.]/g, '');
            appData.consumption.monthlyBill = e.target.value;
            calculatePhase2();
            renderStep();
        });
    }
    if (currentTariffInput) {
        currentTariffInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9.]/g, '');
            appData.consumption.currentTariff = e.target.value;
            calculatePhase2();
            renderStep();
        });
    }
    if (solarAtlasInput) {
        solarAtlasInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9.]/g, '');
            appData.consumption.solarAtlas = e.target.value;
            calculatePhase2();
            renderStep();
        });
    }
    
    // CM1 Step
    const purchaseCostInput = document.getElementById('purchaseCostKW');
    if (purchaseCostInput) {
        purchaseCostInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9.]/g, '');
            appData.cm1.purchaseCostPerKW = e.target.value;
            calculateCM1();
            renderStep();
        });
    }
    
    // Financial Step
    const currentBillYearInput = document.getElementById('currentBillYear');
    if (currentBillYearInput) {
        currentBillYearInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9.]/g, '');
            appData.financial.currentBillPaymentYear = e.target.value;
            calculateFinancial();
            renderStep();
        });
    }
}

// Navigation
function validateStep() {
    switch(currentStep) {
        case 1:
            if (!appData.contact.name || !appData.contact.phone || !appData.contact.address || !appData.contact.company) {
                showToast("Please fill in all contact fields", "error");
                return false;
            }
            return true;
        case 2:
            if (!appData.consumption.monthlyBill || !appData.consumption.currentTariff || !appData.consumption.solarAtlas) {
                showToast("Please fill in all consumption fields", "error");
                return false;
            }
            return true;
        case 4:
            if (!appData.cm1.purchaseCostPerKW) {
                showToast("Please enter purchase cost per KW", "error");
                return false;
            }
            return true;
        case 6:
            if (!appData.financial.currentBillPaymentYear) {
                showToast("Please enter current bill payment per year", "error");
                return false;
            }
            return true;
        default:
            return true;
    }
}

function nextStep() {
    if (validateStep()) {
        if (currentStep < totalSteps) {
            currentStep++;
            renderProgressBar();
            renderStep();
            updateNavigation();
            window.scrollTo(0, 0);
        } else {
            showToast("Calculation Complete!", "success");
        }
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        renderProgressBar();
        renderStep();
        updateNavigation();
        window.scrollTo(0, 0);
    }
}

function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const nextBtnText = document.getElementById('nextBtnText');
    
    prevBtn.disabled = currentStep === 1;
    
    if (currentStep === totalSteps) {
        nextBtnText.textContent = "Complete";
    } else {
        nextBtnText.textContent = "Next →";
    }
}

// Toast Notifications
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
   const toggle = document.getElementById(toggleId),
         nav = document.getElementById(navId)

   toggle.addEventListener('click', () =>{
       // Add show-menu class to nav menu
       nav.classList.toggle('show-menu')
       // Add show-icon to show and hide menu icon
       toggle.classList.toggle('show-icon')
   })
}

showMenu('nav-toggle','nav-menu')

/*=============== SHOW DROPDOWN MENU ===============*/
const dropdownItems = document.querySelectorAll('.dropdown__item')

// 1. Select each dropdown item
dropdownItems.forEach((item) =>{
    const dropdownButton = item.querySelector('.dropdown__button') 

    // 2. Select each button click
    dropdownButton.addEventListener('click', () =>{
        // 7. Select the current show-dropdown class
        const showDropdown = document.querySelector('.show-dropdown')
        
        // 5. Call the toggleItem function
        toggleItem(item)

        // 8. Remove the show-dropdown class from other items
        if(showDropdown && showDropdown!== item){
            toggleItem(showDropdown)
        }
    })
})

// 3. Create a function to display the dropdown
const toggleItem = (item) =>{
    // 3.1. Select each dropdown content
    const dropdownContainer = item.querySelector('.dropdown__container')

    // 6. If the same item contains the show-dropdown class, remove
    if(item.classList.contains('show-dropdown')){
        dropdownContainer.removeAttribute('style')
        item.classList.remove('show-dropdown')
    } else{
        // 4. Add the maximum height to the dropdown content and add the show-dropdown class
        dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px'
        item.classList.add('show-dropdown')
    }
}

/*=============== DELETE DROPDOWN STYLES ===============*/
const mediaQuery = matchMedia('(min-width: 1118px)'),
      dropdownContainer = document.querySelectorAll('.dropdown__container')

// Function to remove dropdown styles in mobile mode when browser resizes
const removeStyle = () =>{
    // Validate if the media query reaches 1118px
    if(mediaQuery.matches){
        // Remove the dropdown container height style
        dropdownContainer.forEach((e) =>{
            e.removeAttribute('style')
        })

        // Remove the show-dropdown class from dropdown item
        dropdownItems.forEach((e) =>{
            e.classList.remove('show-dropdown')
        })
    }
}
