import booksData from "../../../../../../01-reading-list/books.json";

const getBooks = () => {
  const { library } = booksData;
  return [...library];
};

const getGenres = () => {
  const { library } = booksData;
  library.map(({ book }) => book.genre);
  return [...new Set(library.map(({ book }) => book.genre))];
};

const booksService = {
  getBooks,
  getGenres,
};

export default booksService;
