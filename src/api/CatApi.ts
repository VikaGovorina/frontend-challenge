import axios from "axios"
import { ENV } from "../config/env"
import type { Cat } from "../types/cat";

const api = axios.create({
    baseURL: ENV.CAT_API_URL,
    headers: {
        'x-api-key': ENV.CAT_API_KEY
    }
});

export const CatApi = {
    async getCats(page: number): Promise<Cat[]> {
        try {
            const { data } = await api.request({
                method: 'GET',
                params: {
                    limit: 15,
                    page
                }
            });
            return data;

        } catch (error) {
            console.error(error);
            return [] as Cat[];
        }
    }
}