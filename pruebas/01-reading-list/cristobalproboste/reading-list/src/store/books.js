import { create } from "zustand";
import booksService from "@/app/services/books";
import { persist } from "zustand/middleware";

export const useBookStore = create(
  persist(
    (set, get) => ({
      books: [],
      genres: [],
      likedBooks: [],
      fetchBooks: async () => {
        const books = await booksService.getBooks();
        const booksData = books.map(({ book }) => book);
        set({ books: booksData });
      },
      fetchGenres: async () => {
        const genres = await booksService.getGenres();
        set({ genres });
      },
      likeBook: (book) => {
        set((state) => ({
          likedBooks: [...state.likedBooks, book],
        }));
      },
      removeFromLiked: ({ ISBN: bookId }) => {
        const { likedBooks } = get();
        set(() => ({
          likedBooks: likedBooks.filter(({ ISBN }) => ISBN !== bookId),
        }));
      },
    }),
    { name: "bookStore", skipHydration: true },
  ),
);
