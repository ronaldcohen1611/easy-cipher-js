import crypto from 'crypto';

type CipherAlgorithm =
  'aes-128-cbc' |
  'aes-192-cbc' |
  'aes-256-cbc' |
  'aes-128-ccm' |
  'aes-128-gcm' |
  'aes-128-ocb' |
  'aes-192-ccm' |
  'aes-192-gcm' |
  'aes-192-ocb' |
  'aes-256-ccm' |
  'aes-256-gcm' |
  'aes-256-ocb';

export class EasyCipher {
  private cipherKey: string;
  private algorithm: CipherAlgorithm;

  /**
   * @description - The EasyCipher class is used to encrypt and decrypt data.
   * @param cipherKey - The cipher key to use for the encryption and decryption. -- 32 characters long
   * @param algorithm - The algorithm to use for the encryption and decryption. -- aes-256-cbc is the default
   */
  constructor(cipherKey: string, algorithm: CipherAlgorithm = 'aes-256-cbc') {
    if (cipherKey.length !== 32) {
      throw new Error('Cipher key must be exactly 32 characters long');
    }

    this.cipherKey = cipherKey;
    this.algorithm = algorithm;
  }

  encrypt = (data: any) => {
    if (data == null || data === undefined) {
      throw new Error('Invalid data');
    }

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.cipherKey, iv);

    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return `${iv.toString('hex')}:${encrypted}`;
  };

  decrypt = (data: string) => {
    if (!this.validateDecryptData(data)) {
      throw new Error('Invalid data');
    }

    const [ivHex, encryptedData] = data.split(':');
    const iv = Buffer.from(ivHex, 'hex');

    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.cipherKey,
      iv
    );
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    try {
      const parsedData = JSON.parse(decrypted);
      // If it was a stringified Date, it will parse to an ISO string
      // Try to convert to Date if it looks like an ISO string
      if (
        typeof parsedData === 'string' &&
        !isNaN(new Date(parsedData).getTime())
      ) {
        return new Date(parsedData);
      }
      return parsedData;
    } catch (e) {
      // If parsing fails, return as a plain string.
      // This covers cases where original data was a string, or
      // JSON.parse failed because it wasn't valid JSON.
      // Also, handle if the original data was a stringified Date but JSON.parse removes the outer quotes
      if (
        typeof decrypted === 'string' &&
        !isNaN(new Date(decrypted).getTime()) &&
        decrypted.length === new Date(decrypted).toISOString().length
      ) {
        return new Date(decrypted);
      }
      return decrypted;
    }
  };

  private validateDecryptData = (data: string) => {
    if (!data) {
      return false;
    }

    const [ivHex, encryptedData] = data.split(':');
    if (!ivHex || !encryptedData || ivHex.length !== 32) {
      return false;
    }

    return true;
  };
}



