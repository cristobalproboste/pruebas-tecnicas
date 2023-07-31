import { useBookStore } from "@/store/books";
const Navbar = ({
  showableBooks,
  selectedGenre,
  selectedPages,
  setSelectedGenre,
  setSelectedPages,
}) => {
  const { genres, likedBooks } = useBookStore((state) => ({
    likedBooks: state.likedBooks,
    genres: state.genres,
  }));

  return (
    <nav className=" flex w-full flex-row  justify-center space-x-10  p-4">
      <section className="flex flex-col justify-center space-y-4">
        <h1 className="text-lg">Libros disponibles: {showableBooks.length}</h1>
        <h1 className="text-lg">
          Libros en lista de lectura: {likedBooks.length}
        </h1>
      </section>
      <section className="mx-auto flex w-1/2  flex-col justify-center space-y-4 self-center">
        <div className="flex flex-col">
          <h2>Filtro por género</h2>
          <select
            value={selectedGenre}
            onChange={(event) => {
              setSelectedGenre(event.target.value);
            }}
            className="w-full appearance-none rounded-full bg-gray-50 p-2  text-center text-sm text-gray-900"
          >
            <option value="">Todos los géneros</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-full flex-col">
          <h2>Filtro por paginas</h2>
          <input
            type="range"
            className="cursor-pointer appearance-none rounded-lg bg-gray-200"
            min={0}
            max={2000}
            step={50}
            defaultValue={0}
            onChange={(e) => {
              setSelectedPages(e.target.value);
            }}
          ></input>
          <p>Paginas: {selectedPages}</p>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
