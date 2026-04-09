import { NavLink, Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/" end>Все котики</NavLink>
                        </li>
                        <li>
                            <NavLink to="/favorites">Любимые котики</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    );
}