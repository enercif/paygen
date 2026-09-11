import { PersistedState } from 'runed';

export const usernameState = new PersistedState<string>('username', '');
