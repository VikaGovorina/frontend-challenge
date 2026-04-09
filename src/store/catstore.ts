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
        this.loadFavorites();
    }
    
    async loadUntilTheEnd() {
        while (document.documentElement.scrollHeight <= window.innerHeight && !this.loading) {
            await this.loadCats();
        }
    }

    async loadCats() {
        if (this.loading) return;

        try {
            this.loading = true;
            const data = await CatApi.getCats(this.page);
            this.setCats(data);
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

    toggleFavorites(cat: Cat) {
        if (this.favorites.find(fav => fav.id === cat.id)) {
            this.favorites = this.favorites.filter(fav => fav.id !== cat.id);
        } else {
            this.favorites = [...this.favorites, cat];
        }

        this.saveFavorites();
    }

    isFavorite(cat: Cat) {
        return this.favorites.find(fav => fav.id === cat.id);
    }

    saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }

    loadFavorites() {
        const favs = localStorage.getItem('favorites');
        if (favs) {
            this.favorites = JSON.parse(favs);
        }
    }
}

export const catStore = new CatStore();