#include <iostream>
#include <string>
#include <iomanip>
#include <limits>
using namespace std;

// Node structure for each bank account
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

// Bank Account Management using Singly Linked List
class BankManagement {
private:
    Node* head;
    int nextAccountNumber;

    Node* searchNode(int accountNumber) {
        Node* current = head;

        while (current != nullptr) {
            if (current->accountNumber == accountNumber) {
                return current;
            }
            current = current->next;
        }

        return nullptr;
    }

public:
    BankManagement() {
        head = nullptr;
        nextAccountNumber = 1001;
    }

    // Create a new account
    void createAccount() {
        string name;
        double balance;

        cin.ignore(numeric_limits<streamsize>::max(), '\n');

        cout << "Enter customer name: ";
        getline(cin, name);

        if (name.empty()) {
            cout << "Name cannot be empty.\n";
            return;
        }

        cout << "Enter initial deposit: Rs. ";
        if (!(cin >> balance) || balance < 0) {
            cout << "Invalid deposit amount.\n";
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            return;
        }

        Node* newNode = new Node(
            nextAccountNumber++, name, balance
        );

        if (head == nullptr) {
            head = newNode;
        } else {
            Node* current = head;

            while (current->next != nullptr) {
                current = current->next;
            }

            current->next = newNode;
        }

        cout << "\nAccount created successfully!\n";
        cout << "Account Number: "
             << newNode->accountNumber << '\n';
        cout << "Customer Name: " << newNode->name << '\n';
        cout << "Balance: Rs. "
             << fixed << setprecision(2)
             << newNode->balance << '\n';
    }

    // Display all accounts
    void displayAccounts() {
        if (head == nullptr) {
            cout << "No bank accounts found.\n";
            return;
        }

        Node* current = head;

        cout << "\n========== ALL BANK ACCOUNTS ==========\n";
        cout << left << setw(18) << "Account Number"
             << setw(25) << "Customer Name"
             << "Balance (Rs.)\n";

        cout << string(60, '-') << '\n';

        while (current != nullptr) {
            cout << left << setw(18)
                 << current->accountNumber
                 << setw(25) << current->name
                 << fixed << setprecision(2)
                 << current->balance << '\n';

            current = current->next;
        }
    }

    // Search for an account
    void searchAccount() {
        int accountNumber;

        cout << "Enter account number: ";
        if (!(cin >> accountNumber)) {
            cout << "Invalid account number.\n";
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            return;
        }

        Node* account = searchNode(accountNumber);

        if (account == nullptr) {
            cout << "Account not found.\n";
            return;
        }

        cout << "\nAccount Found!\n";
        cout << "Account Number: "
             << account->accountNumber << '\n';
        cout << "Customer Name: " << account->name << '\n';
        cout << "Balance: Rs. "
             << fixed << setprecision(2)
             << account->balance << '\n';
    }

    // Deposit money
    void depositMoney() {
        int accountNumber;
        double amount;

        cout << "Enter account number: ";
        if (!(cin >> accountNumber)) {
            cout << "Invalid account number.\n";
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            return;
        }

        Node* account = searchNode(accountNumber);

        if (account == nullptr) {
            cout << "Account not found.\n";
            return;
        }

        cout << "Enter deposit amount: Rs. ";
        if (!(cin >> amount) || amount <= 0) {
            cout << "Enter a valid positive amount.\n";
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            return;
        }

        account->balance += amount;

        cout << "Deposit successful!\n";
        cout << "Updated Balance: Rs. "
             << fixed << setprecision(2)
             << account->balance << '\n';
    }

    // Withdraw money
    void withdrawMoney() {
        int accountNumber;
        double amount;

        cout << "Enter account number: ";
        if (!(cin >> accountNumber)) {
            cout << "Invalid account number.\n";
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            return;
        }

        Node* account = searchNode(accountNumber);

        if (account == nullptr) {
            cout << "Account not found.\n";
            return;
        }

        cout << "Enter withdrawal amount: Rs. ";
        if (!(cin >> amount) || amount <= 0) {
            cout << "Enter a valid positive amount.\n";
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            return;
        }

        if (amount > account->balance) {
            cout << "Insufficient balance!\n";
            return;
        }

        account->balance -= amount;

        cout << "Withdrawal successful!\n";
        cout << "Remaining Balance: Rs. "
             << fixed << setprecision(2)
             << account->balance << '\n';
    }

    // Update customer name
    void updateAccount() {
        int accountNumber;

        cout << "Enter account number: ";
        if (!(cin >> accountNumber)) {
            cout << "Invalid account number.\n";
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            return;
        }

        Node* account = searchNode(accountNumber);

        if (account == nullptr) {
            cout << "Account not found.\n";
            return;
        }

        cin.ignore(numeric_limits<streamsize>::max(), '\n');

        string newName;
        cout << "Enter new customer name: ";
        getline(cin, newName);

        if (newName.empty()) {
            cout << "Name cannot be empty.\n";
            return;
        }

        account->name = newName;

        cout << "Account details updated successfully!\n";
    }

    // Delete an account
    void deleteAccount() {
        int accountNumber;

        cout << "Enter account number to delete: ";
        if (!(cin >> accountNumber)) {
            cout << "Invalid account number.\n";
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            return;
        }

        Node* current = head;
        Node* previous = nullptr;

        while (current != nullptr &&
               current->accountNumber != accountNumber) {
            previous = current;
            current = current->next;
        }

        if (current == nullptr) {
            cout << "Account not found.\n";
            return;
        }

        if (current->balance != 0) {
            cout << "Cannot delete an account with a non-zero balance.\n";
            cout << "Withdraw or transfer the remaining balance first.\n";
            return;
        }

        if (previous == nullptr) {
            head = current->next;
        } else {
            previous->next = current->next;
        }

        delete current;

        cout << "Account deleted successfully!\n";
    }

    // Display linked list structure
    void displayLinkedList() {
        Node* current = head;

        cout << "\nLinked List Structure:\n";
        cout << "HEAD -> ";

        while (current != nullptr) {
            cout << "[Account "
                 << current->accountNumber << "] -> ";
            current = current->next;
        }

        cout << "NULL\n";
    }

    // Release dynamically allocated memory
    ~BankManagement() {
        Node* current = head;

        while (current != nullptr) {
            Node* temp = current;
            current = current->next;
            delete temp;
        }
    }
};

// Main function
int main() {
    BankManagement bank;
    int choice;

    do {
        cout << "\n========================================\n";
        cout << "     BANK ACCOUNT MANAGEMENT SYSTEM\n";
        cout << "       USING LINKED LISTS\n";
        cout << "========================================\n";
        cout << "1. Create Account\n";
        cout << "2. Display All Accounts\n";
        cout << "3. Search Account\n";
        cout << "4. Deposit Money\n";
        cout << "5. Withdraw Money\n";
        cout << "6. Update Account Details\n";
        cout << "7. Delete Account\n";
        cout << "8. Display Linked List\n";
        cout << "9. Exit\n";
        cout << "========================================\n";
        cout << "Enter your choice: ";

        if (!(cin >> choice)) {
            cout << "Invalid input. Enter a number from 1 to 9.\n";
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            continue;
        }

        switch (choice) {
            case 1:
                bank.createAccount();
                break;

            case 2:
                bank.displayAccounts();
                break;

            case 3:
                bank.searchAccount();
                break;

            case 4:
                bank.depositMoney();
                break;

            case 5:
                bank.withdrawMoney();
                break;

            case 6:
                bank.updateAccount();
                break;

            case 7:
                bank.deleteAccount();
                break;

            case 8:
                bank.displayLinkedList();
                break;

            case 9:
                cout << "Thank you for using the application!\n";
                break;

            default:
                cout << "Invalid choice. Please try again.\n";
        }

    } while (choice != 9);

    return 0;
}
