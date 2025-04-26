import { Field, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import s from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    const trimmedQuery = values.query.trim();

    if (!trimmedQuery) {
      toast.error("Please enter your query");
      return;
    }

    if (trimmedQuery.length < 3) {
      toast.error("Too short! Minimum length - 3 symbols");
      return;
    }

    onSubmit(trimmedQuery);
    actions.resetForm();
  };

  return (
    <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
      <Form className={s.form}>
        <Field
          className={s.input}
          name="query"
          type="text"
          autoFocus
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
};

export default SearchBar;
