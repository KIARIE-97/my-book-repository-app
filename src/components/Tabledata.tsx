
import './tabledata.scss'

  interface IBook {
  id: number,
  bookName: string,
  authorName: string,
  yearOfPublication: number
  }
  interface tabledataProps {
  books: IBook[];
  removeBook: (id: number) => void;
  editBook: (id: number, book: IBook) => void;
  resetbook: () => void;
  }

const Tabledata = ({books, removeBook, editBook, resetbook}: tabledataProps) => {
  return (
    <div>
      <div className="container">
        <p>here are the books available for you😊</p>
        <table className="table">
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author Name</th>
              <th>Year of Publication</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td>{book.bookName}</td>
                <td>{book.authorName}</td>
                <td>{book.yearOfPublication}  
                  <button onClick={() => removeBook(book.id)}>clear</button>
                  <button onClick={() => editBook(book.id, book)}>edit</button>
                </td>
              </tr>
               ))}
          </tbody>
        </table>
        <div className="footers">
          {/* <div className="func">
          <button>previous</button>
          <button>next</button>
          </div > */}
                <button className="reset" onClick={() => resetbook()}>reset</button>
                </div>
               
      </div>
    </div>
  )
}

export default Tabledata