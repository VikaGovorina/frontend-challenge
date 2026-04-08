import { useEffect, useState } from "react"
import { CatApi } from "../../api/CatApi";
import type { Cat } from "../../types/cat";
import styles from "./HomePage.module.css"
import { CatPin } from "../../components/CatPin/CatPin";

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
            
            <div className={styles.catsContainer}>
                {cats.map(cat => (
                    <CatPin key={cat.id} cat={cat}/>
                ))}
            </div>

        </div>
    )
}