import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly STORAGE_PREFIX = 'ionic-workflow:';

  constructor() {}

  // Generic get with type safety
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.STORAGE_PREFIX + key);
      if (!item) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading ${key} from storage:`, error);
      return null;
    }
  }

  // Generic set
  set<T>(key: string, value: T): boolean {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(this.STORAGE_PREFIX + key, serialized);
      return true;
    } catch (error) {
      console.error(`Error writing ${key} to storage:`, error);
      // Check if quota exceeded
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.error('LocalStorage quota exceeded!');
      }
      return false;
    }
  }

  // Remove item
  remove(key: string): void {
    localStorage.removeItem(this.STORAGE_PREFIX + key);
  }

  // Clear all app data
  clear(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }

  // Check if key exists
  has(key: string): boolean {
    return localStorage.getItem(this.STORAGE_PREFIX + key) !== null;
  }

  // Get all keys with prefix
  getAllKeys(): string[] {
    const keys = Object.keys(localStorage);
    return keys
      .filter(key => key.startsWith(this.STORAGE_PREFIX))
      .map(key => key.replace(this.STORAGE_PREFIX, ''));
  }

  // Get storage size estimate (approximate)
  getStorageSize(): number {
    let total = 0;
    for (const key in localStorage) {
      if (key.startsWith(this.STORAGE_PREFIX)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total; // bytes
  }
}
