import { useEffect, useState } from "react"
import { CatApi } from "../../api/CatApi";
import type { Cat } from "../../types/cat";
import styles from "./HomePage.module.css"

export default function HomePage() {
    const [loading, setLoading] = useState(false);
    const [cats, setCats] = useState<Cat[]>([]);
    const [page, setPage] = useState(0);

    const loadCats = async () => {
        try {
            setLoading(true);
            const data = await CatApi.getCats(page);
            setCats(prevCats => [...prevCats, ...data]);

            console.log(data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setPage(page + 1);
        }
    }

    useEffect(() => {
        loadCats();
    }, []);
    
    return (
        <div>
            <h1>Home</h1>

            <div className={styles.catsContainer}>

            </div>

        </div>
    )
}