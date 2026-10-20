import { Outlet, useNavigation } from "react-router"
import Header from "../components/Header"
import Tabs from "../components/Tabs"

export default function Layout() {
    const navigation = useNavigation()
    const isLoading = navigation.state === "loading"

    return (
        <>
            <Header />
            <Tabs />
            <main aria-busy={isLoading} className={`px-8 py-7 ${isLoading ? "opacity-50" : ""}`}>
                <Outlet />
            </main>
        </>
    )
}
