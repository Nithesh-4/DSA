/**
 * Bank Account Management System using Singly Linked List
 * Pure JavaScript matching the C++ class and pointer implementation.
 */

// Node structure
class Node {
  constructor(accNo, customerName, amount) {
    this.accountNumber = accNo;
    this.name = customerName;
    this.balance = parseFloat(amount);
    this.next = null;
  }
}

// Bank Management Class
class BankManagement {
  constructor() {
    this.head = null;
    this.nextAccountNumber = 1001;
  }

  searchNode(accountNumber) {
    let current = this.head;
    while (current !== null) {
      if (current.accountNumber === accountNumber) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  createAccount(name, balance) {
    const trimmed = name.trim();
    if (!trimmed) {
      return { success: false, message: 'Name cannot be empty.' };
    }

    const amount = parseFloat(balance);
    if (isNaN(amount) || amount < 0) {
      return { success: false, message: 'Invalid deposit amount.' };
    }

    const newNode = new Node(this.nextAccountNumber++, trimmed, amount);

    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }

    return { success: true, node: newNode };
  }

  depositMoney(accountNumber, amount) {
    const acc = this.searchNode(accountNumber);
    if (!acc) return { success: false, message: 'Account not found.' };

    const dep = parseFloat(amount);
    if (isNaN(dep) || dep <= 0) {
      return { success: false, message: 'Enter a valid positive amount.' };
    }

    acc.balance += dep;
    return { success: true, node: acc, amount: dep };
  }

  withdrawMoney(accountNumber, amount) {
    const acc = this.searchNode(accountNumber);
    if (!acc) return { success: false, message: 'Account not found.' };

    const withAmount = parseFloat(amount);
    if (isNaN(withAmount) || withAmount <= 0) {
      return { success: false, message: 'Enter a valid positive amount.' };
    }

    if (withAmount > acc.balance) {
      return { success: false, message: 'Insufficient balance!' };
    }

    acc.balance -= withAmount;
    return { success: true, node: acc, amount: withAmount };
  }

  updateAccount(accountNumber, newName) {
    const acc = this.searchNode(accountNumber);
    if (!acc) return { success: false, message: 'Account not found.' };

    const trimmed = newName.trim();
    if (!trimmed) return { success: false, message: 'Name cannot be empty.' };

    const oldName = acc.name;
    acc.name = trimmed;
    return { success: true, node: acc, oldName: oldName };
  }

  deleteAccount(accountNumber) {
    let current = this.head;
    let previous = null;

    while (current !== null && current.accountNumber !== accountNumber) {
      previous = current;
      current = current.next;
    }

    if (current === null) {
      return { success: false, message: 'Account not found.' };
    }

    if (current.balance !== 0) {
      return {
        success: false,
        message: 'Cannot delete an account with a non-zero balance. Withdraw or transfer the remaining balance first.'
      };
    }

    if (previous === null) {
      this.head = current.next;
    } else {
      previous.next = current.next;
    }

    return { success: true, node: current };
  }

  toArray() {
    const list = [];
    let current = this.head;
    while (current !== null) {
      list.push(current);
    }
    return list;
  }

  getTotalBalance() {
    let total = 0;
    let current = this.head;
    while (current !== null) {
      total += current.balance;
      current = current.next;
    }
    return total;
  }

  getCount() {
    let count = 0;
    let current = this.head;
    while (current !== null) {
      count++;
      current = current.next;
    }
    return count;
  }
}

// Instance
const bank = new BankManagement();

// DOM Elements
let statCount, statVault, statNext;
let llChain, traversalHint, traversalMsg;
let accountRows, emptyState, filterInput;
let cppConsoleOutput, toggleConsole, consoleContent, consoleArrow;
let toast;

// Modals
let modalCreate, formCreate, createName, createDeposit;
let modalTx, formTx, txTitle, txPill, txLabel, txAmount, txAccNo, txType, txBtn;
let modalEdit, formEdit, editName, editAccNo;

function initDOMElements() {
  statCount = document.getElementById('stat-count');
  statVault = document.getElementById('stat-vault');
  statNext = document.getElementById('stat-next');

  llChain = document.getElementById('ll-chain');
  traversalHint = document.getElementById('traversal-hint');
  traversalMsg = document.getElementById('traversal-msg');

  accountRows = document.getElementById('account-rows');
  emptyState = document.getElementById('empty-state');
  filterInput = document.getElementById('filter-input');

  cppConsoleOutput = document.getElementById('cpp-console-output');
  toggleConsole = document.getElementById('toggle-console');
  consoleContent = document.getElementById('console-content');
  consoleArrow = document.getElementById('console-arrow');

  toast = document.getElementById('toast');

  modalCreate = document.getElementById('modal-create');
  formCreate = document.getElementById('form-create');
  createName = document.getElementById('create-name');
  createDeposit = document.getElementById('create-deposit');

  modalTx = document.getElementById('modal-transaction');
  formTx = document.getElementById('form-transaction');
  txTitle = document.getElementById('tx-title');
  txPill = document.getElementById('tx-pill');
  txLabel = document.getElementById('tx-label');
  txAmount = document.getElementById('tx-amount');
  txAccNo = document.getElementById('tx-acc-no');
  txType = document.getElementById('tx-type');
  txBtn = document.getElementById('tx-btn');

  modalEdit = document.getElementById('modal-edit');
  formEdit = document.getElementById('form-edit');
  editName = document.getElementById('edit-name');
  editAccNo = document.getElementById('edit-acc-no');
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  initDOMElements();
  seedDemoAccounts();
  renderAll();
  setupEvents();
  logConsole(`========================================
     BANK ACCOUNT MANAGEMENT SYSTEM
       USING LINKED LISTS
========================================
Ready. Demo accounts loaded into memory.
HEAD -> [Account 1001] -> [Account 1002] -> [Account 1003] -> [Account 1004] -> NULL\n`);
});

function seedDemoAccounts() {
  bank.head = null;
  bank.nextAccountNumber = 1001;

  bank.createAccount('Rajesh Sharma', 25000);
  bank.createAccount('Priya Patel', 42500);
  bank.createAccount('Amit Verma', 15200);
  bank.createAccount('Sunita Rao', 0); // 0 balance so you can test deleting immediately
}

function renderAll() {
  renderStats();
  renderLinkedList();
  renderTable();
}

function renderStats() {
  if (!statCount) return;
  statCount.textContent = bank.getCount();
  statVault.textContent = `Rs. ${bank.getTotalBalance().toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  statNext.textContent = bank.nextAccountNumber;
}

// Render Linked List Visualizer
function renderLinkedList() {
  if (!llChain) return;
  llChain.innerHTML = '';

  // HEAD marker
  const headBox = document.createElement('div');
  headBox.className = 'll-head-box';
  headBox.textContent = `HEAD → ${bank.head ? '#' + bank.head.accountNumber : 'NULL'}`;
  llChain.appendChild(headBox);

  if (bank.head === null) {
    llChain.appendChild(createArrow());
    const nullBox = document.createElement('div');
    nullBox.className = 'll-null-box';
    nullBox.textContent = 'NULL';
    llChain.appendChild(nullBox);
    return;
  }

  let current = bank.head;
  while (current !== null) {
    llChain.appendChild(createArrow());

    const nodeEl = document.createElement('div');
    nodeEl.className = 'll-node';
    nodeEl.id = `ll-node-${current.accountNumber}`;

    const nextLabel = current.next ? `#${current.next.accountNumber}` : 'NULL';

    nodeEl.innerHTML = `
      <div class="ll-node-header">
        <span class="ll-node-num">#${current.accountNumber}</span>
        <span class="ll-node-badge">Node</span>
      </div>
      <div class="ll-node-name">${escapeHtml(current.name)}</div>
      <div class="ll-node-balance">Rs. ${current.balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      <div class="ll-node-footer">
        <span>next &rarr;</span>
        <span style="font-weight: 600; color: ${nextLabel === 'NULL' ? '#dc2626' : '#2563eb'};">${nextLabel}</span>
      </div>
    `;

    llChain.appendChild(nodeEl);
    current = current.next;
  }

  llChain.appendChild(createArrow());
  const nullBox = document.createElement('div');
  nullBox.className = 'll-null-box';
  nullBox.textContent = 'NULL';
  llChain.appendChild(nullBox);
}

function createArrow() {
  const el = document.createElement('div');
  el.className = 'll-arrow';
  el.innerHTML = '<div class="ll-arrow-line"></div>';
  return el;
}

// Render Accounts Table
function renderTable() {
  if (!accountRows) return;
  const query = filterInput ? filterInput.value.toLowerCase().trim() : '';
  const accounts = bank.toArray().filter(acc => 
    acc.name.toLowerCase().includes(query) || acc.accountNumber.toString().includes(query)
  );

  if (accounts.length === 0) {
    accountRows.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');
  accountRows.innerHTML = accounts.map(acc => {
    const nextText = acc.next ? `#${acc.next.accountNumber}` : '<span style="color: #dc2626;">NULL</span>';
    return `
      <tr id="row-${acc.accountNumber}">
        <td><span class="acc-num">#${acc.accountNumber}</span></td>
        <td><strong>${escapeHtml(acc.name)}</strong></td>
        <td><span class="acc-balance">Rs. ${acc.balance.toFixed(2)}</span></td>
        <td><span class="acc-ptr">${nextText}</span></td>
        <td class="text-right">
          <div class="table-btns">
            <button class="action-btn action-btn-deposit" onclick="openDepositModal(${acc.accountNumber})">+ Deposit</button>
            <button class="action-btn action-btn-withdraw" onclick="openWithdrawModal(${acc.accountNumber})">- Withdraw</button>
            <button class="action-btn" onclick="openEditModal(${acc.accountNumber})">Edit</button>
            <button class="action-btn action-btn-delete" onclick="handleDelete(${acc.accountNumber})">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Traversal Animation (simulates C++ pointer iteration)
function animateTraversal(targetAccNo, callback) {
  const accounts = bank.toArray();
  if (accounts.length === 0) {
    callback(null);
    return;
  }

  if (traversalHint) traversalHint.classList.remove('hidden');
  let i = 0;

  function step() {
    if (i < accounts.length) {
      const current = accounts[i];
      document.querySelectorAll('.ll-node').forEach(el => el.classList.remove('active-highlight'));

      const nodeEl = document.getElementById(`ll-node-${current.accountNumber}`);
      if (nodeEl) {
        nodeEl.classList.add('active-highlight');
        nodeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }

      if (traversalMsg) traversalMsg.textContent = `Visiting Node #${current.accountNumber}...`;

      if (current.accountNumber === targetAccNo) {
        setTimeout(() => {
          if (nodeEl) {
            nodeEl.classList.remove('active-highlight');
            nodeEl.classList.add('match-highlight');
          }
          if (traversalMsg) traversalMsg.textContent = `Found Account #${targetAccNo}!`;
          setTimeout(() => {
            if (traversalHint) traversalHint.classList.add('hidden');
            if (nodeEl) nodeEl.classList.remove('match-highlight');
            callback(current);
          }, 450);
        }, 200);
        return;
      }

      i++;
      setTimeout(step, 280);
    } else {
      if (traversalMsg) traversalMsg.textContent = `Reached NULL. Account #${targetAccNo} not found.`;
      document.querySelectorAll('.ll-node').forEach(el => el.classList.remove('active-highlight'));
      setTimeout(() => {
        if (traversalHint) traversalHint.classList.add('hidden');
        callback(null);
      }, 500);
    }
  }

  step();
}

// Event Listeners
function setupEvents() {
  // New Account Modal
  const btnCreateOpen = document.getElementById('btn-create-open');
  if (btnCreateOpen) {
    btnCreateOpen.addEventListener('click', () => {
      formCreate.reset();
      openModal(modalCreate);
      createName.focus();
    });
  }

  if (formCreate) {
    formCreate.addEventListener('submit', (e) => {
      e.preventDefault();
      const res = bank.createAccount(createName.value, createDeposit.value);
      if (res.success) {
        closeModal(modalCreate);
        showToast(`Account #${res.node.accountNumber} created successfully!`, 'success');
        logConsole(`Account created successfully!\nAccount Number: ${res.node.accountNumber}\nCustomer Name: ${res.node.name}\nBalance: Rs. ${res.node.balance.toFixed(2)}\n`);
        renderAll();
        scrollToNode(res.node.accountNumber);
      } else {
        showToast(res.message, 'error');
      }
    });
  }

  // Reset Demo Accounts
  const btnResetDemo = document.getElementById('btn-reset-demo');
  if (btnResetDemo) {
    btnResetDemo.addEventListener('click', () => {
      seedDemoAccounts();
      renderAll();
      showToast('Demo accounts reset.', 'success');
      logConsole('\nReset demo accounts in linked list.\n');
    });
  }

  // Search Filter
  if (filterInput) {
    filterInput.addEventListener('input', () => {
      renderTable();
    });
  }

  // Transaction Modal Submit
  if (formTx) {
    formTx.addEventListener('submit', (e) => {
      e.preventDefault();
      const accNo = parseInt(txAccNo.value);
      const type = txType.value;
      const amount = parseFloat(txAmount.value);

      closeModal(modalTx);

      animateTraversal(accNo, (found) => {
        if (!found) {
          showToast('Account not found.', 'error');
          return;
        }

        if (type === 'deposit') {
          const res = bank.depositMoney(accNo, amount);
          if (res.success) {
            showToast(`Deposited Rs. ${res.amount.toFixed(2)} to #${accNo}`, 'success');
            logConsole(`Deposit successful!\nAccount: ${accNo}\nUpdated Balance: Rs. ${res.node.balance.toFixed(2)}\n`);
            renderAll();
          } else {
            showToast(res.message, 'error');
          }
        } else {
          const res = bank.withdrawMoney(accNo, amount);
          if (res.success) {
            showToast(`Withdrew Rs. ${res.amount.toFixed(2)} from #${accNo}`, 'success');
            logConsole(`Withdrawal successful!\nAccount: ${accNo}\nRemaining Balance: Rs. ${res.node.balance.toFixed(2)}\n`);
            renderAll();
          } else {
            showToast(res.message, 'error');
          }
        }
      });
    });
  }

  // Edit Modal Submit
  if (formEdit) {
    formEdit.addEventListener('submit', (e) => {
      e.preventDefault();
      const accNo = parseInt(editAccNo.value);
      const newName = editName.value.trim();

      closeModal(modalEdit);

      const res = bank.updateAccount(accNo, newName);
      if (res.success) {
        showToast(`Updated Account #${accNo} name to ${newName}`, 'success');
        logConsole(`Account details updated successfully!\nAccount: ${accNo}\nNew Name: ${res.node.name}\n`);
        renderAll();
      } else {
        showToast(res.message, 'error');
      }
    });
  }

  // Close modals on backdrop click or close button
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close');
      closeModal(document.getElementById(modalId));
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(bd => {
    bd.addEventListener('click', (e) => {
      if (e.target === bd) closeModal(bd);
    });
  });

  // Toggle C++ console
  if (toggleConsole) {
    toggleConsole.addEventListener('click', () => {
      consoleContent.classList.toggle('hidden');
      consoleArrow.textContent = consoleContent.classList.contains('hidden') ? '+' : '−';
    });
  }
}

// Global actions for table buttons
window.openDepositModal = function(accNo) {
  const acc = bank.searchNode(accNo);
  if (!acc) return;

  txAccNo.value = accNo;
  txType.value = 'deposit';
  txAmount.value = '';
  txTitle.textContent = 'Deposit Money';
  txLabel.textContent = 'Deposit Amount (Rs.)';
  txBtn.textContent = 'Deposit Funds';
  txPill.innerHTML = `<strong>#${acc.accountNumber} &bull; ${escapeHtml(acc.name)}</strong><br><span style="color: #059669; font-weight: 600;">Current Balance: Rs. ${acc.balance.toFixed(2)}</span>`;
  
  openModal(modalTx);
  txAmount.focus();
};

window.openWithdrawModal = function(accNo) {
  const acc = bank.searchNode(accNo);
  if (!acc) return;

  txAccNo.value = accNo;
  txType.value = 'withdraw';
  txAmount.value = '';
  txTitle.textContent = 'Withdraw Money';
  txLabel.textContent = 'Withdrawal Amount (Rs.)';
  txBtn.textContent = 'Withdraw Funds';
  txPill.innerHTML = `<strong>#${acc.accountNumber} &bull; ${escapeHtml(acc.name)}</strong><br><span style="color: #059669; font-weight: 600;">Current Balance: Rs. ${acc.balance.toFixed(2)}</span>`;
  
  openModal(modalTx);
  txAmount.focus();
};

window.openEditModal = function(accNo) {
  const acc = bank.searchNode(accNo);
  if (!acc) return;

  editAccNo.value = accNo;
  editName.value = acc.name;
  openModal(modalEdit);
  editName.focus();
};

window.handleDelete = function(accNo) {
  const acc = bank.searchNode(accNo);
  if (!acc) return;

  if (acc.balance !== 0) {
    showToast(`Cannot delete #${accNo}: non-zero balance (Rs. ${acc.balance.toFixed(2)}). Withdraw all funds first.`, 'error');
    logConsole(`Cannot delete an account with a non-zero balance.\nWithdraw or transfer the remaining balance first.\nAccount #${accNo} has balance Rs. ${acc.balance.toFixed(2)}\n`);
    return;
  }

  if (confirm(`Are you sure you want to delete and free Node #${accNo} (${acc.name})?`)) {
    const res = bank.deleteAccount(accNo);
    if (res.success) {
      showToast(`Account #${accNo} deleted. Node unlinked and memory freed.`, 'success');
      logConsole(`Account deleted successfully!\nAccount Number: ${accNo}\n`);
      renderAll();
    } else {
      showToast(res.message, 'error');
    }
  }
};

// Utilities
function openModal(el) {
  if (el) el.classList.remove('hidden');
}

function closeModal(el) {
  if (el) el.classList.add('hidden');
}

function showToast(message, type = 'normal') {
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'success' ? 'toast-success' : ''}`;
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3200);
}

function logConsole(str) {
  if (!cppConsoleOutput) return;
  cppConsoleOutput.textContent += str;
  if (consoleContent) consoleContent.scrollTop = consoleContent.scrollHeight;
}

function scrollToNode(accNo) {
  setTimeout(() => {
    const el = document.getElementById(`ll-node-${accNo}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      el.classList.add('match-highlight');
      setTimeout(() => el.classList.remove('match-highlight'), 1500);
    }
  }, 100);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
