import React, { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../helpers/stores/useAuthStore";
import NotFoundPage from "../../pages/front/NotFoundPage";
import { useGeneralStore } from "../../helpers/stores/useGeneralStore";

interface AccountProtectedLayoutProps {
    children: ReactNode;
    statusCode?: number
}

const AccountProtectedLayout: React.FC<AccountProtectedLayoutProps> = ({ children, statusCode = 200 }) => {

    const { user, checkAuth } = useAuthStore()
    const { svData, regular } = useGeneralStore();

    const navigate = useNavigate()


    useEffect(() => {
        checkAuth()

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
