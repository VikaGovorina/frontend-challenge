import { makeAutoObservable } from "mobx";
import type { Cat } from "../types/cat";
import { CatApi } from "../api/CatApi";

class CatStore {
    cats: Cat[] = [];
    page = 0;
    favorites: Cat[] = [];
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    async loadCats() {
        if (this.loading) return;
        try {
            this.loading = true;
            const data = await CatApi.getCats(this.page);
            this.setCats(data);

            // console.log(data);
            // console.log(this.cats);

        } catch (error) {
            console.error(error);
        } finally {
            this.loading = false;
            this.nextPage();
        }
    }

    setCats(newCats: Cat[]) {
        this.cats = [...this.cats, ...newCats];
    }

    nextPage() {
        this.page++;
    }

}

export const catStore = new CatStore();