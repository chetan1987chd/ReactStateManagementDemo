import React, { useState } from "react";
import { saveShippingAddress } from './services/shippingService'
import { useCart } from "./cartContext";

const STATUS =
{
    IDLE: "IDLE",
    SUBMITTED: "SUBMITTED",
    SUBMITING: "SUBMITTING",
    COMPLETED: "COMPLETED"
}

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
    city: "",
    country: "",
};

export default function Checkout() {
    const [address, setAddress] = useState(emptyAddress);
    const [status, setStatus] = useState(STATUS.IDLE);
    const [touched, setTouched] = useState({});
    const { cart, dispatch } = useCart();
    //Dervied state
    const errors = getFormErrors(address);
    const isFormValid = Object.keys(errors).length === 0;

    function handleChange(e) {
        e.persist(); //persist the event
        setAddress((currentAddres) => {
            return { ...currentAddres, [e.target.id]: e.target.value };
        });
    }

    function getFormErrors(address) {
        const result = {};
        if (!address.city) result.city = "City is required";
        if (!address.country) result.country = "Country is required";
        return result;
    }

    function handleBlur(event) {
        setTouched((control) => {
            return { ...control, [event.target.id]: true };
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setStatus(STATUS.SUBMITING);

        if (isFormValid) {
            try {

                await saveShippingAddress(address);
                dispatch({ type: "empty" });
            } catch (error) {
                console.log(error);
            }
            finally {
                setStatus(STATUS.COMPLETED)
            }
        }
        else {
            setStatus(STATUS.SUBMITTED);
        }
    }

    if (status === STATUS.COMPLETED) {
        return <h1>Thanks for shopping</h1>
    }

    return (
        <>
            <h1>Shipping Info</h1>
            {
                !isFormValid && status === STATUS.SUBMITTED &&
                (
                    <div role="alert">
                        <p>Please fix following errors</p>
                        <ul>
                            {Object.keys(errors).map((key) => {
                                return <li key={key}>{errors[key]}</li>
                            })}
                        </ul>
                    </div>

                )
            }
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="city">City</label>
                    <br />
                    <input
                        id="city"
                        type="text"
                        value={address.city}
                        //onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    <p role="alert">
                        {(touched.city || status === STATUS.SUBMITING) && errors.city}
                    </p>
                </div>

                <div>
                    <label htmlFor="country">Country</label>
                    <br />
                    <select
                        id="country"
                        value={address.country}
                        //onBlur={handleBlur}
                        onChange={handleChange}
                    >
                        <option value="">Select Country</option>
                        <option value="China">China</option>
                        <option value="India">India</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="USA">USA</option>
                    </select>
                    {/* <p role="alert">
                        {(touched.country || status === STATUS.SUBMITING) && errors.country}
                    </p> */}
                </div>

                <div>
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Save Shipping Info"
                        disabled={status === STATUS.SUBMITING}
                    />
                </div>
            </form>
        </>
    );
}
