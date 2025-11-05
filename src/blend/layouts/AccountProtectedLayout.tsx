import React, { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useGeneralStore } from "../../pages/front/useGeneralStore";
import { useAuthStore } from "../../helpers/stores/useAuthStore";
import NotFoundPage from "../../pages/front/NotFoundPage";

interface AccountProtectedLayoutProps {
    children: ReactNode;
    statusCode: number
}

const AccountProtectedLayout: React.FC<AccountProtectedLayoutProps> = ({ children, statusCode = 200 }) => {

    const { user, check } = useAuthStore()
    const { svData, regular } = useGeneralStore();

    const navigate = useNavigate()

    useEffect(() => {
        check()

        if (!svData) { regular() }

        if (!user) {
            navigate('/login')
        }
    }, [user])

    return (
        <>
            {
                statusCode == 404 ?
                    <NotFoundPage />
                    :
                    <div className="account-page">
                        {children}
                    </div>

            }
        </>
    )
};

export default AccountProtectedLayout;
