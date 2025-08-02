# 🔐 Easy Cipher JS

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

> A simple, secure TypeScript library for AES encryption and decryption 🛡️

## ✨ Features

- 🚀 Easy-to-use AES encryption/decryption
- 🔧 Supports multiple AES algorithms (CBC, CCM, GCM, OCB modes)
- 📦 Automatically handles strings and JSON objects
- 🔒 Secure random IV generation

## 📦 Installation

```bash
npm install 
npm run build
```

## 🚀 Usage

```javascript
import { EasyCipher } from 'easy-cipher-js';

// Create cipher instance with 32-character key
const cipher = new EasyCipher('your-32-character-encryption-key!!');

// Encrypt data
const encrypted = cipher.encrypt('Hello World');
const encryptedJson = cipher.encrypt({ message: 'secret data' });

// Decrypt data
const decrypted = cipher.decrypt(encrypted);
const decryptedJson = cipher.decrypt(encryptedJson);
```

## 📋 Requirements

- ⚡ Node.js
- 🔑 32-character encryption key

## 🔧 Supported Algorithms

| Algorithm | Key Size | Mode |
|-----------|----------|------|
| `aes-256-cbc` | 256-bit | CBC (default) |
| `aes-128/192/256-gcm` | 128/192/256-bit | GCM |
| `aes-128/192/256-ccm` | 128/192/256-bit | CCM |
| `aes-128/192/256-ocb` | 128/192/256-bit | OCB |

---

## 📄 License

**ISC** - Feel free to use this project! 🎉