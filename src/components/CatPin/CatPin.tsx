import type { Cat } from "../../types/cat";
import styles from "./CatPin.module.css"
import unchecked from "../../assets/icons/unchecked.svg"
import checked from "../../assets/icons/checked.svg"
import { catStore } from "../../store/catstore";
import { observer } from "mobx-react-lite";

function CatPin({ cat }: { cat: Cat }) {
    return (
        <div className={styles.catContainer}>
            <img className={styles.catImg} src={cat.url} alt="Котик"></img>

            <button className={styles.favoritesBtn} onClick={() => catStore.toggleFavorites(cat)}>
                <img src={catStore.isFavorite(cat) ? checked : unchecked} alt="Избранное"></img>
            </button>
        </div>
    )
}

export default observer(CatPin);