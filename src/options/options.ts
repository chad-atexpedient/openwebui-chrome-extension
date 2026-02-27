import { getStorage, setStorage } from '../shared/storage';

// Load saved settings
async function loadSettings() {
  const { config, theme } = await getStorage(['config', 'theme']);
  
  const baseUrlInput = document.getElementById('baseUrl') as HTMLInputElement;
  const themeSelect = document.getElementById('theme') as HTMLSelectElement;
  
  if (config?.baseUrl) {
    baseUrlInput.value = config.baseUrl;
  }
  
  if (theme) {
    themeSelect.value = theme;
  }
}

// Save settings
async function saveSettings() {
  const baseUrlInput = document.getElementById('baseUrl') as HTMLInputElement;
  const themeSelect = document.getElementById('theme') as HTMLSelectElement;
  const successMessage = document.getElementById('successMessage') as HTMLDivElement;
  
  const baseUrl = baseUrlInput.value.trim();
  const theme = themeSelect.value as 'light' | 'dark';
  
  const { config } = await getStorage(['config']);
  
  await setStorage({
    config: {
      ...config,
      baseUrl,
    },
    theme,
  });
  
  // Show success message
  successMessage.style.display = 'block';
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  
  const saveBtn = document.getElementById('saveBtn');
  saveBtn?.addEventListener('click', saveSettings);
});
