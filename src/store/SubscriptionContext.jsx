import { createContext, useContext } from "react";


const SubsciptionProvider = createContext()

export const UseSubscriptionContext = useContext(SubsciptionProvider)

export const subscriptioncContext = ({ children }) => {
    return (
        <SubsciptionProvider.Provider>
            {children}
        </SubsciptionProvider.Provider>
    )
}