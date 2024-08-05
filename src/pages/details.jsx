import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";

const BookDetailsPage = () => {
    const params = useParams();
    const firebase = useFirebase();

    const [data, setData] = useState(null);
    const [url, setURL] = useState(null);
    const [qty, setqty] = useState(1);

    console.log(data);

    useEffect(() => {
        firebase.getBookById(params.bookId).then((value) => setData(value.data()))
    })

    useEffect(() => {
        if (data) {
            const imageURL = data.imageURL;
            firebase.getImageURL(imageURL).then((url) => setURL(url));
        }
    }, [data])

    const placeOrder = async () => {
       const result = await firebase.placeOrder(params.bookId, qty);
       console.log("Order Placed", result);
    }

    if(data == null) return <h1>Loading...</h1>;

    return (
        <div className="container mt-5">
            <h1>{data.name}</h1>
            <img src={url} width= "350px" style={{borderRadius: "10px"}} />
            <h1>Details</h1>
            <p>Price: Rs.{data.price}</p>
            <p>ISBN Number: {data.isbn}</p>
            <h2>Owner Details</h2>
            <p>Name: {data.displayName}</p>
            <p>Email: {data.userEmail}</p>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Qty</Form.Label>
                    <Form.Control style={{width: "10%"}}onChange={(e) => setqty(e.target.value)} value={qty} type="number" placeholder="Enter Quantity" />
                </Form.Group>
            <Button onClick={placeOrder} variant="success">Buy Now</Button>
        </div>
    )
}
export default BookDetailsPage; 