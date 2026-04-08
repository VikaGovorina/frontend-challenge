import type { Cat } from "../../types/cat";
import styles from "./CatPin.module.css"
import unchecked from "../../assets/icons/unchecked.svg"
import checked from "../../assets/icons/checked.svg"
import { useState } from "react";

export function CatPin({ cat }: { cat: Cat }) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className={styles.catContainer}>
            <img className={styles.catImg} src={cat.url} alt="Котик"></img>

            <button className={styles.favoritesBtn} onClick={() => setIsFavorite(isFavorite => !isFavorite)}>
                <img src={isFavorite ? checked : unchecked} alt="Избранное"></img>
            </button>
        </div>
    )
}