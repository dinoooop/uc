import { Link } from "react-router-dom";
import React from "react";

interface AppIconProps {
    to?: string;
    icon: string;
    title?: string;
    itemId?: string | number;
    onClick?: (arg: string | number | React.MouseEvent<HTMLElement>) => void;
}

export default function AppIcon({
    to,
    icon,
    title,
    itemId,
    onClick,
}: AppIconProps) {
    const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
        if (onClick) {
            if (itemId !== undefined) {
                onClick(itemId);
            } else {
                onClick(e);
            }
        }
    };

    return (
        <>
            {to ? (
                <div className="tooltip">
                    <Link to={to}>
                        <i className={`fas fa-${icon} icon`}></i>
                        {title && (
                            <div className="top">
                                {title}
                                <i></i>
                            </div>
                        )}
                    </Link>
                </div>
            ) : (
                <div className="tooltip">
                    <i
                        className={`fas fa-${icon} icon`}
                        onClick={handleOnClick}
                        role="button"
                    ></i>
                    {title && (
                        <div className="top">
                            {title}
                            <i></i>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};
