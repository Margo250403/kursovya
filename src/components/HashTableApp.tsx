import React, { useState, useEffect } from 'react';
import './HashTableApp.css';

type HashTable = {
  [key: string]: string;
};

const HashTableApp: React.FC = () => {
  const [hashTable, setHashTable] = useState<HashTable>(() => {
    const storedHashTable = localStorage.getItem('hashTable');
    return storedHashTable ? JSON.parse(storedHashTable) : {};
  });
  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [searchResult, setSearchResult] = useState('');

  useEffect(() => {
    localStorage.setItem('hashTable', JSON.stringify(hashTable));
  }, [hashTable]);

  const hash = (str: string): number => {
    let hash = 0;
    if (str.length === 0) {
      return hash;
    }
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  };

  const addKeyValuePair = () => {
    const updatedHashTable = { ...hashTable };
    const hashKey = hash(keyInput);
    updatedHashTable[hashKey.toString()] = valueInput;
    setHashTable(updatedHashTable);
    setKeyInput('');
    setValueInput('');
  };

  const searchValueByKey = () => {
    const hashKey = hash(searchKey);
    const result = hashTable[hashKey.toString()];
    setSearchResult(result || 'Значення не знайдено');
    setSearchKey('');
  };

  return (
    <div className="hash-table-app">
      <h1>Хеш-таблиця</h1>
      <div className="key-value-pair">
        <h2>Додати пари "ключ-значення"</h2>
        <input
          type="text"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          placeholder="Введіть ключ"
        />
        <input
          type="text"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          placeholder="Введіть значення"
        />
        <button onClick={addKeyValuePair}>Додати</button>
      </div>
      <div className="search-value">
        <h2>Пошук значення за ключем</h2>
        <input
          type="text"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Введіть ключ"
        />
        <button onClick={searchValueByKey}>Пошук</button>
      </div>
      <div className="search-result">
        <h2>Пошук результату</h2>
        <p>{searchResult}</p>
      </div>
    </div>
  );
};

export default HashTableApp;