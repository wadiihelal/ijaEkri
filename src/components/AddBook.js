import React, { useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { API, graphqlOperation, Storage } from "aws-amplify";
import { createBook } from '../api/mutations'
import config from '../aws-exports'
import { BookContext } from "../context/books";


const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
} = config


const Admin = () => {


    const { fetchBooks } = useContext(BookContext);
    const [images, setImages] = useState([]);
    const [bookDetails, setBookDetails] = useState({ title: "", description: "", images: [], author: "", price: "" });

    const handleSubmit = async (e) => {

        console.log(e)

        e.preventDefault();

        try {
            if (!bookDetails.title || !bookDetails.price) return
            console.log(bookDetails)
            const l = await API.graphql(graphqlOperation(createBook, { input: bookDetails }))
            console.log(l)
            setBookDetails({ title: "", description: "", images: [], author: "", price: "" })
            fetchBooks()

        } catch (err) {
            console.log('error creating book:', err)
        }
    }

    const handleImageUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const extension = file.name.split(".")[1];
        const name = file.name.split(".")[0];
        const key = `images/${uuidv4()}${name}.${extension}`;
        const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
        try {
            // Upload the file to s3 with public access level. 
            await Storage.put(key, file, {
                level: 'public',
                contentType: file.type
            });
            // Retrieve the uploaded file to display
            Storage.get(key, { level: 'public' }).then((e) => {
                console.log('image', e)
                let list = images
                list.push(e)
                console.log(list)
                setImages(list);
                console.log(images)
                setBookDetails({ ...bookDetails, images: images });
            })

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section className="admin-wrapper">

            <section>
                <header className="form-header">
                    <h3>Add New House</h3>

                </header>
                <form className="form-wrapper" onSubmit={handleSubmit}>
                    <div className="form-image">
                        {images[0] ? <img className="image-preview" src={images[0]} alt="" /> : <input
                            type="file"
                            accept="image/jpg"
                            onChange={(e) => handleImageUpload(e)} />}

                    </div>
                    <div className="form-image">
                        {images[1] ? <img className="image-preview" src={images[1]} alt="" /> : <input
                            type="file"
                            accept="image/jpg"
                            onChange={(e) => handleImageUpload(e)} />}

                    </div>
                    <div className="form-image">
                        {images[2] ? <img className="image-preview" src={images[2]} alt="" /> : <input
                            type="file"
                            accept="image/jpg"
                            onChange={(e) => handleImageUpload(e)} />}

                    </div>
                    <div className="form-fields">
                        <div className="title-form">
                            <p><label htmlFor="title">House Owner</label></p>
                            <p><input
                                name="email"
                                type="title"
                                placeholder="Type the offre "
                                onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })}
                                required
                            /></p>
                        </div>
                        <div className="description-form">
                            <p><label htmlFor="description">Description</label></p>
                            <p><textarea
                                name="description"
                                type="text"
                                rows="8"
                                placeholder="Type the description of the house"
                                onChange={(e) => setBookDetails({ ...bookDetails, description: e.target.value })}
                                required
                            /></p>
                        </div>
                        <div className="author-form">
                            <p><label htmlFor="author">Phone Number</label></p>
                            <p><input
                                name="author"
                                type="text"
                                placeholder="Type the owner's Phone Number (216) -- --- ---"
                                onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })}
                                required
                            /></p>
                        </div>
                        <div className="price-form">
                            <p><label htmlFor="price">Price (🇹🇳)</label>
                                <input
                                    name="price"
                                    type="text"
                                    placeholder="What is the Price of the house (TDN)"
                                    onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })}
                                    required
                                /></p>
                        </div>
                        <div className="featured-form">
                            <p><label>Featured?</label>
                                <input type="checkbox"
                                    className="featured-checkbox"
                                    checked={bookDetails.featured}
                                    onChange={() => setBookDetails({ ...bookDetails, featured: !bookDetails.featured })}
                                />
                            </p>
                        </div>
                        <div className="submit-form">
                            <button className="btn" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </section>

        </section>
    )
}

export default Admin