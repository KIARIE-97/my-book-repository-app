import { useRef } from 'react'
import './form.scss'

interface FormProps {
  addBook: (book: { bookName: string; authorName: string; yearOfPublication: number }) => void;
}

const Form: React.FC<FormProps> = ({ addBook }) => { // this component receives the addBook function as a prop
  const bookNameRef = useRef<HTMLInputElement>(null);
  const authorNameRef = useRef<HTMLInputElement>(null);
  const yearOfPublicationRef = useRef<HTMLInputElement>(null);

  const handleAddBook = () => {
    if (bookNameRef.current && authorNameRef.current && yearOfPublicationRef.current) {
      const bookName = bookNameRef.current.value;
      const authorName = authorNameRef.current.value;
      const yearOfPublication = parseInt(yearOfPublicationRef.current.value, 10);
      const newBook = { bookName, authorName, yearOfPublication };
      addBook(newBook);
      bookNameRef.current.value = '';
      authorNameRef.current.value = '';
      yearOfPublicationRef.current.value = '';
    }
  };

  return (
    <div>
      <div className="data">
        <h4>Please register a book...</h4>
        <form>
          <input type="text" ref={bookNameRef} placeholder="Enter book name..." />
          <input type="text" ref={authorNameRef} placeholder="Enter author name..." />
          <input type="text" ref={yearOfPublicationRef} placeholder="Enter year of publication..." />
          <button type="button" className='btn' onClick={handleAddBook}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Form