import {BankAccount} from "../../src/bank/bank-account";

describe('Tests for bank account class', () => {
    let bankAccount: BankAccount;
    const initialBalance = 12345;

    beforeEach(async () => {
        bankAccount = new BankAccount('UserBankAccount');
        bankAccount['balance'] = initialBalance;
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    //#region CheckBalance

    it('should return account balance', () => {
        // Act
        const bankAccountBalance = bankAccount.checkBalance();

        // Assert
        expect(bankAccountBalance).toBe(initialBalance);
    });

    //#endregion

    //#region Withdraw

    it('should throw a "Withdraw amount has to be greater than 0!" error!', () => {
        // Arrange
        const withdrawAmount = -5;

        // Act & Assert
        expect(() => {
            bankAccount.withdraw(withdrawAmount)
        }).toThrow('Withdraw amount has to be greater than 0!');
    });

    it('should throw a "Insufficient funds!" error', () => {
        // Act & Assert
        expect(() => {
            bankAccount.withdraw(initialBalance + 1)
        }).toThrow('Insufficient funds!');
    });

    it('should withdraw the specified amount and update the current balance', () => {
        // Arrange
        bankAccount.withdraw(1);
        
        // Assert
        expect(bankAccount.balance).toBe(initialBalance - 1);
    });

    //#endregion

    //#region Deposit

    it('should throw a "Deposit amount has to be greater than 0!" error', () => {
        // Arrange
        const depositAmount = -5;
        
        // Act & Assert
        expect(() => {
            bankAccount.deposit(depositAmount);
        }).toThrow('Deposit amount has to be greater than 0!')
    });

    it('should update the account balance with the specified sum!', () => {
        // Arrange
        const depositAmount = 100;

        // Act
        bankAccount.deposit(depositAmount);

        // Assert
        expect(
            bankAccount.balance
        ).toBe(initialBalance + depositAmount);
    });

    //#endregion

    //#region Transfer

    it('should transfer the specified sum from the destination account to the source account!', () => {
        // Arrange
        const destinationAccount: BankAccount = new BankAccount('DestinationAccount');
        const transferAmount = 100;

        jest.spyOn(BankAccount.prototype, 'withdraw').mockImplementationOnce(() => {
            bankAccount['balance'] -= transferAmount;
        });

        jest.spyOn(BankAccount.prototype, 'deposit').mockImplementationOnce(() => {
            destinationAccount['balance'] = transferAmount;
        })

        // Act
        bankAccount.transfer(transferAmount, destinationAccount);

        // Assert
        expect(bankAccount['balance']).toBe(initialBalance - transferAmount);
        expect(destinationAccount['balance']).toBe(transferAmount);
    });

    it('should transfer the specified sum back to the source account if the deposit operation fails!', () => {
        // Act
        let destinationBankAccount;
        const transferAmount = 100;
        
        // Act & Assert
        expect(() => {
            bankAccount.transfer(transferAmount, destinationBankAccount);
        }).toThrow('Something went wrong! Transaction canceled!');

        // Assert
        expect(
            bankAccount.checkBalance()
        ).toBe(initialBalance);
    });
    //#endregion

})