"use client";
import CardInfo from "./CardInfo";
import { useState } from "react";

const Card = ({ book }) => {
  const [show, setShow] = useState(false);
  const { ISBN, cover, title } = book;

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <section
      className="relative h-[80vh] w-full max-w-[400px] items-center text-white"
      key={ISBN}
    >
      <img
        src={cover}
        alt={`Portada libro ${title}`}
        className="absolute top-0 h-full w-full rounded-2xl bg-red-500 "
      />
      <CardInfo
        onClick={handleShow}
        book={book}
        show={show}
        key={`${ISBN}-${title}-info`}
      />
    </section>
  );
};

export default Card;
