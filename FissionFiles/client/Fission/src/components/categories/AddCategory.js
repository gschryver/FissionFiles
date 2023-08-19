import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../../managers/CategoryManager";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import NavBar from "../nav/navbar";

const AddCategory = () => {
  const { addCategory } = useContext(CategoryContext);
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory(category).then(() => {
      navigate("/categories");
    });
  };

  return (
    <div class="add-general-page">
      <NavBar />
      <Container className="mt-4 add-general-form p-5">
        <h2 className="important-header">Add Category</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="categoryName">
            <Form.Label column sm="2">
              Category Name
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name="name"
                value={category.name}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="categoryDescription" className="mb-4">
            <Form.Label column sm="2">
              Category Description
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name="description"
                value={category.description}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Button bsPrefix="add-figure-button" className="me-2" type="submit">
            Add
          </Button>
          <Button
            variant="secondary"
            bsPrefix="cancel-figure-button"
            className="ml-2"
            onClick={() => navigate("/categories")}
          >
            Cancel
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default AddCategory;
