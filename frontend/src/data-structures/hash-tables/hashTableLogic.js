// ===============================
// Hash Function
// ===============================
function hash(key, size) {
  let hashValue = 0;
  for (let char of key) {
    hashValue += char.charCodeAt(0);
  }
  return hashValue % size;
}

// ===============================
// Separate Chaining
// ===============================
export class HashTableChaining {
  constructor(size = 10) {
    this.size = size;
    this.table = Array.from({ length: size }, () => []);
  }

  insert(key, value) {
    const index = hash(key, this.size);
    this.table[index].push({ key, value });
  }

  get(key) {
    const index = hash(key, this.size);
    return this.table[index].find((item) => item.key === key);
  }

  delete(key) {
    const index = hash(key, this.size);
    this.table[index] = this.table[index].filter(
      (item) => item.key !== key
    );
  }

  getTable() {
    return this.table;
  }
}

// ===============================
// Linear Probing
// ===============================
export class HashTableLinearProbing {
  constructor(size = 10) {
    this.size = size;
    this.table = new Array(size).fill(null);
  }

  insert(key, value) {
    let index = hash(key, this.size);
    while (this.table[index] !== null) {
      index = (index + 1) % this.size;
    }
    this.table[index] = { key, value };
  }

  get(key) {
    let index = hash(key, this.size);
    while (this.table[index] !== null) {
      if (this.table[index].key === key) return this.table[index];
      index = (index + 1) % this.size;
    }
    return null;
  }

  delete(key) {
    let index = hash(key, this.size);
    while (this.table[index] !== null) {
      if (this.table[index].key === key) {
        this.table[index] = null;
        return;
      }
      index = (index + 1) % this.size;
    }
  }

  getTable() {
    return this.table;
  }
}

// ===============================
// Quadratic Probing
// ===============================
export class HashTableQuadraticProbing {
  constructor(size = 10) {
    this.size = size;
    this.table = new Array(size).fill(null);
  }

  insert(key, value) {
    const baseIndex = hash(key, this.size);
    let i = 0;
    let index;

    while (i < this.size) {
      index = (baseIndex + i * i) % this.size;
      if (this.table[index] === null) {
        this.table[index] = { key, value };
        return;
      }
      i++;
    }
  }

  get(key) {
    const baseIndex = hash(key, this.size);
    let i = 0;
    let index;

    while (i < this.size) {
      index = (baseIndex + i * i) % this.size;
      if (this.table[index] === null) return null;
      if (this.table[index].key === key) return this.table[index];
      i++;
    }
    return null;
  }

  delete(key) {
    const baseIndex = hash(key, this.size);
    let i = 0;
    let index;

    while (i < this.size) {
      index = (baseIndex + i * i) % this.size;
      if (this.table[index] === null) return;
      if (this.table[index].key === key) {
        this.table[index] = null;
        return;
      }
      i++;
    }
  }

  getTable() {
    return this.table;
  }
}
