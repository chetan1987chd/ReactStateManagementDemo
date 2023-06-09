import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";
import { useState } from "react";

export default function Detail(props) {

    const { id } = useParams();
    //const [sku, setSku] = useState();
    const navigate = useNavigate();
    const skuRef = useRef();

    const { data: product, loading, error } = useFetch(`products/${id}`);

    if (loading) return <Spinner />;
    if (!product) return <PageNotFound />;
    // TODO: Display these products details
    return (
        <div id="detail">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p id="price">${product.price}</p>
            <select
                id="size"
                ref={skuRef}
            //onChange={(e) => setSku(e.target.value)}
            >
                <option value="">What size?</option>
                {product.skus.map((s) =>
                (
                    <option key={s.sku} value={s.sku}>
                        {s.sku}
                    </option>
                )
                )}
            </select>
            <p>
                <button
                    //disabled={!sku} -- not possible in case of ref
                    className="btn btn-primary"
                    onClick={() => {
                        const sku = skuRef.current.value;
                        if (!sku) return alert("SKU not selected");
                        props.addToCart(id, sku);
                        navigate('/cart');
                    }}>Add to cart</button>
            </p>
            <img src={`/images/${product.image}`} alt={product.category} />
        </div>
    );
}
