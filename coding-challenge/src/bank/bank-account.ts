import {v4 as uuid} from 'uuid';

export class BankAccount {
    public balance: number = 0;
    public accountHolder: string;
    public accountNumber: string;

    constructor(accountHolder) {
        this.accountHolder = accountHolder;
        this.accountNumber = uuid();
    }

    /*
    * Withdraw money from the current account
    * Params:
    * withdrawAmount (--number): The amount of money to be withdrawn
    * 
    * Returns:
    * void
    */
    withdraw(withdrawAmount: number) {
        if (withdrawAmount <= 0){
            throw new Error('Withdraw amount has to be greater than 0!');
        }
        if (this.balance <= withdrawAmount) {
            throw new Error('Insufficient funds!');
        }

        this.balance -= withdrawAmount;
    };

    /*
    * Add money to the current account
    * Params:
    * depositAmount (--number): The amount of money to be added
    * 
    * Returns:
    * void
    */
    deposit(depositAmount: number) {
        if (depositAmount <= 0){
            throw new Error('Deposit amount has to be greater than 0!');
        }

        this.balance += depositAmount;
    };

    /*
    * Return current account balance
    * Params:
    * 
    * Returns:
    * balance (--number): Current account balance
    */
    checkBalance() {
        return this.balance;
    };

    /*
    * Return current account balance
    * Params:
    * transferAmount         (--number): The amount of money to be transfert to destionation account
    * destinationBankAccount (--Object): Bank account object receiving the transfered money
    * 
    * Returns:
    * void
    */
    transfer(transferAmount: number, destinationBankAccount: BankAccount) {
        const initialBalance = this.balance;
        try{
            this.withdraw(transferAmount);
            destinationBankAccount.deposit(transferAmount);
        }catch(error){
            this.balance = initialBalance;
            throw new Error('Something went wrong! Transaction canceled!');
        }
    };
}