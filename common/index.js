import slugify from './lib/slugify'

function dedupe(a) {
  return Array.from(new Set(a))
}
const background = (title) => {
  if (!title) return 'url("https://files-cazqqisedw.now.sh/blockstack_platforms-13.png")'

  if (title.includes('lockstack')) {
    return 'url("https://files-jkbhagqrri.now.sh/blockstack.png")'
  }
  if (title === 'g1') {
    return 'url("https://files-cazqqisedw.now.sh/blockstack_platforms-12.png")'
  }
  if (title === 'g2') {
    return 'url("https://files-cazqqisedw.now.sh/blockstack_platforms-13.png")'
  }
  if (title === 'g3') {
    return 'url("https://files-cazqqisedw.now.sh/blockstack_platforms-14.png")'
  }
  if (title === 'g4') {
    return 'url("https://files-cazqqisedw.now.sh/blockstack_platforms-15.png")'
  }
  if (title.includes('EOS')) {
    return 'url("https://files-jkbhagqrri.now.sh/eos.png")'
  }
  if (title.includes('thereum')) {
    return 'url("https://files-jkbhagqrri.now.sh/ethereum.png")'
  }
  if (title.includes('Gaia')) {
    return 'url("https://files-jkbhagqrri.now.sh/gaia.png")'
  }
  if (title.includes('IPFS')) {
    return 'url("https://files-jkbhagqrri.now.sh/ipfs.png")'
  }
  if (title.includes('Steem')) {
    return 'url("https://files-jkbhagqrri.now.sh/steem.png")'
  }
  return 'url("https://files-cazqqisedw.now.sh/blockstack_platforms-14.png")'
}
export { slugify, dedupe, background }
