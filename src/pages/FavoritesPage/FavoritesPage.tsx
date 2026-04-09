import { observer } from "mobx-react-lite";
import Cats from "../../components/Cats/Cats";
import { catStore } from "../../store/catstore";
import styles from "./FavoritesPage.module.css";

function FavoritesPage() {
    return (
        <>
            {catStore.favorites.length > 0
                ? <Cats cats={catStore.favorites} />
                : <p className={styles.noFavorites}>У вас нет избранных котиков</p>
            }
        </>
    )
}

export default observer(FavoritesPage);