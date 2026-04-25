"use client"
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '../_Redux/configStore'

export default function MySesssion({ children }: { children: ReactNode }) {
    
    return (
        <div>
            <Provider store={store}>


                <SessionProvider >

                    {children}

                </SessionProvider>

            </Provider>
        </div>
    )
}
