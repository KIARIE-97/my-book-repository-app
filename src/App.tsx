import { useReducer,useEffect, useState, useCallback } from 'react'
import Form from './components/Form'
import Tabledata from './components/Tabledata'
// import useLocalStorage from './hooks/useLocalStorage'
import './App.scss'
import api from './api'

 
interface IBook {
  id: number
  bookName: string
  authorName: string
  yearOfPublication: number
}
 
const initialBookState: IBook[] = []
  // {
  //   id: 1,
  //   bookName: 'The Great Gatsby',
  //   authorName: 'F. Scott Fitzgerald',
  //   yearOfPublication: 1925,
  // },
  // {
  //   id: 2,
  //   bookName: 'One Hundred Years of Solitude',
  //   authorName: 'Gabriel Garcia Marquez',
  //   yearOfPublication: 1967,
  // },
  // {
  //   id: 3,
  //   bookName: 'A Passage to India',
  //   authorName: 'E.M. Forster',
  //   yearOfPublication: 1924,
  // }
 
 
 
 
type Action = { type: 'Add_book'; book: IBook }
| { type: 'remove_book'; id: number }
| { type: 'edit_book'; id: number; book: IBook }
| { type: 'reset'; initialBooks: IBook[]}
| {type: 'search_book'; book: IBook[]}
|  { type: 'set_books'; books: IBook[] }
 
const bookReducer = (state: IBook[], action: Action) => {
  switch (action.type) {
    case 'Add_book':
      return [...state, { ...action.book, id: state.length ? state[state.length - 1].id + 1 : 1 }];
      case 'remove_book':
      return state.filter((book) => book.id !== action.id)
    case 'edit_book':
      return state.map((book) =>
        book.id === action.id ? { ...book, ...action.book } : book // if the book id matches the action id, update the book with the new book details
      )
    case 'search_book':
      return state.filter((book) => book.bookName.toLowerCase().includes(action.book[0].bookName.toLowerCase()))
    case 'reset':
      return action.initialBooks
      case 'set_books':
      return action.books;
    default:
      return state
  }
}
 
function App() {
  // const [storedBooks, setStoredBooks] = useLocalStorage<IBook[]>('books', initialBookState)
  const [searchBook, setSearchBoook] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // const [loading, setLoading] = useState<boolean>(false);
  const [books, dispatch] = useReducer(bookReducer, initialBookState);
  const booksPerPage = 2;
  // const [searchTerm, setSearchTerm] = useState('');
 
  useEffect(() => {
    const fetchBooks = async () => {
      // setLoading(true);
      try {
        const response = await api.get('/books');
        dispatch({ type: 'set_books', books: response.data });
        console.log(response)
        if (response.status === 201) {
          console.log('response.data.');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        // setLoading(false);
    }
    };
 
    fetchBooks();
  }, []);
 
 //usereducer operations of reading, updating and deleting books
  // const [books, dispatch] = useReducer(bookReducer, storedBooks)
  const removeBook = async (id: number) => {
    try {
      await api.delete(`/books/${id}`);
      dispatch({ type: 'remove_book', id });
      console.log(books)
     
    } catch (error) {
      console.error('Error removing book:', error);
    }
    // fetchBooks();
  };
  const editBook = async (id: number, book: IBook) => {
    try {
      const response = await api.put(`/books/${id}`, book);
      dispatch({ type: 'edit_book', id, book: response.data });
    } catch (error) {
      console.error('Error editing book:', error);
    }
  };
const reset = () => {
  dispatch({ type: 'reset', initialBooks: books})
}
const addBook = async(book: Omit<IBook, 'id'>) => {
  try {
    const response = await api.post('/books', book);
    dispatch({ type: 'Add_book', book: response.data });
    if (response.status === 201) {
      setRefresh(!refresh)
    }
  } catch (error) {
    console.error('Error adding book:', error);
  }
}
//searching book
useEffect(() => {
  dispatch({type: 'search_book', book: books.filter((book) => book.bookName.toLowerCase() || book.authorName.toLowerCase().includes(searchBook.toLowerCase()))})
}, [searchBook])
const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchBoook(event.target.value);
 
};
 
const totalPages = Math.ceil(books.length / booksPerPage);
const pages = Array.from({ length: totalPages }, (_, i) => i + 1); // create an array of page numbers
 
const handleNext = useCallback(() => {
  setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
}, [totalPages]);
 
const handlePrevious = useCallback(() => {
  setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
}, []);
 
const [refresh, setRefresh] = useState<boolean>(false);
 
 
  return (
    <>
    <div className="body_container">
    <Form addBook={addBook} />
    <input type='text'  placeholder="Search by book tittle or authorname..." value={searchBook} onChange={handleSearch} />
    
    <Tabledata
    books={books }
    removeBook={removeBook}
    editBook={editBook}
    resetbook={reset}
    />
     <div className="func">
     {/* <div>
        {currentBooks.map((book, index) => (
          <div key={index}>{book.bookName}</div>
        ))}
      </div> */}
      <div className='two'>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <div>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}
      </div>
      </div>
      </div>
    </>
  )
}
 
export default App