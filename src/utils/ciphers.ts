// Cipher implementations
export class CipherUtils {
  private static readonly ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Helper method to clean and format text
  static formatText(text: string): string {
    return text.toUpperCase().replace(/[^A-Z]/g, '');
  }

  // Caesar Cipher
  static caesarCipher(text: string, shift: number, decrypt = false): string {
    const formattedText = this.formatText(text);
    return formattedText
      .split('')
      .map(char => {
        const pos = this.ALPHABET.indexOf(char);
        if (pos === -1) return char;
        let newPos = (pos + (decrypt ? -shift : shift)) % 26;
        if (newPos < 0) newPos += 26;
        return this.ALPHABET[newPos];
      })
      .join('');
  }

  // Vigenère Cipher
  static vigenereCipher(text: string, key: string, decrypt = false): string {
    const formattedText = this.formatText(text);
    const formattedKey = this.formatText(key);
    
    if (!formattedKey) return '';

    return formattedText
      .split('')
      .map((char, i) => {
        const charPos = this.ALPHABET.indexOf(char);
        if (charPos === -1) return char;
        
        const keyChar = formattedKey[i % formattedKey.length];
        const keyPos = this.ALPHABET.indexOf(keyChar);
        let newPos = decrypt
          ? (charPos - keyPos + 26) % 26
          : (charPos + keyPos) % 26;
        
        return this.ALPHABET[newPos];
      })
      .join('');
  }

  // Playfair Cipher
  static playfairCipher(text: string, key: string): string {
    const formattedText = this.formatText(text).replace(/J/g, 'I');
    const matrix = this.generatePlayfairMatrix(key);
    const pairs = this.getPairs(formattedText);

    return pairs
      .map(pair => {
        const [pos1, pos2] = pair.split('').map(char => this.findPosition(matrix, char));
        
        // Same row
        if (pos1.row === pos2.row) {
          return (
            matrix[pos1.row][(pos1.col + 1) % 5] +
            matrix[pos2.row][(pos2.col + 1) % 5]
          );
        }
        
        // Same column
        if (pos1.col === pos2.col) {
          return (
            matrix[(pos1.row + 1) % 5][pos1.col] +
            matrix[(pos2.row + 1) % 5][pos2.col]
          );
        }
        
        // Rectangle
        return (
          matrix[pos1.row][pos2.col] +
          matrix[pos2.row][pos1.col]
        );
      })
      .join('');
  }

  private static generatePlayfairMatrix(key: string): string[][] {
    const formattedKey = this.formatText(key).replace(/J/g, 'I');
    const matrix: string[][] = Array(5).fill(null).map(() => Array(5).fill(''));
    const used = new Set<string>();
    let row = 0;
    let col = 0;

    // Place key first
    for (const char of formattedKey) {
      if (!used.has(char)) {
        matrix[row][col] = char;
        used.add(char);
        col++;
        if (col === 5) {
          col = 0;
          row++;
        }
      }
    }

    // Fill remaining with unused alphabet
    for (const char of this.ALPHABET) {
      if (char !== 'J' && !used.has(char)) {
        if (row < 5) {
          matrix[row][col] = char;
          col++;
          if (col === 5) {
            col = 0;
            row++;
          }
        }
      }
    }

    return matrix;
  }

  private static getPairs(text: string): string[] {
    const pairs: string[] = [];
    let i = 0;
    
    while (i < text.length) {
      if (i === text.length - 1) {
        pairs.push(text[i] + 'X');
        break;
      }
      
      if (text[i] === text[i + 1]) {
        pairs.push(text[i] + 'X');
        i++;
      } else {
        pairs.push(text[i] + text[i + 1]);
        i += 2;
      }
    }
    
    return pairs;
  }

  private static findPosition(matrix: string[][], char: string): { row: number; col: number } {
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (matrix[row][col] === char) {
          return { row, col };
        }
      }
    }
    return { row: 0, col: 0 };
  }
}