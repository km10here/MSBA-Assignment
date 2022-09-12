import './App.css';
import axios from 'axios'
import React, { useState } from 'react';
function App() {
  const[addProductPage, setAddProductPage] = useState(true);
  const [addProduct, setAddProduct] = useState(0);
  const [sliderValue, setsliderValue] = useState(3);
  const [addProductForm, setAddProductForm] = useState({
    name:"",
    cost:"",
    date:"",
    color:"#0000ff",
    url:"",
    remarks:""
  })

  const [allExpenses , setAllExpenses] =useState([]);
  const[searchExpenseId, setSearchExpenseId] = useState(0);

  function handleChange(e) {
    setsliderValue(e.target.value);
    setAddProductForm((prevValue)=>{
      return {...prevValue, cost:e.target.value};
    });
  }

  function setName(e){
    setAddProductForm((prevValue)=>{
      return {...prevValue, name:e.target.value};
    });
  }

  function setColor(e){
    setAddProductForm((prevValue)=>{
      return {...prevValue, color:e.target.value};
    });
  }

  function setDate(e){
    setAddProductForm((prevValue)=>{
      return {...prevValue, date:e.target.value};
    });
  }

  function setUrl(e){
    setAddProductForm((prevValue)=>{
      return {...prevValue, url:e.target.value};
    });
  }

  function setRemarks(e){
    setAddProductForm((prevValue)=>{
      return {...prevValue, remarks:e.target.value};
    });
  }

  function postProduct(){
    axios.post("http://localhost:5000/api/product", addProductForm).then((response)=>{
      if(response.status==200){
        setAddProduct(addProduct+1)
      }
    }).catch(
      (err)=>{
        console.log(err)
      }
    )
  }
  
  function showEpenses(){
    setAddProductPage(false);
    axios.get("http://localhost:5000/api/product", addProductForm).then((response)=>{
      if(response.status==200){
        setAllExpenses(response.data.data);
      }
    }).catch(
      (err)=>{
        console.log(err)
      }
    )
  }
  
  function setId(e){
    setSearchExpenseId(e.target.value);
  }

  function searchExpenseById(){
    setAddProductPage(false);
    axios.get("http://localhost:5000/api/productById?id="+searchExpenseId, addProductForm).then((response)=>{
      if(response.status==200){
        setAllExpenses([response.data.data]);
      }
    }).catch(
      (err)=>{
        console.log(err)
      }
    )
  }
  return (
    <div className="App">
    <button id="btn" onClick={()=>setAddProductPage(true)}>add expenses</button>
    <button id="btn" onClick={showEpenses}>show expenses</button>

    <button id="btn">clear</button>
      
      {
      addProductPage?<div>
      {/* form */}
      <h1 id="headi">Expense To Do</h1>
      <h1 id="headi">Expenses added {addProduct}</h1>

    <label for="name" id="hr">Name:</label>
    <input type="text" id="name" value={addProductForm.name} onChange={setName} name="name" /><br/><br/>

    <label for="date" id="hr">Date:</label>
    <input type="date" id="date" value={addProductForm.date} onChange= {setDate} name="date"/><br/><br/>

    <label for="colour" id="hr">colour:</label>
    <input type="color" id="colour"  value={addProductForm.color} onChange= {setColor}  name="colour"/><br/><br/>

    <label for="url" id="hr">URL:</label>
    <input type="text" id="url" value={addProductForm.url} onChange= {setUrl} name="url"/><br/><br/>

    <label for="remarks" id="hr">remarks:</label>
    <input type="text" id="remarks" value={addProductForm.remarks} onChange= {setRemarks} name="remarks"/><br/><br/>

    <label for="cost" id="hr">cost:{sliderValue}</label>

    <input 
      id="typeinp" 
      type="range" 
      min="0" max="5" 
      value={sliderValue} 
      onChange={handleChange}
      step="1"/><br/><br/>

    <button id="btn" onClick={postProduct}>ADD</button>
    <button id="btn">clear</button>
    </div>:

    <div>
        {/* show products  */}
        <label for="id">Search By ID</label>
    <input type="text" value={searchExpenseId} onChange={setId} name="ID"/><br/><br/>
    <button onClick={searchExpenseById}>Search</button><br/><br/>
    <table border="1px">
    <tbody>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Cost</th>
            <th>Date</th>
            <th>colour</th>
            <th>url</th>
            <th>remarks</th>
        </tr>
        </tbody>
        <tbody>
          
        <tr>
            <th>01</th>
            <th>XYZ</th>
            <th>8000</th>
            <th>02/12/2001</th>
            <th>Red</th>
            <th>www.xyz.abc</th>
            <th>no remarks</th>
        </tr>
        </tbody>
        <tbody>
  {allExpenses.map((x, i) =>
    <tr>
    <th>{allExpenses[i].id}</th>
    <th>{allExpenses[i].name}</th>
    <th>{allExpenses[i].cost}</th>
    <th>{allExpenses[i].date}</th>
    <th><h1 style={{"backgroundColor":allExpenses[i].color}}>{allExpenses[i].color}</h1></th>
    <th>{allExpenses[i].url}</th>
    <th>{allExpenses[i].remarks}</th>
</tr>
  )}
</tbody>
    </table>

        </div>
        }
    </div>
  );
}

export default App;
