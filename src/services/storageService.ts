import { PlatformState } from '../types/platform';
import { INITIAL_PLATFORM_STATE } from '../data/seedData';

const STORAGE_KEY = 'amana_platform_state_v5';

export const storageService = {
  loadState(): PlatformState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        this.saveState(INITIAL_PLATFORM_STATE);
        return INITIAL_PLATFORM_STATE;
      }
      const parsed = JSON.parse(raw);
      // Schema check for Phase 5
      if (
        parsed &&
        Array.isArray(parsed.jobs) &&
        Array.isArray(parsed.applications) &&
        Array.isArray(parsed.agreements) &&
        Array.isArray(parsed.payments) &&
        Array.isArray(parsed.complaints) &&
        parsed.worker &&
        parsed.employer &&
        parsed.reviewer &&
        parsed.worker.trust &&
        parsed.employer.trust
      ) {
        return parsed as PlatformState;
      }
      // Upgrade or reseed if older schema
      this.saveState(INITIAL_PLATFORM_STATE);
      return INITIAL_PLATFORM_STATE;
    } catch (e) {
      console.warn('Failed to parse localStorage state, reseeding with demo data:', e);
      this.saveState(INITIAL_PLATFORM_STATE);
      return INITIAL_PLATFORM_STATE;
    }
  },

  saveState(state: PlatformState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  },

  resetState(): PlatformState {
    try {
      localStorage.removeItem(STORAGE_KEY);
      this.saveState(INITIAL_PLATFORM_STATE);
    } catch (e) {
      console.error('Failed to reset localStorage state:', e);
    }
    return INITIAL_PLATFORM_STATE;
  },
};
