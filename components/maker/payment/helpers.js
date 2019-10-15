import { address, networks } from 'bitcoinjs-lib'
import * as c32Check from 'c32check'
import memoize from 'lodash/memoize'

export const validateBTC = memoize(addr => {
  try {
    address.toOutputScript(addr, networks.bitcoin)
    return true
  } catch (error) {
    return false
  }
})

export const validateSTX = memoize(addr => {
  try {
    c32Check.c32addressDecode(addr)
    return true
  } catch (error) {
    return false
  }
})

export const savePaymentDetails = async ({ apiServer, appId, jwt, btcAddress, stxAddress }) => {
  const response = await fetch(`${apiServer}/api/maker/apps?appId=${appId}`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      authorization: `Bearer ${jwt}`
    }),
    body: JSON.stringify({
      BTCAddress: btcAddress,
      stacksAddress: stxAddress
    })
  })
  await response.json()
}
