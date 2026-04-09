import { observer } from "mobx-react-lite";
import type { Cat } from "../../types/cat";
import CatPin from "../CatPin/CatPin";
import styles from "./Cats.module.css"

function Cats({ cats }: { cats: Cat[]}) {
    return (
        <div className={styles.catsContainer}>
            {cats.map(cat => (
                <CatPin key={cat.id} cat={cat}/>
            ))}
        </div>
    );
}

export default observer(Cats);