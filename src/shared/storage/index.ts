// Storage utilities for Chrome extension
import { StorageData } from '../types';

/**
 * Get data from Chrome storage
 */
export async function getStorage<K extends keyof StorageData>(
  keys: K | K[]
): Promise<Pick<StorageData, K>> {
  return new Promise((resolve) => {
    chrome.storage.local.get(keys as string[], (result) => {
      resolve(result as Pick<StorageData, K>);
    });
  });
}

/**
 * Set data in Chrome storage
 */
export async function setStorage(data: Partial<StorageData>): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set(data, () => {
      resolve();
    });
  });
}

/**
 * Remove data from Chrome storage
 */
export async function removeStorage(keys: keyof StorageData | (keyof StorageData)[]): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.remove(keys as string[], () => {
      resolve();
    });
  });
}

/**
 * Clear all storage
 */
export async function clearStorage(): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.clear(() => {
      resolve();
    });
  });
}

/**
 * Listen for storage changes
 */
export function onStorageChange(
  callback: (changes: { [key: string]: chrome.storage.StorageChange }) => void
): void {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local') {
      callback(changes);
    }
  });
}
