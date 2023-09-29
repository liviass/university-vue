export default defineNuxtPlugin(nuxtApp => {
  const connect = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('universitiesdb', 1);
      request.onupgradeneeded = () => {
        let db = request.result;

        if (!db.objectStoreNames.contains('favorites'))
          db.createObjectStore('favorites', {keyPath: 'key'});
      };
      request.onsuccess = () => {
        let conn = request.result;

        conn.onversionchange = () => conn.close();

        resolve(request.result);
      };
      request.onerror = () => reject(request.error);
      request.onblocked = () => { console.log('blocked'); };
    });
  }
  const getAll = async () => {
    const connection = await connect();

    return new Promise((resolve, reject) => {
      const transaction = connection.transaction(['favorites'], 'readonly');
      const store = transaction.objectStore('favorites');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    })
  }

  const remove = async (key, callback) => {
    const connection = await connect();

    return new Promise((resolve, reject) => {
      const transaction = connection.transaction(['favorites'], 'readwrite');
      const store = transaction.objectStore('favorites');
      const request = store.delete(key);

      request.onsuccess = () => {
        if (callback) callback();
        resolve(request.result)
      };
      request.onerror = () => reject(request.error);
    })
  }

  const add = async (item, callback) => {
    const connection = await connect();

    return new Promise((resolve, reject) => {
      const transaction = connection.transaction(['favorites'], 'readwrite');
      const store = transaction.objectStore('favorites');
      const request = store.add(JSON.parse(JSON.stringify(item))); // deep clone

      request.onsuccess = () => {
        if (callback) callback();
        resolve(request.result)
      };
      request.onerror = () => reject(request.error);
    })
  }

  return {
    provide: {
      getAll,
      remove,
      add,
    }
  }
})