// Data Store
const calculatorData = {
    contact: {},
    consumption: {},
    calculated: {},
    cost: {},
    cm1: {},
    environmental: {},
    financial: {}
};

let currentStep = 1;

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('solarCalcTheme') || 'dark';
    document.body.classList.toggle('dark', savedTheme === 'dark');
    updateThemeIcon();
}

function toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('solarCalcTheme', isDark ? 'dark' : 'light');
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = document.body.classList.contains('dark');
    document.getElementById('themeIcon').textContent = isDark ? '☀️' : '🌙';
}

// Step Navigation
function updateStepIndicator() {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.toggle('active', stepNum === currentStep);
        step.classList.toggle('completed', stepNum < currentStep);
    });
}

function showStep(stepNumber) {
    // Hide hero section after step 1
    const heroSection = document.getElementById('heroSection');
    if (heroSection) {
        heroSection.style.display = stepNumber === 1 ? 'block' : 'none';
    }

    // Hide all steps
    document.querySelectorAll('.step-content').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show current step
    document.getElementById(`step${stepNumber}`).classList.add('active');
    currentStep = stepNumber;
    updateStepIndicator();
    
    // Populate data if returning to a step
    populateStepData(stepNumber);
}

function nextStep() {
    if (currentStep < 6) {
        showStep(currentStep + 1);
    }
}

function previousStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

function populateStepData(stepNumber) {
    switch(stepNumber) {
        case 3:
            if (calculatorData.calculated.sanctionedLoad) {
                calculateCost();
            }
            break;
        case 4:
            if (calculatorData.cost.plantCostWOGST) {
                populateCM1Data();
            }
            break;
        case 5:
            if (calculatorData.calculated.sanctionedLoad) {
                calculateEnvironmentalImpact();
            }
            break;
        case 6:
            if (calculatorData.cost.plantCostWOGST) {
                populateFinancialData();
            }
            break;
    }
}

// Validation Helper
function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
    return false;
}

function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// Step 1: Contact Form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const company = document.getElementById('company').value.trim();
    
    let isValid = true;
    
    if (!name) {
        showError('name', 'Name is required');
        isValid = false;
    } else {
        clearError('name');
    }
    
    if (!phone) {
        showError('phone', 'Phone number is required');
        isValid = false;
    } else {
        clearError('phone');
    }
    
    if (!address) {
        showError('address', 'Address is required');
        isValid = false;
    } else {
        clearError('address');
    }
    
    if (!company) {
        showError('company', 'Company name is required');
        isValid = false;
    } else {
        clearError('company');
    }
    
    if (isValid) {
        calculatorData.contact = { name, phone, address, company };
        nextStep();
    }
});

// Step 2: Consumption Calculator
document.getElementById('consumptionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const monthlyBill = parseFloat(document.getElementById('monthlyBill').value);
    const currentTariff = parseFloat(document.getElementById('currentTariff').value);
    const solarAtlas = parseFloat(document.getElementById('solarAtlas').value);
    
    let isValid = true;
    
    if (!monthlyBill || monthlyBill <= 0) {
        showError('monthlyBill', 'Please enter a valid monthly bill');
        isValid = false;
    } else {
        clearError('monthlyBill');
    }
    
    if (!currentTariff || currentTariff <= 0) {
        showError('currentTariff', 'Please enter a valid tariff');
        isValid = false;
    } else {
        clearError('currentTariff');
    }
    
    if (!solarAtlas || solarAtlas <= 0) {
        showError('solarAtlas', 'Please enter valid solar atlas data');
        isValid = false;
    } else {
        clearError('solarAtlas');
    }
    
    if (isValid) {
        calculatorData.consumption = { monthlyBill, currentTariff, solarAtlas };
        calculateConsumption();
        nextStep();
    }
});

function calculateConsumption() {
    const { monthlyBill, currentTariff, solarAtlas } = calculatorData.consumption;
    
    const unitsPerMonth = monthlyBill / currentTariff;
    const unitsPerDay = unitsPerMonth / 30;
    const generationsPerDay = (solarAtlas * 1000) / 365;
    const plantCapacity = (unitsPerDay / generationsPerDay) * 1000;
    const sanctionedLoad = plantCapacity * 0.80;
    
    calculatorData.calculated = {
        unitsPerMonth: unitsPerMonth.toFixed(2),
        unitsPerDay: unitsPerDay.toFixed(2),
        generationsPerDay: generationsPerDay.toFixed(2),
        plantCapacity: plantCapacity.toFixed(2),
        sanctionedLoad: sanctionedLoad.toFixed(2)
    };
    
    // Display results
    document.getElementById('unitsPerMonth').textContent = calculatorData.calculated.unitsPerMonth;
    document.getElementById('unitsPerDay').textContent = calculatorData.calculated.unitsPerDay;
    document.getElementById('generationsPerDay').textContent = calculatorData.calculated.generationsPerDay;
    document.getElementById('plantCapacity').textContent = calculatorData.calculated.plantCapacity + ' W';
    document.getElementById('sanctionedLoad').textContent = calculatorData.calculated.sanctionedLoad + ' W';
    document.getElementById('consumptionResults').style.display = 'grid';
}

// Step 3: Cost Determination
function calculateCost() {
    const sanctionedLoad = parseFloat(calculatorData.calculated.sanctionedLoad);
    let proposalPrice;
    
    if (sanctionedLoad <= 100) {
        proposalPrice = 39500;
    } else if (sanctionedLoad <= 500) {
        proposalPrice = 37000;
    } else if (sanctionedLoad <= 1000) {
        proposalPrice = 35000;
    } else if (sanctionedLoad <= 10000) {
        proposalPrice = 33400;
    } else if (sanctionedLoad <= 100000) {
        proposalPrice = 30500;
    } else {
        alert('Sanctioned Load exceeds supported range');
        return;
    }
    
    const plantCostWOGST = sanctionedLoad * proposalPrice;
    
    calculatorData.cost = {
        proposalPrice,
        plantCostWOGST: plantCostWOGST.toFixed(2)
    };
    
    document.getElementById('costSanctionedLoad').textContent = sanctionedLoad.toFixed(2) + ' W';
    document.getElementById('proposalPrice').textContent = '₹' + proposalPrice.toLocaleString();
    document.getElementById('plantCostWOGST').textContent = '₹' + parseFloat(calculatorData.cost.plantCostWOGST).toLocaleString();
}

// Step 4: CM1 Calculator
function populateCM1Data() {
    document.getElementById('cm1PlantCost').textContent = '₹' + parseFloat(calculatorData.cost.plantCostWOGST).toLocaleString();
    document.getElementById('cm1PlantCapacity').textContent = calculatorData.calculated.plantCapacity + ' W';
    document.getElementById('cm1PlantCostPerKW').textContent = '₹' + calculatorData.cost.proposalPrice.toLocaleString();
}

document.getElementById('cm1Form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const purchaseCostPerKW = parseFloat(document.getElementById('purchaseCostPerKW').value);
    
    if (!purchaseCostPerKW || purchaseCostPerKW <= 0) {
        showError('purchaseCostPerKW', 'Please enter a valid purchase cost');
        return;
    }
    
    clearError('purchaseCostPerKW');
    
    const cm1 = 1 - (purchaseCostPerKW / calculatorData.cost.proposalPrice);
    
    calculatorData.cm1 = {
        purchaseCostPerKW,
        cm1: cm1.toFixed(4)
    };
    
    document.getElementById('cm1Value').textContent = (cm1 * 100).toFixed(2) + '%';
    document.getElementById('cm1Results').style.display = 'grid';
    
    setTimeout(() => nextStep(), 500);
});

// Step 5: Environmental Impact
function calculateEnvironmentalImpact() {
    const sanctionedLoad = parseFloat(calculatorData.calculated.sanctionedLoad);
    
    const co2SavingsYear = 0.792 * sanctionedLoad * 365;
    const co2SavingsLifetime = (sanctionedLoad * 25) / 1000000;
    
    calculatorData.environmental = {
        co2SavingsYear: co2SavingsYear.toFixed(2),
        co2SavingsLifetime: co2SavingsLifetime.toFixed(4)
    };
    
    document.getElementById('co2SavingsYear').textContent = parseFloat(calculatorData.environmental.co2SavingsYear).toLocaleString() + ' Kg';
    document.getElementById('co2SavingsLifetime').textContent = calculatorData.environmental.co2SavingsLifetime + ' Million Kg';
}

// Step 6: Financial Summary
function populateFinancialData() {
    document.getElementById('finalPlantCost').textContent = '₹' + parseFloat(calculatorData.cost.plantCostWOGST).toLocaleString();
}

document.getElementById('financialForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const currentBillPaymentPerYear = parseFloat(document.getElementById('currentBillPaymentPerYear').value);
    
    if (!currentBillPaymentPerYear || currentBillPaymentPerYear <= 0) {
        showError('currentBillPaymentPerYear', 'Please enter a valid annual payment');
        return;
    }
    
    clearError('currentBillPaymentPerYear');
    
    const plantCost = parseFloat(calculatorData.cost.plantCostWOGST);
    const billPayment25Years = currentBillPaymentPerYear * 25;
    const paybackYears = plantCost / currentBillPaymentPerYear;
    const lifetimeSavings = billPayment25Years - plantCost - (300000 * 25);
    
    calculatorData.financial = {
        currentBillPaymentPerYear,
        billPayment25Years: billPayment25Years.toFixed(2),
        paybackYears: paybackYears.toFixed(2),
        lifetimeSavings: lifetimeSavings.toFixed(2)
    };
    
    document.getElementById('billPayment25Years').textContent = '₹' + parseFloat(calculatorData.financial.billPayment25Years).toLocaleString();
    document.getElementById('paybackYears').textContent = calculatorData.financial.paybackYears + ' years';
    document.getElementById('lifetimeSavings').textContent = '₹' + parseFloat(calculatorData.financial.lifetimeSavings).toLocaleString();
    document.getElementById('financialResults').style.display = 'grid';
    document.getElementById('printBtn').style.display = 'inline-block';
});

// Print Report
function printReport() {
    // Populate print summary with all data
    document.getElementById('printDate').textContent = new Date().toLocaleDateString();
    
    // Contact
    document.getElementById('printName').textContent = calculatorData.contact.name;
    document.getElementById('printPhone').textContent = calculatorData.contact.phone;
    document.getElementById('printAddress').textContent = calculatorData.contact.address;
    document.getElementById('printCompany').textContent = calculatorData.contact.company;
    
    // Consumption
    document.getElementById('printMonthlyBill').textContent = '₹' + calculatorData.consumption.monthlyBill.toLocaleString();
    document.getElementById('printCurrentTariff').textContent = '₹' + calculatorData.consumption.currentTariff + '/unit';
    document.getElementById('printSolarAtlas').textContent = calculatorData.consumption.solarAtlas + ' kWh/sq.m/day';
    document.getElementById('printUnitsPerMonth').textContent = calculatorData.calculated.unitsPerMonth + ' units';
    document.getElementById('printUnitsPerDay').textContent = calculatorData.calculated.unitsPerDay + ' units';
    document.getElementById('printGenerationsPerDay').textContent = calculatorData.calculated.generationsPerDay;
    document.getElementById('printPlantCapacity').textContent = calculatorData.calculated.plantCapacity + ' W';
    document.getElementById('printSanctionedLoad').textContent = calculatorData.calculated.sanctionedLoad + ' W';
    
    // Cost
    document.getElementById('printProposalPrice').textContent = '₹' + calculatorData.cost.proposalPrice.toLocaleString() + '/W';
    document.getElementById('printPlantCostWOGST').textContent = '₹' + parseFloat(calculatorData.cost.plantCostWOGST).toLocaleString();
    
    // CM1
    document.getElementById('printPurchaseCostPerKW').textContent = '₹' + calculatorData.cm1.purchaseCostPerKW.toLocaleString() + '/W';
    document.getElementById('printCM1').textContent = (calculatorData.cm1.cm1 * 100).toFixed(2) + '%';
    
    // Environmental
    document.getElementById('printCO2Year').textContent = parseFloat(calculatorData.environmental.co2SavingsYear).toLocaleString() + ' Kg';
    document.getElementById('printCO2Lifetime').textContent = calculatorData.environmental.co2SavingsLifetime + ' Million Kg';
    
    // Financial
    document.getElementById('printCurrentBillYear').textContent = '₹' + calculatorData.financial.currentBillPaymentPerYear.toLocaleString();
    document.getElementById('printBill25Years').textContent = '₹' + parseFloat(calculatorData.financial.billPayment25Years).toLocaleString();
    document.getElementById('printPayback').textContent = calculatorData.financial.paybackYears + ' years';
    document.getElementById('printLifetimeSavings').textContent = '₹' + parseFloat(calculatorData.financial.lifetimeSavings).toLocaleString();
    
    // Trigger print
    window.print();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    showStep(1);
    
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
});

