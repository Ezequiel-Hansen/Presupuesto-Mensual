import { getAll, mount} from '../js/api.js'

// Inicializar la fecha actual
let currentDate = new Date();

// Formatear mes y año
function formatMonth(date) {
  return date.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
}

function capitalize(str) {
  if (!str) {
    str = ""
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Obtener key para localStorage según la fecha
function getStorageKey(date) {
  return `budget-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}


// Cargar resumen de gastos por mes
async function loadMonthlySummaries() {
  const monthlySummaries = await mount()
  const monthlySummaryList = document.getElementById('monthlySummaryList');
  const noMonthlySummaryRow = document.getElementById('noMonthlySummaryRow');

  // Limpiar lista actual
  while (monthlySummaryList.firstChild) {
    monthlySummaryList.removeChild(monthlySummaryList.firstChild);
  }

  if (monthlySummaries.length === 0) {
    monthlySummaryList.appendChild(noMonthlySummaryRow);
  } else {
    monthlySummaries.forEach(summary => {
      const row = document.createElement('tr');

      const monthCell = document.createElement('td');
      monthCell.className = 'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900';
      monthCell.textContent = summary.mes_anio;

      const totalCell = document.createElement('td');
      totalCell.className = 'px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right';
      totalCell.textContent = `$${summary.monto_total.toLocaleString('es-AR')}`;

      row.appendChild(monthCell);
      row.appendChild(totalCell);
      monthlySummaryList.appendChild(row);
    });
  }
}

// Renderizar la lista de gastos
async function renderExpenseList() {
  const expenses = await getAll()
  const expensesList = document.getElementById('expensesList');
  const noExpensesRow = document.getElementById('noExpensesRow');

  // Limpiar lista actual
  while (expensesList.firstChild) {
    expensesList.removeChild(expensesList.firstChild);
  }

  if (expenses.length === 0) {
    expensesList.appendChild(noExpensesRow);
  } else {
    expenses.forEach((expense, index) => {
      const row = document.createElement('tr');

      // --- Celda de Nombre ---
      const nameCell = document.createElement('td');
      nameCell.className = 'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900';
      nameCell.textContent = expense.descripcion;

      // --- Celda de Precio ---
      const priceCell = document.createElement('td');
      priceCell.className = 'px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right';
      priceCell.textContent = `$${parseFloat(expense.monto).toFixed(2)}`;

      row.appendChild(nameCell);
      row.appendChild(priceCell);
      expensesList.appendChild(row);
    });
  }

  updateTotalExpenses(expenses);
  loadMonthlySummaries();
}



// Actualizar el total de gastos
function updateTotalExpenses(expenses) {
  const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.monto), 0);
  document.getElementById('totalExpenses').textContent = `$${total.toLocaleString('es-AR')}`;
}


// Inicializar la aplicación
function initApp() {
  renderExpenseList();
}

// Iniciar la aplicación cuando se cargue el DOM
document.addEventListener('DOMContentLoaded', initApp);
