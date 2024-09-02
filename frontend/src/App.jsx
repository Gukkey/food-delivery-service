import './App.css'
import { useState, useEffect } from 'react'
import Card from './components/Card'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function App() {
  const [restaurants, setRestaurants] = useState(null)
  const [searchResult, setSearchResults] = useState(null);
  const [error, setError] = useState(null)

  useEffect(()=> {
    fetchRestaurants()
  }, [])

  const fetchRestaurants = async() => {
    try{
      const response = await fetch('http://localhost:8080/api/restaurant')
      const result = await response.json()
      setRestaurants(result.result)
      setSearchResults(result.result)
    }
    catch(error){
      console.log()
      setError(error.message)
    }
  }

  const searchResults = (query) => {
    if(restaurants ){
      if(query.length > 0){
        const filteredRestaurants = restaurants.filter(r=> r.name.toLowerCase().includes(query) || r.cuisine_type.toLowerCase().includes(query) || r.delivery_area.toLowerCase().includes(query))
        setSearchResults(filteredRestaurants)
      }
      else{
        setSearchResults(restaurants)
      }
    }

  }
  return (
<main>
  {console.log(searchResult)}
      {error && (
        <div>
          {error}
        </div>
      )}
      <h1>Food delivery App</h1>
      <div>
      <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Search" variant="outlined" placeholder='Search by name or cuisine or area' onKeyUp={e=> searchResults(e.target.value.toLowerCase())}/>
      </Box>

        {searchResult && searchResult.map(r=> <Card name={r.name} id={r.id} area={r.delivery_area} rating={r.rating} key={r.id} cuisine_type={r.cuisine_type}/>)}
      </div>
    </main>
  )
}

export default App
