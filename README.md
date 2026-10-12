# Bank Account Management System (Singly Linked List)

An interactive Bank Account Management System built using a **Singly Linked List** Data Structure with a clean web frontend and live pointer visualizer.

![DSA](https://img.shields.io/badge/DSA-Singly%20Linked%20List-blue)
![C++](https://img.shields.io/badge/C++-Standard%20Template-green)
![Frontend](https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JS-orange)

---

## 📌 Project Overview

This project implements a Bank Account Management System where each account is represented as a dynamic **Node** in a **Singly Linked List**.

### Node Structure (C++)
```cpp
struct Node {
    int accountNumber;
    string name;
    double balance;
    Node* next;

    Node(int accNo, string customerName, double amount) {
        accountNumber = accNo;
        name = customerName;
        balance = amount;
        next = nullptr;
    }
};
```

---

## ✨ Features

- **Create Account**: Dynamically allocates a new `Node` and appends it to the tail of the list ($O(n)$ or $O(1)$ with tail pointer). Auto-generates account numbers starting at `1001`.
- **Live Linked List Visualizer**: Graphically displays `HEAD` pointer, nodes, and `NULL` with real-time pointer traversal animation.
- **Deposit Money**: Traverses to the account node and increments balance.
- **Withdraw Money**: Validates positive amounts and checks against insufficient balance.
- **Update Details**: In-place modification of customer details.
- **Delete Account**: Unlinks node from the list and frees memory. Enforces rule: *Cannot delete an account with a non-zero balance*.
- **Search & Filter**: Real-time searching by account number or customer name.
- **C++ CLI Terminal Simulator**: Displays simulated `cout` output matching console execution.

---

## 📁 Repository Structure

```text
├── main.cpp       # Original C++ console program
├── index.html     # Modern web dashboard & visualizer
├── style.css      # Clean minimalist design system
├── app.js         # JavaScript mirroring C++ class & pointer logic
└── README.md      # Project documentation
```

---

## 🚀 How to Run

### 1. Web Frontend
- Double-click `index.html` to open in any web browser, or
- Right-click `index.html` in VS Code / IDE and select **"Open with Live Server"**.

### 2. C++ Console Program
Compile and execute using any standard C++ compiler:
```bash
g++ main.cpp -o bank_management
./bank_management
```
