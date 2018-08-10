export const SUBSCRIBED = 'newsletter/SUBSCRIBED'
export const CLOSED = 'newsletter/CLOSED'
export const DEFAULT = 'newsletter/DEFAULT'
export const setCookie = (cookies, key, value, opts) => cookies.set(key, value, opts)
export const getCookie = (cookies, key, opts) => cookies.get(key, opts)

export const getNewsletterCookie = (cookies) => getCookie(cookies, 'BLOCKSTACK_NEWSLETTER')
export const setNewsletterCookie = (cookies, state = DEFAULT) =>
  setCookie(cookies, 'BLOCKSTACK_NEWSLETTER', { state, lastSet: Date.now() })
