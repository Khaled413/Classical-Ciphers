# Classical Ciphers Encryption Tool

A modern web-based encryption tool that allows users to encrypt and decrypt text using three classical cipher techniques: **Caesar, Vigenère, and Playfair**. Built with a sleek and user-friendly graphical interface, this project makes classical encryption accessible and easy to use.

## Live Demo

Experience the tool live here: [Classical Ciphers](https://bejewelled-florentine-085c12.netlify.app/)

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## About the Project

This project provides an intuitive GUI that enables users to encrypt and decrypt text using three different classical ciphers:

1. **Caesar Cipher** – A simple substitution cipher that shifts each letter in the plaintext by a fixed number of positions.
2. **Vigenère Cipher** – A polyalphabetic substitution cipher that uses a repeating keyword to determine shifting values.
3. **Playfair Cipher** – A digraph substitution cipher that encrypts text using a 5x5 grid generated from a keyword.

The application allows users to select a cipher, enter text, provide necessary key inputs, and obtain encrypted or decrypted results instantly.

## Features

- User-friendly **dark-themed** graphical interface with a modern look.
- Supports encryption and decryption for **Caesar** and **Vigenère** ciphers.
- Playfair cipher supports **encryption only**.
- Instructions section to guide users.
- Fully responsive design.
- Built using **React.js** and **Tailwind CSS**.

## Technologies Used

- **React.js** – Frontend framework for building the user interface.
- **Tailwind CSS** – Styling framework for responsive and modern design.
- **JavaScript (ES6+)** – Core logic for encryption and decryption algorithms.
- **Netlify** – Deployment platform for hosting the web application.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo.git
   ```
2. Navigate to the project directory:
   ```sh
   cd classical-ciphers
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```

## Usage

1. Select a cipher type (**Caesar, Vigenère, or Playfair**).
2. Enter the text you want to encrypt or decrypt.
3. For **Caesar Cipher**, enter a shift value (number).
4. For **Vigenère/Playfair Ciphers**, enter a keyword.
5. Click the **Encrypt** or **Decrypt** button to see the result.
6. The Playfair cipher currently supports **encryption only**.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the **MIT License**.

---

Feel free to modify this README to better fit your project's needs!

