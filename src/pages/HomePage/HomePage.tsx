import { useEffect, useRef } from "react"
import styles from "./HomePage.module.css"
import { CatPin } from "../../components/CatPin/CatPin";
import { catStore } from "../../store/catstore";
import { observer } from "mobx-react-lite";

function HomePage() {
    const observerElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (catStore.cats.length > 0) return;

        catStore.loadCats();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio < 0) return;

            if (entries[0].isIntersecting) {
                catStore.loadCats();
            }
            
        }, {
            threshold: 0.1,
        });

        if (observerElement.current) {
            observer.observe(observerElement.current);
        }

        return () => {
            if (observerElement.current) {
                observer.unobserve(observerElement.current);
            }
        }
    })
    
    return (
        <div>
            <div className={styles.catsContainer}>
                {catStore.cats.map(cat => (
                    <CatPin key={cat.id} cat={cat}/>
                ))}
            </div>
            
            {catStore.loading && <p className={styles.loadingText}>... загружаем еще котиков ...</p>}
            <div ref={observerElement} style={{height: '100px'}}></div>
            
        </div>
    )
}

export default observer(HomePage);