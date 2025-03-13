import React from "react";
import Book from "../../models/Book";
import BookProps from "./components/BookProps";

const List: React.FC = () => {
    const books: Book[] = [
        {
            id: 1,
            title: 'Book 1',
            description: 'Description for Book 1',
            originalPrice: 50000,
            price: 45000,
            imageUrl: '/images/books/1.webp',
        },
        {
            id: 2,
            title: 'Book 2',
            description: 'Description for Book 2',
            originalPrice: 50000,
            price: 45000,
            imageUrl: '/images/books/2.webp',
        },
        {
            id: 3,
            title: 'Book 3',
            description: 'Description for Book 2',
            originalPrice: 50000,
            price: 45000,
            imageUrl: '/images/books/3.webp',
        },
        {
            id: 4,
            title: 'Book 4',
            description: 'Description for Book 2',
            originalPrice: 50000,
            price: 45000,
            imageUrl: '/images/books/4.webp',
        },
        {
            id: 5,
            title: 'Book 5',
            description: 'Description for Book 2',
            originalPrice: 50000,
            price: 45000,
            imageUrl: '/images/books/5.webp',
        },
    ];

    return(
        <div className="container">
            <div className="row mt-4">
                {
                    books.map(book => (
                        <BookProps key={book.id} book={book}/>
                    ))
                }
            </div>
        </div>
    )
}

export default List;