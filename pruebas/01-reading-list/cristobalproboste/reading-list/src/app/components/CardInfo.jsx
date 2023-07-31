import Badge from "./Badge";
import ExpandButton from "./ExpandButton";
import { useBookStore } from "@/store/books";

const CardInfo = ({ book, onClick, show }) => {
  const { title, year, author, genre, pages, synopsis } = book;
  const { name: authorName, otherBooks } = author;
  const { likeBook } = useBookStore((state) => ({
    likeBook: state.likeBook,
  }));

  const className = `absolute bottom-0  w-full bg-black bg-opacity-90 p-8 rounded-2xl ${
    show ? "h-full" : "h-1/3"
  }`;

  const handleLike = () => {
    likeBook(book);
  };

  const Subtitle = ({ text }) => (
    <h2 className="text-base font-semibold sm:text-lg md:text-xl">{text}</h2>
  );

  const displayOtherBooks = otherBooks.length > 0 && (
    <>
      <Subtitle text="Más del author" />
      <ul>
        {otherBooks.map((book, index) => (
          <li key={index}>💎 {book}</li>
        ))}
      </ul>
    </>
  );

  return (
    <section className={className}>
      <header className="flex flex-row items-center">
        <h1 className="text-xl font-extrabold md:text-2xl">{title}</h1>
        <div className="flex-grow"></div>
        <ExpandButton onClick={onClick} show={show} />
      </header>
      <h2>
        por<span className="font-semibold"> {authorName}</span>
      </h2>
      <div className="flex flex-row space-x-2">
        <Badge text={genre} />
        <Badge text={year} />
        <Badge text={`${pages} páginas`} />
      </div>
      {show && (
        <section className="relative flex flex-col space-y-6">
          <Subtitle text="Sinopsis" />
          <p className="text-justify">{synopsis}</p>
          {displayOtherBooks}
          <button
            className="rounded-full bg-white p-2 text-black  hover:bg-blue-300 hover:text-white"
            onClick={handleLike}
          >
            Agregar a favoritos
          </button>
        </section>
      )}
    </section>
  );
};

export default CardInfo;
