import React, { useState } from "react";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";
import { Link, useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";

export default function Products() {
    const [size, setSize] = useState("");
    const { category } = useParams();
    const {
        data: products,
        loading,
        error
    } = useFetch(`products?category=${category}`);

    const filteredProds = size
        ? products.filter((x) => x.skus.find((s) => s.size === parseInt(size)))
        : products;

    function renderProduct(p) {
        return (
            <div key={p.id} className="product">
                <Link to={`/${category}/${p.id}`}>
                    <img src={`/images/${p.image}`} alt={p.name} />
                    <h3>{p.name}</h3>
                    <p>${p.price}</p>
                </Link>
            </div>
        );
    }

    //if (error) throw error;

    if (loading) return <Spinner></Spinner>;
    if (products.length === 0) return <PageNotFound />;

    return (
        <>
            <section id="filters">
                <label htmlFor="size">Filter by Size:</label>{" "}

                {size && <h2>Found {filteredProds.length} products</h2>}
            </section>
            <section id="products">{filteredProds.map(renderProduct)}</section>
        </>
    );
}
