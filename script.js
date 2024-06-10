// JavaScript for App Logic
document.addEventListener('DOMContentLoaded', () => {
    const transactionForm = document.getElementById('transaction-form');
    const transactionList = document.getElementById('transaction-list');
    const totalIncomeEl = document.getElementById('total-income');
    const totalExpensesEl = document.getElementById('total-expenses');
    const balanceEl = document.getElementById('balance');

    let transactions = [];

    transactionForm.addEventListener('submit', addTransaction);
    transactionList.addEventListener('click', handleTransactionClick);

    function addTransaction(event) {
        event.preventDefault();

        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const type = document.getElementById('type').value;

        const transaction = {
            id: generateID(),
            description,
            amount,
            type
        };

        transactions.push(transaction);
        updateTransactions();
        transactionForm.reset();
    }

    function handleTransactionClick(event) {
        if (event.target.classList.contains('delete-button')) {
            const id = event.target.dataset.id;
            deleteTransaction(id);
        }
    }

    function deleteTransaction(id) {
        transactions = transactions.filter(transaction => transaction.id !== id);
        updateTransactions();
    }

    function generateID() {
        return Math.floor(Math.random() * 1000000);
    }

    function updateTransactions() {
        transactionList.innerHTML = '';

        let totalIncome = 0;
        let totalExpenses = 0;

        transactions.forEach(transaction => {
            const transactionItem = document.createElement('li');
            transactionItem.classList.add('transaction-item');

            transactionItem.innerHTML = `
                ${transaction.description} <span>${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}</span>
                <button class="delete-button" data-id="${transaction.id}">x</button>
            `;

            transactionList.appendChild(transactionItem);

            if (transaction.type === 'income') {
                totalIncome += transaction.amount;
            } else {
                totalExpenses += transaction.amount;
            }
        });

        totalIncomeEl.textContent = `$${totalIncome.toFixed(2)}`;
        totalExpensesEl.textContent = `$${totalExpenses.toFixed(2)}`;
        balanceEl.textContent = `$${(totalIncome - totalExpenses).toFixed(2)}`;
    }
});
