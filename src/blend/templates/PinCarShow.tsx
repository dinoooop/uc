import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useCarStore from "../../helpers/stores/useCarStore";
import { outer } from "../../helpers/cssm/outer";
import { sv } from "../../helpers/sv/sv";


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
                        <div className="rolls">
                            {
                                <div className="roll">
                                    <div className="roll-image">
                                        <img
                                            src={`${outer.showImage(item.image, 'cover')}`}
                                            alt={item.title}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="roll-details">
                                        <h3 className="roll-title">{item.title}</h3>
                                        <p className="roll-title-sub">{item.brand.title}</p>
                                        <p className="roll-description">{item.description}</p>
                                        <ul className="car-meta">
                                            <li><strong>Year: </strong>{item.year}</li>
                                            <li><strong>Price: </strong>{sv.currency()} {item.price}</li>
                                            <li><strong>Mileage: </strong>{item.mileage} Kmpl</li>
                                            <li><strong>Travelled: </strong>{item.travelled}</li>
                                            <li><strong>Owner Details</strong></li>
                                            <li><strong>Name: </strong>{item.owner.first_name}</li>
                                            <li><strong>Email: </strong>{item.owner.email}</li>
                                            <li><strong>Phone: </strong>{item.owner.phone}</li>
                                            <li>
                                                <div className="mt-3">
                                                 <Link to={pinFrom === "account" ? "/account/cars" : pinFrom === "admin" ? "/admin/cars" : "/cars"} className="btn btn-secondary">Back</Link>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            }
                        </div>


                    </div>
                )
            }
        </div>
    );
};

export default PinCarShow;
