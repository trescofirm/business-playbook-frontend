import { Link } from "react-router-dom";

const Breadcrumbs = ({ book }) => {
  return (
    <nav
      className="breadcrumbs"
      aria-label="Breadcrumb"
    >
      <Link to="/">
        Home
      </Link>

      <span aria-hidden="true">/</span>

      <Link to="/books">
        Books
      </Link>

      <span aria-hidden="true">/</span>

      <span>
        {book.title}
      </span>
    </nav>
  );
};

export default Breadcrumbs;