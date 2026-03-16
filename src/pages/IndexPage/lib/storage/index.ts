class StorageService {
    setItem<T extends string>(key: string, value: T) {
        try {
            return window.localStorage.setItem(key, value);
        } catch (e) {
            console.error(e);
        }
    }

    setJSON<T>(key: string, value: T) {
        try {
            const json = JSON.stringify(value);

            this.setItem(key, json);
        } catch (e) {
            console.error(e);
        }
    }

    getItem(key: string) {
        try {
            return window.localStorage.getItem(key);
        } catch (e) {
            if (e instanceof Error) {
                console.error(e);
            } else {
                console.error('::LocalStorageService::getItem', key);
            }
        }
    }

    getJSON(key: string) {
        try {
            const json = this.getItem(key);

            if (!json) {
                return null;
            }

            return JSON.parse(json);
        } catch (e) {
            if (e instanceof Error) {
                console.error(e);
            } else {
                console.error('::LocalStorageService::getJSON', key);
            }
        }
    }
    clear(): void {
        window.localStorage.clear();
    }
}

export const STORAGE = new StorageService();
