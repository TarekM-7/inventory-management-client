import { Outlet } from "react-router"
import Header from "../components/Header"
import Tabs from "../components/Tabs"

export default function Layout() {
    return (
        <>
            <Header />
            <Tabs />
            <main className="px-8 py-7">
                <Outlet />
            </main>
        </>
    )
}
