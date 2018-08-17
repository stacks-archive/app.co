import slugify from './lib/slugify'

function dedupe(a) {
  return Array.from(new Set(a))
}
const background = (title) => {
  if (!title)
    return [
      'url("https://files-qxpmkijgff.now.sh/blockstack_platforms-13.png")',
      'url("https://files-qxpmkijgff.now.sh/blockstack_platforms-13.png")'
    ]

  if (title.includes('lockstack')) {
    return [
      'url("https://files-qxpmkijgff.now.sh/blockstack_platforms-22.png")',
      'url("https://files-qxpmkijgff.now.sh/blockstack.png")'
    ]
  }
  if (title === 'g1') {
    return [
      'url("https://files-qxpmkijgff.now.sh/blockstack_platforms-12.png")',
      'url("https://files-qxpmkijgff.now.sh/blockstack_platforms-12.png")'
    ]
  }
  if (title === 'g2') {
    return [
      'url("https://files-qxpmkijgff.now.sh/blockstack_platforms-13.png")',
      'url("https://files-qxpmkijgff.now.sh/blockstack_platforms-13.png")'
    ]
  }
  if (title === 'g3') {
    return [
      'url("https://files-qxpmkijgff.now.sh/blockstack_platforms-14.png")',
      'url("https://files-qxpmkijgff.now.sh/blockstack_platforms-14.png")'
    ]
  }
  if (title === 'g4') {
    return [
      'url("https://files-qxpmkijgff.now.sh/blockstack_platforms-15.png")',
      'url("https://files-qxpmkijgff.now.sh/blockstack_platforms-15.png")'
    ]
  }
  if (title.includes('EOS')) {
    return [
      'url("https://files-qxpmkijgff.now.sh/blockstack_platforms-20.png")',
      'url("https://files-qxpmkijgff.now.sh/eos.png")'
    ]
  }
  if (title.includes('thereum')) {
    return [
      'url("https://files-qxpmkijgff.now.sh/blockstack_platforms-21.png")',
      'url("https://files-qxpmkijgff.now.sh/ethereum.png")'
    ]
  }
  if (title.includes('Gaia')) {
    return [
      'url("https://files-qxpmkijgff.now.sh/blockstack_platforms-25.png")',
      'url("https://files-qxpmkijgff.now.sh/gaia.png")'
    ]
  }
  if (title.includes('IPFS')) {
    return [
      'url("https://files-qxpmkijgff.now.sh/blockstack_platforms-23.png")',
      'url("https://files-qxpmkijgff.now.sh/ipfs.png")'
    ]
  }
  if (title.includes('Steem')) {
    return [
      'url("https://files-qxpmkijgff.now.sh/blockstack_platforms-24.png")',
      'url("https://files-qxpmkijgff.now.sh/steem.png")'
    ]
  }
  if (title === 'none') {
    return [null, null]
  }
  return [null, null]
}
export { slugify, dedupe, background }
