import { EasyCipher } from "../cipher";

describe('EasyCipher', () => {
  describe('Encryption and Decryption Compatibility Tests', () => { 
    it('should encrypt and decrypt a string', () => {
      const cipher = new EasyCipher('JF0Sov4i/FxCI/EtwtuuQPh7jqFyNQYz');
      const encrypted = cipher.encrypt('Hello, world!');
      const decrypted = cipher.decrypt(encrypted);
      expect(decrypted).toBe('Hello, world!');
    });

    it('should encrypt and decrypt a object with nested objects', () => {
      const cipher = new EasyCipher('JF0Sov4i/FxCI/EtwtuuQPh7jqFyNQYz');
      const encrypted = cipher.encrypt({
        name: 'John',
        age: 30,
        address: {
          street: '123 Main St',
          city: 'Anytown',
        },
      });
      const decrypted = cipher.decrypt(encrypted);
      expect(decrypted).toEqual({
        name: 'John',
        age: 30,
        address: {
          street: '123 Main St',
          city: 'Anytown',
        },
      });
    });

    it('should encrypt and decrypt a array with nested objects', () => {
      const cipher = new EasyCipher('JF0Sov4i/FxCI/EtwtuuQPh7jqFyNQYz');
      const encrypted = cipher.encrypt([
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
      ]);
      const decrypted = cipher.decrypt(encrypted);
      expect(decrypted).toEqual([
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
      ]);
    });

    it('should encrypt empty strings', () => {
      const cipher = new EasyCipher('JF0Sov4i/FxCI/EtwtuuQPh7jqFyNQYz');
      const encrypted = cipher.encrypt('');
      const decrypted = cipher.decrypt(encrypted);
      expect(decrypted).toBe('');
    });

    it('should encrypt and decrypt a number', () => {
      const cipher = new EasyCipher('JF0Sov4i/FxCI/EtwtuuQPh7jqFyNQYz');
      const encrypted = cipher.encrypt(123);
      const decrypted = parseInt(cipher.decrypt(encrypted));
      expect(decrypted).toBe(123);
    });

    it('should encrypt and decrypt a boolean', () => {
      const cipher = new EasyCipher('JF0Sov4i/FxCI/EtwtuuQPh7jqFyNQYz');
      const encrypted = cipher.encrypt(true);
      const decrypted = Boolean(cipher.decrypt(encrypted));
      expect(decrypted).toBe(true);
    });

    it('should encrypt and decrypt a date', () => {
      const cipher = new EasyCipher('JF0Sov4i/FxCI/EtwtuuQPh7jqFyNQYz');
      const testDate = new Date();
      const encrypted = cipher.encrypt(testDate);
      const decrypted = cipher.decrypt(encrypted);
      expect(decrypted.toISOString()).toBe(testDate.toISOString());
    });

    it('should fail gracefully when encrypting a null', () => {
      const cipher = new EasyCipher('JF0Sov4i/FxCI/EtwtuuQPh7jqFyNQYz');
      expect(() => cipher.encrypt(null)).toThrow('Invalid data');
    });

    it('should fail gracefully when encrypting a undefined', () => {
      const cipher = new EasyCipher('JF0Sov4i/FxCI/EtwtuuQPh7jqFyNQYz');
      expect(() => cipher.encrypt(undefined)).toThrow('Invalid data');
    });

    it('should fail gracefully when decrypting invalid data', () => {
      const cipher = new EasyCipher('JF0Sov4i/FxCI/EtwtuuQPh7jqFyNQYz');
      const encrypted = 'invalid';
      expect(() => cipher.decrypt(encrypted)).toThrow('Invalid data');
    });
  })
});