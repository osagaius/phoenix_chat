export const PRESENCES_CHANGED = 'PRESENCES_CHANGED';
export function newPresences(presences) {
  return { type: PRESENCES_CHANGED, presences, receivedAt: Date.now()};
}
