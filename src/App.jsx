import { useContext, useState, createContext } from 'react';
import './App.css'
import { storeContext } from '../context/store';
// Two sections: 
/**
 * 
 * @returns we have the form section that takes food suggestions, checks if the suggested food is already listed and updated the list if not.
 * 
 * we also have the search section that fetches food data from store. If food is not found, a suggestion is made to add the food to store.
 * 
 * Another version can have the food type category - breakfast, lunch, snacks, dinner/supper 
 */

const options = {
    'all': 'All',
    'breakfast': 'Breakfast',
    'lunch': 'Lunch',
    'dinner': 'Dinner/Supper',
    'junks': 'Junk Food'
  }



function App() {
  const [foodCategory, setFoodCategory] = useState('breakfast');
  
  
  function handleFoodCategory(e) {
    setFoodCategory(e.target.value);
  }
  
  function handleCategorySearch(e) {
    console.log(foodCategory)
  }


  return (
    <div>
      <h1>Welcome!</h1>
      <h3>What Can I Eat?</h3>
      {/* <categoryContext.Provider value={foodCategory}>
        <CategorySearch onFoodCategory={handleFoodCategory} />
      </categoryContext.Provider> */}
      {/* <SearchBtn onSearch={handleCategorySearch}>Search</SearchBtn> */}

      <AddFoodItem />
      <StoreView />
    </div>
  );
}



// function CategorySearch({onFoodCategory}) {

//   const foodCategorySearch = useContext(categoryContext);

//   return(
//     <>
//       <select value={foodCategorySearch} onChange={onFoodCategory}>
//         <Options />
//       </select>

//     </>
//   );
// }



function Options() {
  return(
    <>
      {
        Object.entries(options).map(([k,v]) => <option value={k} key={k}>{v}</option>)
      }    
    </>
  );
}



// function SearchBtn({onSearch, children}) {

//   return(
//     <button type="button" onClick={onSearch}>{children}</button>
//   );
// }



function AddFoodItem() {
  const {store, addToStore} = useContext(storeContext);
  const [foodNameInput, setFoodNameInput] = useState('');
  const [addFoodCategory, setAddFoodCategory] = useState('breakfast');

  function handleFoodNameInput(e) {
    setFoodNameInput(e.target.value);
  }

  function handleAddFoodCategory(e) {
    setAddFoodCategory(e.target.value);
  }

  function handleAddFood(e) {
    e.preventDefault();
    if (!foodNameInput) return;

    addToStore(store, foodNameInput, addFoodCategory);
    setFoodNameInput('');
    setAddFoodCategory('breakfast');
  }


  return(
    <form>
      <div style={{display: 'block', marginBottom: '30px'}}>
        <label htmlFor="food-name">Food name</label>
        <input type="text" placeholder='Eba and Ogbona...' id='food-name' value={foodNameInput} onChange={handleFoodNameInput} />
      </div>
      
      <div style={{display: 'block', marginBottom: '30px'}}>
        <label htmlFor="food-category">What Category Does This Food Belong?</label>
        <select id="food-category" value={addFoodCategory} onChange={handleAddFoodCategory}>
          <Options />
        </select>
      </div>

      <button onClick={handleAddFood} style={{marginBottom: '50px'}}>Add Food To Store</button>
    </form>
  );
}



function StoreView() {
  const {store} = useContext(storeContext);
  
  return(
    <div>
      <div style={{display: 'flex', gap: '50px'}}>
        <p>S/N</p>
        <p>Food Name</p>
        <p>Food Category</p>
      </div>
      {
        store?.map((item, i) => (
          <StoreItems
            SN={i} 
            key={item.name} 
            name={item.name}
            category={item.category}
            id={item.id}
          />

        ))
      }
    </div>
  );
}

function StoreItems( {SN, name, category, id} ) {

  const [nameEdit, setNameEdit] = useState(name);
  const [categoryEdit, setCatergoryEdit] = useState(category);
  const [isEditing, setIsEditing] = useState(false);
  const {deleteFromStore, store, setStore, updateData} = useContext(storeContext);

  function handleNameEdit(e) {
    setNameEdit(e.target.value);
  }

  function handleCategoryEdit(e) {
    setCatergoryEdit(e.target.value);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  

  function handleSubmitEdit(e) {
    e.preventDefault();
    
    const newStore = store.slice();
    const updatedStore = newStore.map(item => (item.id === id ? updateData(item, nameEdit, categoryEdit) : item));

    setStore(updatedStore);
    setIsEditing(false);
  }

  function handleDelete(item) {
    const confirmation = confirm('Would you like to remove this item from list?');
    if (!confirmation) return;
    deleteFromStore(item);
  }


  
  return (
    <>
    {
      !isEditing  
      ? <div>
          <div style={{display: 'flex', gap: '50px'}}>
            <p>{SN + 1}</p>
            <p>{name}</p>
            <p>{category}</p>
          </div>

          <div>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => handleDelete(SN)}>Delete</button>
          </div>
        </div>
      
      : <form>
          <input type="text" value={nameEdit} onChange={handleNameEdit} />
          <select value={categoryEdit} onChange={handleCategoryEdit}>
          <Options />
          </select>
          <button onClick={handleSubmitEdit}>Update</button>
        </form>

    }

    </>
  );
}

// function FoodSearch() {
//   const [foodInput, setFoodInput] = useState('');

//   function handleFoodCategory(e) {
//     setFoodCategory(e.target.value)
//   }

  
//   function handleFoodInput(e) {
//     setFoodInput(e.target.value);
//   }
  
//   function handleSearch() {
//     console.log('food Input is ', foodInput, ' and can be taken as ', foodCategory);

//     setFoodInput('');
//     setFoodCategory('breakfast'); 
//   }


//   return(
//     <div>
//       <input type="text" placeholder='Food...' value={foodInput} onChange={handleFoodInput} autoFocus />
//       <select value={foodCategory} onChange={handleFoodCategory}>
//         <option value="breakfast">Breakfast</option>
//         <option value="lunch">Lunch</option>
//         <option value="dinner">Dinner/Supper</option>
//         <option value="junk">Junk</option>
//       </select>
//       <button type="button" onClick={handleSearch}>Search</button>
//     </div>
  
//   );
// }





export default App
 