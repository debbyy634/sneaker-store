import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";


const AddSneaker = ({ save }) => {
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [availableSneakers, setAvailableSneakers] = useState(0);
 
  const isFormFilled = () => brand && image && description && price && availableSneakers;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <>
      <Button
        onClick={handleShow}
        variant="dark"
        className="rounded-pill px-0"
        style={{ width: "38px" }}
      >
        <i className="bi bi-plus"></i>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Sneaker</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputTitle"
              label="brand name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
                placeholder="Enter brand name"
              />
            </FloatingLabel>


            <FloatingLabel
              controlId="inputImage"
              label="ImageURL"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter Image url"
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputDescription"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="Event description"
                style={{ height: "80px" }}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FloatingLabel>
            
            <FloatingLabel
              controlId="inputPrice"
              label="Price"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="available"
              label="Available"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="Available"
                onChange={(e) => {
                  setAvailableSneakers(e.target.value);
                }}
              />
            </FloatingLabel>

           
          </Modal.Body>
        </Form>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            disabled={!isFormFilled()}
            onClick={() => {
              save({
                brand,
                image,
                description,
                price,
                availableSneakers
              });
              handleClose();
            }}
          >
            Save Sneaker
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddSneaker.propTypes = {
  save: PropTypes.func.isRequired,
};

export default AddSneaker;
