import React, {useEffect, useState} from "react";
import { useFirebase } from "../context/firebase";
import BookCard from "../components/card";
import CardGroup from 'react-bootstrap/CardGroup';

const HomePage = () => {
    const firebase = useFirebase();
    const [books, setbooks] = useState([]);

    useEffect(() => {
        firebase.listAllBooks().then((books) => setbooks(books.docs));
    });
  
    
    return (
        
        <div className="container mt-5 mb-5">
            <CardGroup>
                {books.map((book) => (<BookCard link={`/book/view/${book.id}`} key={book.id} id={book.id} {...book.data()}/>))}
            </CardGroup>
        </div>
    ) 
}

export default HomePage;
 