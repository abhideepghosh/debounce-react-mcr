import { useState } from "react";

const App = () => {
  const movies = [
    { id: 1, title: 'The Shawshank Redemption', year: 1994 },
    { id: 2, title: 'The Godfather', year: 1972 },
    { id: 3, title: 'The Godfather: Part II', year: 1974 },
    { id: 4, title: 'The Dark Knight', year: 2008 },
    { id: 5, title: '12 Angry Men', year: 1957 },
    { id: 6, title: "Schindler's List", year: 1993 },
    { id: 7, title: 'Pulp Fiction', year: 1994 },
    { id: 8, title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { id: 9, title: 'The Good, the Bad and the Ugly', year: 1966 },
  ];
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      if(timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    }
  }

  const searchMovies = (e) => {
    setQuery(e.target.value);
    const searchQuery = e.target.value;
    console.log(searchQuery);
    console.log(searchQuery.length)
    if(searchQuery.length === 0) {
      setResult([]);
      return;
    }
    setResult([...movies.filter((el) => {
      console.log(el.title.toLowerCase().includes(searchQuery))
      return el.title.toLowerCase().includes(searchQuery);
    })]);
  }

  const debounceSearch = debounce(searchMovies, 1000);


  return (
    <div className="main-container">
      <input type='text' className='debounce' onChange={debounceSearch}/>
      {result.length > 0 ? result.map((el) => {
          return (
            <div key={el.id}>
              <h4>{el.title} - Release Year: {el.year}</h4>
            </div>
          )
        })
        :
        <h4 style={{ display: query.length === 0 ? 'none' : 'block'}}>No Movies Found</h4>
      }
    </div>
  )
}

export default App;