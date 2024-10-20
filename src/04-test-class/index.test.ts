// Uncomment the code below and write your tests
import { random } from 'lodash';
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

jest.mock('lodash', () => ({ random: jest.fn() }));

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(1);

    expect(bankAccount.getBalance()).toEqual(1);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(0);

    expect(() => bankAccount.withdraw(1)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const fromBankAccount = getBankAccount(0);
    const toBankAccount = getBankAccount(0);

    expect(() => fromBankAccount.transfer(1, toBankAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(1);

    expect(() => bankAccount.transfer(1, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(0);

    bankAccount.deposit(1);

    expect(bankAccount.getBalance()).toEqual(1);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(1);

    bankAccount.withdraw(1);

    expect(bankAccount.getBalance()).toEqual(0);
  });

  test('should transfer money', () => {
    const fromBankAccount = getBankAccount(1);
    const toBankAccount = getBankAccount(0);

    fromBankAccount.transfer(1, toBankAccount);

    expect(fromBankAccount.getBalance()).toEqual(0);
    expect(toBankAccount.getBalance()).toEqual(1);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock).mockReturnValueOnce(10).mockReturnValueOnce(1);
    const bankAccount = getBankAccount(0);

    const balance = await bankAccount.fetchBalance();

    expect(balance).toEqual(10);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (random as jest.Mock).mockReturnValueOnce(10).mockReturnValueOnce(1);
    const bankAccount = getBankAccount(0);

    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toEqual(10);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (random as jest.Mock).mockReturnValueOnce(10).mockReturnValueOnce(0);
    const bankAccount = getBankAccount(0);

    expect(async () => await bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
