import { observer } from "mobx-react-lite";
import Cats from "../../components/Cats/Cats";
import { catStore } from "../../store/catstore";

function FavoritesPage() {
    return (
        <Cats cats={catStore.favorites} />
        // <div>
            
        // </div>
    )
}

export default observer(FavoritesPage);