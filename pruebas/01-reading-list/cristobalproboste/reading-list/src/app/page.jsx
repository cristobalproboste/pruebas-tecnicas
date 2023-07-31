"use client";
import Card from "./components/Card";
import { useBookStore } from "@/store/books";
import { useEffect, useState } from "react";
import CircleX from "./components/svgs/CircleX";
import Navbar from "./components/Navbar";
import Empty from "./components/svgs/Empty";

export default function Home() {
  const { books, fetchBooks, likedBooks, removeFromLiked, fetchGenres } =
    useBookStore((state) => ({
      books: state.books,
      fetchBooks: state.fetchBooks,
      likedBooks: state.likedBooks,
      removeFromLiked: state.removeFromLiked,
      fetchGenres: state.fetchGenres,
    }));

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPages, setSelectedPages] = useState(0);
  const [showableBooks, setShowableBooks] = useState([]);

  const handleRemoveFromLiked = (book) => {
    removeFromLiked(book);
  };

  const handleRehydrate = () => {
    useBookStore.persist.rehydrate();
  };

  const handleTabSync = () => {
    window.addEventListener("storage", (event) => {
      if (event.key === "bookStore") {
        const { state: newState } = JSON.parse(event.newValue);
        useBookStore.setState(newState);
        window.removeEventListener("storage", handleRehydrate);
      }
    });
  };

  const handleFillShowableBooks = () => {
    const defaultShowableBooks = books.filter(
      (book) => !likedBooks.some((likedBook) => likedBook.ISBN === book.ISBN),
    );
    setShowableBooks(
      defaultShowableBooks.filter(
        ({ pages, genre }) =>
          pages >= selectedPages &&
          (selectedGenre !== "" ? genre === selectedGenre : true),
      ),
    );
  };

  useEffect(handleTabSync, []);

  useEffect(handleRehydrate, []);

  useEffect(handleFillShowableBooks, [
    likedBooks,
    books,
    selectedPages,
    selectedGenre,
  ]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  return (
    <>
      <Navbar
        showableBooks={showableBooks}
        selectedGenre={selectedGenre}
        selectedPages={selectedPages}
        setSelectedGenre={setSelectedGenre}
        setSelectedPages={setSelectedPages}
      />
      <section className="flex flex-col md:flex-row ">
        <aside className="flex flex-col items-center space-y-2 md:w-1/3">
          <h1 className="">Lista de lectura</h1>
          {likedBooks.map(({ title, year, genre, ISBN }) => {
            return (
              <div
                className="flex w-full justify-between rounded-full bg-white bg-opacity-80 p-4"
                key={ISBN}
              >
                <h2 className="text-center">
                  {title} - {year}
                </h2>

                <button onClick={() => handleRemoveFromLiked({ ISBN })}>
                  <CircleX className="h-6 w-6 stroke-red-500 stroke-2" />
                </button>
              </div>
            );
          })}
        </aside>
        {showableBooks.length > 0 ? (
          <section className="md:w-2/3">
            <section className="grid grid-cols-1 place-items-center gap-4 p-2 sm:grid-cols-2">
              {showableBooks.map((book) => (
                <Card book={book} key={book.ISBN} />
              ))}
            </section>
          </section>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-10">
            <h2 className="text-2xl font-bold">
              No hay mas libros disponibles para mostrar
            </h2>
            <Empty className="h-1/2 w-1/2 text-white" />
          </div>
        )}
      </section>
    </>
  );
}
