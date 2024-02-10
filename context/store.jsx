import { createContext, useState } from "react";

export const storeContext = createContext([]);
export const categoryContext = createContext('breakfast');


function StoreProvider({children}) {
  const [store, setStore] = useState([]);

  function deleteFromStore(index) {
    setStore(store.filter(item => item !== store.at(index)));
  }

  function addToStore(store, foodName, foodCategory) {
    const newStore = store.slice();
    setStore([...newStore, {
      name: foodName,
      category: foodCategory,
      id: foodName
    }]);
  }

  function updateData(item, editedName, editedCategory) {
    item.name = editedName;
    item.category = editedCategory;
    item.id = editedName;

    return item;
  }

  return (
    <storeContext.Provider value={
        {
            deleteFromStore,
            addToStore,
            updateData,
            store,
            setStore
        }
    }>
        {children}
    </storeContext.Provider>
  );
}

export default StoreProvider;