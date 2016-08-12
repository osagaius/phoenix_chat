export const NEW_MESSAGES = 'NEW_MESSAGES';
export function newPosts(messages) {
  return { type: NEW_MESSAGES, messages, receivedAt: Date.now()};
}
