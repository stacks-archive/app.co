import slugify from './lib/slugify'

function dedupe(a) {
  return Array.from(new Set(a))
}
const imageUrl = 'https://appco.imgix.net'
const desktopParams = '?w=1800&auto=format'
const mobileParams = '?w=780&auto=format'
const background = (title) => {
  if (!title) return [null, null]
  if (title.includes('Popular Blockstack Apps')) {
    return [
      `url("${imageUrl}/pop-blockstack-apps-mobile.png${mobileParams}")`,
      `url("${imageUrl}/pop-blockstack-apps-desktop.png${desktopParams}")`
    ]
  }
  if (title.includes('lockstack')) {
    return [
      `url("${imageUrl}/blockstack-mobile.png${mobileParams}")`,
      `url("${imageUrl}/blockstack-desktop.png${desktopParams}")`
    ]
  }
  if (title === 'g1') {
    return [
      `url("${imageUrl}/generic1-mobile.png${mobileParams}")`,
      `url("${imageUrl}/generic1-desktop.png${desktopParams}")`
    ]
  }
  if (title === 'g2') {
    return [
      `url("${imageUrl}/generic1-mobile.png${mobileParams}")`,
      `url("${imageUrl}/generic1-desktop.png${desktopParams}")`
    ]
  }
  if (title === 'g3') {
    return [
      `url("${imageUrl}/generic1-mobile.png${mobileParams}")`,
      `url("${imageUrl}/generic1-desktop.png${desktopParams}")`
    ]
  }
  if (title === 'g4') {
    return [
      `url("${imageUrl}/generic1-mobile.png${mobileParams}")`,
      `url("${imageUrl}/generic1-desktop.png${desktopParams}")`
    ]
  }
  if (title.includes('xchanges')) {
    return [
      `url("${imageUrl}/decentralized-exchange-mobile.png${mobileParams}")`,
      `url("${imageUrl}/decentralized-exchange-desktop.png${desktopParams}")`
    ]
  }
  if (title.includes('Popular decentralized apps') || title.includes('Popular Decentralized Apps')) {
    return [
      `url("${imageUrl}/generic1-mobile.png${mobileParams}")`,
      `url("${imageUrl}/generic1-desktop.png${desktopParams}")`
    ]
  }
  if (title.includes('EOS')) {
    return [`url("${imageUrl}/eos-mobile.png${mobileParams}")`, `url("${imageUrl}/eos-desktop.png${desktopParams}")`]
  }
  if (title.includes('Ethereum Wallets')) {
    return [`url("${imageUrl}/eth-wallets-mobile.png${mobileParams}")`, `url("${imageUrl}/eth-wallets-desktop.png${desktopParams}")`]
  }
    if (title.includes('thereum')) {
    return [`url("${imageUrl}/eth-mobile.png${mobileParams}")`, `url("${imageUrl}/eth-desktop.png${desktopParams}")`]
  }
  if (title.includes('Gaia')) {
    return [`url("${imageUrl}/gaia-mobile.png${mobileParams}")`, `url("${imageUrl}/gaia-desktop.png${desktopParams}")`]
  }
  if (title.includes('IPFS')) {
    return [`url("${imageUrl}/ipfs-mobile.png${mobileParams}")`, `url("${imageUrl}/ipfs-desktop.png${desktopParams}")`]
  }
  if (title.includes('Steem')) {
    return [
      `url("${imageUrl}/steem-mobile.png${mobileParams}")`,
      `url("${imageUrl}/steem-desktop.png${desktopParams}")`
    ]
  }
  if (title === 'none') {
    return [null, null]
  }
  return [null, null]
}
export { slugify, dedupe, background }
