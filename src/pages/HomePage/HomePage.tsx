import { useEffect, useRef } from "react"
import styles from "./HomePage.module.css"
import { catStore } from "../../store/catstore";
import { observer } from "mobx-react-lite";
import Cats from "../../components/Cats/Cats";

function HomePage() {
    const observerElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (catStore.cats.length > 0) return;

        catStore.loadUntilTheEnd();
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
    }, []);
    
    return (
        <div>
            {catStore.loading
                && catStore.cats.length === 0
                && <p style={{marginTop: "48px"}} className={styles.loadingText}>... загружаем котиков ...</p>
            }

            <Cats cats={catStore.cats}/>
            
            {catStore.loading
                && catStore.cats.length > 0
                && <p className={styles.loadingText}>... загружаем еще котиков ...</p>
            } 

            <div ref={observerElement} style={{height: '48px'}}></div>
            
        </div>
    )
}

export default observer(HomePage);