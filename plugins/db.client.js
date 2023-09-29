
async function putSomeData() {
  let db = await idb.open('db-name', 1, upgradeDB => upgradeDB.createObjectStore('objectStoreName', { autoIncrement: true }))
z
  let tx = db.transaction('objectStoreName', 'readwrite')
  let store = tx.objectStore('objectStoreName')

  await store.put({ firstname: 'John', lastname: 'Doe', age: 33 })

  await tx.complete
  db.close()
}

export default defineNuxtPlugin(nuxtApp => {
  // let connection;

  const connect = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('universitiesdb', 1);
      request.onupgradeneeded = () => {
        db = request.result;

        if (!db.objectStoreNames.contains('favorites'))
          db.createObjectStore('favorites', {keyPath: 'key'});

        return resolve(db)
      };
      request.onsuccess = () => resolve(request.result);
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
      const request = store.add({...item});

      request.onsuccess = () => {
        if (callback) callback();
        resolve(request.result)
      };
      request.onerror = () => reject(request.error);
    })
  }

  const isFavorite = async (key) => {
    const connection = await connect();

    return new Promise((resolve, reject) => {
      const transaction = connection.transaction(['favorites'], 'readwrite');
      const store = transaction.objectStore('favorites');
      const request = store.get(key);

      request.onsuccess = () => {
        if (request.result) resolve(true)
        else resolve(false)
      };
      request.onerror = () => reject(request.error);
    })
  }

  return {
    provide: {
      getAll,
      remove,
      add,
      isFavorite
    }
  }
})

// export default ({app}, inject) => {
//   inject('db', () => {
//     // let db;
//     // let reqBD = indexedDB.open('universitiesdb', 1);

//     // reqBD.onerror = function() {
//     //   console.log(`[ERROR] DB: ${reqBD.error}`);
//     // }

//     // reqBD.onsuccess = function() {
//     //   db = reqBD.result;
//     //   //   // Read all
//     //   // db.transaction(['favorites'])
//     //   //   .objectStore('favorites')
//     //   //   .getAll().onsuccess = function(evento) {
//     //   //     console.log('RESULT', evento.target.result);
//     //   //     // favorites.value = evento.target.result;
//     //   //     favorites.value = evento.target.result.map(({key}) => key);
//     //   // }
//     // }

//     // reqBD.onupgradeneeded = function(evento) {
//     //   db = reqBD.result;

//     //   if (!bd.objectStoreNames.contains('favorites'))
//     //     bd.createObjectStore('favorites', {keyPath: 'key'});
//     // }

//     return {
//       test: () => {
//         console.log('TESTE', db);
//         return 1
//       },
//       // add: (university) => {
//       //   let reqOS = db.transaction(['favorites'], 'readwrite').objectStore('favorites').add({...university});

//       //   reqOS.onerror = function() {
//       //     console.log(reqOS.error);
//       //   }
//       //   reqOS.onsuccess = function() {
//       //     console.log(reqOS.result);
//       //     refreshFavorites();
//       //   }
//       // },
//       // remove: (key) => {
//       //   return db.transaction(['favorites'], 'readwrite')
//       //   .objectStore('favorites')
//       //   .delete(key)
//       //   .onsuccess = function() {
//       //     return 'Favorite excluído com sucesso!'
//       //   }
//       // },
//       // getAll: () => {
//       //   return db.transaction(['favorites'])
//       //   .objectStore('favorites')
//       //   .getAll()
//       //   .onsuccess = function(event) {
//       //     // console.log('RESULT', event.target.result);
//       //     return event.target.result.map(({key}) => key);
//       //   }
//       // }
//     }
//   })
// }

