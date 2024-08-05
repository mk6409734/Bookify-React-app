import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useFirebase } from "../context/firebase";

const ListingPage = () => {
    const firebase = useFirebase();

    const [name, setname] = useState("");
    const [isbnNumber, setisbnNumber] = useState('');
    const [price, setprice] = useState('');
    const [coverPic, setcoverPic] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        await firebase.handleCreateNewListing(name, isbnNumber, price, coverPic);
    };


    return (
        <div className="container mt-5 "> 
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter book Name</Form.Label>
                <Form.Control onChange={(e) => setname(e.target.value)} value={name} type="text" placeholder="Book name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>ISBN</Form.Label>
                <Form.Control onChange={(e) => setisbnNumber(e.target.value)} value={isbnNumber} type="text" placeholder="ISBN Number" />
            </Form.Group>
           
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Price</Form.Label>
                <Form.Control onChange={(e) => setprice(e.target.value)} value={price} type="text" placeholder="Price" />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Cover</Form.Label>
                <Form.Control onChange={(e) => setcoverPic(e.target.files[0])}  type="file"  />
            </Form.Group>
            <Button variant="primary" type="submit">
                Create
            </Button>
        </Form>
    </div>
    )
}

export default ListingPage;