export const NEW_MESSAGES_TOTAL = 'NEW_MESSAGES_TOTAL';
export function newMessagesTotal(value) {
  return { type: NEW_MESSAGES_TOTAL, value, receivedAt: Date.now()};
}
