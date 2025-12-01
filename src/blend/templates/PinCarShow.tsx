import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useCarStore from "../../helpers/stores/useCarStore";
import { outer } from "../../helpers/cssm/outer";


interface PinCarShowProps {
    pinFrom?: string;
}
const PinCarShow: React.FC<PinCarShowProps> = ({ pinFrom = "public" }) => {
    const { show, item } = useCarStore();
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            const id = parseInt(params.id)
            show(id)
        }
    }, [params])

    return (


        <div className="left-img-card bg-white">
            {
                item && (
                    <div className="row ">
                        <div className="col-md-4">
                            <img
                                src={`${outer.showImage(item.image, 'cover')}`}
                                alt={item.title}
                                loading="lazy"
                            />
                        </div>

                        <div className="col-md-8 ">
                            <h2 className="name">{item.title}</h2>
                            <h3>{item.brand.title}</h3>
                            <h4>{item.year}</h4>
                            <h4>{item.price} Rs</h4>
                            <h4>Travelled: {item.travelled} Km</h4>
                            <h4>{item.mileage} Kmpl</h4>
                            <h3 className="mb-2">About</h3>
                            <p className="about">{item.description}</p>
                            {
                                (pinFrom === "account" || pinFrom === "admin") && (
                                    <div className="mt-1">
                                        <Link to={`/admin/cars/edit/${item.id}`} className="btn">Edit</Link>
                                    </div>
                                )
                            }

                            <h3 className="mt-2 mb-0">Owner Details</h3>
                            <h4>Name: {item.owner.first_name}</h4>
                            <h4>Email: {item.owner.email}</h4>
                            <h4>Phone: {item.owner.phone}</h4>

                            {/* back button */}
                            <div className="mt-3">
                                <Link to={pinFrom === "account" ? "/account/cars" : pinFrom === "admin" ? "/admin/cars" : "/cars"} className="btn btn-secondary">Back</Link>    
                            </div>

                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default PinCarShow;
