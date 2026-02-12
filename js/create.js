import { create, getAll, deleted, update, setdate } from "../js/api.js";
let presupuestoActualId=null
const formularioGastos= document.getElementById('expenseForm');
const formularioMes= document.getElementById('expenseDates');
const expensesList = document.getElementById('expensesList');
const limpiarTotal=document.getElementById('totalExpenses');

formularioMes.addEventListener('submit', async (e) => {
  e.preventDefault();
  const dateInput = document.getElementById('expenseDate');
  const result = await setdate({ mes_anio: dateInput.value });
  presupuestoActualId = result.id_presupuesto; 
  console.log("ID guardado:", presupuestoActualId);
  while (expensesList.firstChild) {
    expensesList.removeChild(expensesList.firstChild);
  }
  limpiarTotal.textContent=0;
});
// Evento para agregar un gasto

formularioGastos.addEventListener('submit', async (e) => {
  e.preventDefault()
  if (!presupuestoActualId || presupuestoActualId.length === 0) {
        alert("No se encontró un presupuesto activo. Por favor, intenta recargar la página.");
        return;
    }
  const nameInput = document.getElementById('expenseName');
  const priceInput = document.getElementById('expensePrice');
  const name = nameInput.value;
  const price = priceInput.value;
  const fix=presupuestoActualId[0].id_presupuesto
  validateForm(name, price)
  await create({ descripcion: name, monto: parseInt(price), id_presupuesto:fix})
  nameInput.value=''
  priceInput.value=''
  await renderExpenseList();

});

// Renderizar la lista de gastos
async function renderExpenseList() {
  const expenses = await getAll()
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
      row.dataset.id = expense.id_item

      // --- Celda de Nombre ---
      const nameCell = document.createElement('td');
      nameCell.className = 'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900';
      nameCell.textContent = expense.descripcion;


      // --- Celda de Precio ---
      const priceCell = document.createElement('td');
      priceCell.className = 'px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right';
      priceCell.textContent = `$${parseFloat(expense.monto).toFixed(2)}`;

      // --- Celda de Acciones (Botones) ---
      const cells = document.createElement('td');
      // 'flex' para alinear, 'justify-end' para enviarlos al final, 'gap-2' para separarlos
      cells.className = 'px-6 py-4 whitespace-nowrap text-right flex justify-end gap-3';

      const editCell = document.createElement('button');
      editCell.className = 'px-4 py-2 text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 rounded-sm transition-colors';
      editCell.textContent = "Editar";

      editCell.addEventListener("click", async (e) => {
        e.preventDefault();

        // Si ya estamos editando, guardamos los cambios
        if (editCell.textContent === "Guardar") {
          const newDesc = row.querySelector('.edit-desc').value;
          const newMonto = row.querySelector('.edit-monto').value;

          // Llamamos a tu función de actualización (ajusta según tu backend)
          await update({
            id_item: row.dataset.id,
            descripcion: newDesc,
            monto: parseFloat(newMonto),
          });

          await renderExpenseList(); // Refrescamos la tabla
          return;
        }

        // --- MODO EDICIÓN ---
        // Cambiamos el texto del botón
        editCell.textContent = "Guardar";
        editCell.classList.replace('bg-yellow-400', 'bg-green-500');
        editCell.classList.replace('hover:bg-yellow-500', 'hover:bg-green-600');

        // Convertimos la celda de nombre en un input
        const currentDesc = nameCell.textContent;
        nameCell.innerHTML = `<input type="text" class="edit-desc w-full border border-gray-300 rounded px-2 py-1" value="${currentDesc}">`;

        // Convertimos la celda de precio en un input
        const currentMonto = priceCell.textContent.replace('$', '');
        priceCell.innerHTML = `<input type="number" class="edit-monto w-1/2 border border-gray-300 rounded px-2 py-1 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value="${currentMonto}">`;
      });

      const deleteCell = document.createElement('button');
      deleteCell.className = 'px-4 py-2 text-sm font-medium text-white bg-red-400 hover:bg-red-500 rounded-sm transition-colors';
      deleteCell.textContent = "X";
      deleteCell.addEventListener("click", async () => {
        await deleted(row.dataset.id)
        await renderExpenseList();
      })

      // Ensamblaje
      cells.appendChild(editCell);
      cells.appendChild(deleteCell);

      row.appendChild(nameCell);
      row.appendChild(priceCell);
      row.appendChild(cells);
      expensesList.appendChild(row);
    });
  }

  updateTotalExpenses(expenses);
}



// Actualizar el total de gastos
function updateTotalExpenses(expenses) {
  const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.monto), 0);
  document.getElementById('totalExpenses').textContent = `$${total.toLocaleString('es-AR')}`;
}

// Validar formulario
function validateForm(name, price) {
  let valid = true;

  const nameError = document.getElementById('nameError');
  const priceError = document.getElementById('priceError');

  // Reset errors
  nameError.classList.add('hidden');
  priceError.classList.add('hidden');

  // Validate name
  if (!name.trim()) {
    nameError.classList.remove('hidden');
    valid = false;
  }

  // Validate price
  if (!price || isNaN(price) || parseFloat(price) <= 0) {
    priceError.classList.remove('hidden');
    valid = false;
  }

  return valid;
}

document.addEventListener('DOMContentLoaded', () => renderExpenseList());
