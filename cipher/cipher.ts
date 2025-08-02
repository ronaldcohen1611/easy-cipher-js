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
    const [ivHex, encryptedData] = data.split(':');
    const iv = Buffer.from(ivHex, 'hex');

    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.cipherKey,
      iv
    );
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    if (
      ['{', '['].includes(decrypted[0]) ||
      ['}', ']'].includes(decrypted[decrypted.length - 1])
    ) {
      return JSON.parse(decrypted);
    }

    return decrypted;
  };
}



