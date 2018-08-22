export const selectNewsletterSubmitting = (state) => state.newsletter && state.newsletter.submitting
export const selectNewsletterHasSubscribed = (state) => state.newsletter && state.newsletter.subscribed
export const selectNewsletterError = (state) => state.newsletter && state.newsletter.error
export const selectNewsletterLastAttempt = (state) => state.newsletter && state.newsletter.lastAttempted
export const selectNewsletterModalIsOpen = (state) => state.newsletter && state.newsletter.newsletterModalIsOpen
