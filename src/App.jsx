import { useState } from 'react';
import './App.css'
// Two sections: 
/**
 * 
 * @returns we have the form section that takes food suggestions, checks if the suggested food is already listed and updated the list if not.
 * 
 * we also have the search section that fetches food data from store. If food is not found, a suggestion is made to add the food to store.
 * 
 * Another version can have the food type category - breakfast, lunch, snacks, dinner/supper 
 */

function App() {
  return (
    <div>
      <h1>What Should I Eat?</h1>
      <Search />
      <AddFoodItem />
    </div>
  );
}




function Search() {
  const [foodCategory, setFoodCategory] = useState('breakfast');
  const [foodInput, setFoodInput] = useState('');

  function handleFoodCategory(e) {
    setFoodCategory(e.target.value)
  }

  
  function handleFoodInput(e) {
    setFoodInput(e.target.value);
  }
  
  function handleSearch() {
    console.log('food Input is ', foodInput, ' and can be taken as ', foodCategory);

    setFoodInput('');
    setFoodCategory('breakfast'); 
  }

  return(
    <div>
      <input type="text" placeholder='Food...' value={foodInput} onChange={handleFoodInput}/>
      <select value={foodCategory} onChange={handleFoodCategory}>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner/Supper</option>
        <option value="junk">Junk</option>
      </select>
      <button type="button" onClick={handleSearch}>Search</button>
    </div>
  
  );
}




function AddFoodItem() {
  const [foodNameInput, setFoodNameInput] = useState('');
  const [addFoodCategory, setAddFoodCategory] = useState('breakfast');

  function handleFoodNameInput(e) {
    setFoodNameInput(e.target.value);
  }

  function handleAddFoodCategory(e) {
    setAddFoodCategory(e.target.value);
  }

  function handleAddFood() {
    console.log(foodNameInput, ' has been added to ', addFoodCategory, ' category in the store');
    setFoodNameInput('');
    setAddFoodCategory('breakfast');
  }

  return(
    <form>
      <label htmlFor="food-name">Food name</label>
      <input type="text" placeholder='Eba and Ogbona...' id='food-name' value={foodNameInput} onChange={handleFoodNameInput} />

      <label htmlFor="food-category">What Category Does This Food Belong?</label>
      <select id="food-category" value={addFoodCategory} onChange={handleAddFoodCategory}>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner/Supper</option>
        <option value="junk">Junk</option>
      </select>

      <button type="button" onClick={handleAddFood}>Add Food To Store</button>
    </form>
  );
}

export default App
 