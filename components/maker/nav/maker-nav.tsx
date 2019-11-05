import React from 'react'
import styled from 'styled-components'
import { Box, Flex, Text } from '@blockstack/ui'
import { userSession } from '@stores/user'

import { MakerNavContainer } from './nav-layout'
import { Arrow } from '@components/arrow'

const SelectBox = styled(Box)`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  padding: 0;
  width: auto;
  &:focus {
    outline: 0;
  }
`

interface AppSelectProps {
  selectedValue?: number
  onChange?(e: any): void
  apps?: any[]
}

const AppSelect = ({ selectedValue, onChange, apps = [] }: AppSelectProps) => (
  <Flex alignItems="center">
    <Box>
      <Flex>
        <Box mt="2px" mx={2}>
          <img width="16px" height="16px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEsklEQVRYCb1XS09bRxT+Zq7fgHEMpZgq4YY2D1EIKGmjUFXFbKp2Fap0waZS+weq/IPSfxB2XXYTqVG78KIL+gpBIhFEJIKUEEyT+gaS8CgQAwbb2L5TnbkPbOfaqaK4I9nzOGfO982ZM2fmMpSVrg8/jzKuXxRgUQGEOBCiukztP3cFoDEBjTExkzvQRxYmY1rxZGZ11OhgqEF3fSMgLltjtagZ2JVdnv9WuxFLkn1JgMDrdWUMQG8tQB1szqR4YYBIcBLSyv9HcILsNTHBeqNDal7PJRxY1n5IZwM8r2druudVV8ELgxyC91RVqqGQg/dzxqHWEKOq6QIQcglRnUBTm4pIx2n460MIhlshAOxsriJQH4K/IQSXxydBUlur2N5cw5r2ACuJharAlpByDOv66BLZdCyn3o/i5LkBCAEIISS4VKR+0Qx5lpl5phlDJpXE4p0xLC/MFGk5N13Ow0CwOYITZweg6wYwkaBCRAg+EvZj6IOjsj396DkmFjYhwMAg4KtrRE//Z9JL8ekblSDkeEUCbo/XXrVcveUBk8iX/e24N30L4+PjUFUVXt97yBwUjNzGGDHFiXMDcHt9mLs5WpGETERO0v3dpHSzDS63AdAFUBACfo8CTdMwPDyMRCKBUMBTqm96S+3qw9tnLjhByLGKBNK7SWTTe9ILBGr8hOEVAVydWMabvZ/gux//wKdffI2nW/tmrJjxYnqMHGZ5womF0tLeOewkaO3ohOJyoy70hhRTJFhxQANrySweru5hIxfA3NKOFYGyph1g9CdjAtKOXshj81nJRSjtVoyBY53nobhcWEnMo/noSWT3d6WL6TgWE6G2ueVYfjCFpftTIO8Fm1px9uMhBBpC8sbr6O7DokNAOm6B2+NDU6QdweY2hCMqtteX4fHXy1xQDF7sucXbvyI++YsEp3HKFVM/f498NiPVKBiJTHlxJNDQ1GrruX0BHImo4EpFZ2Hl4SyW70/Zc6wGeSKdkte+HJK7YgnN2pFAsPmQgLGThptpTrkR6v/zOF5m9rBrZUois7dzSMbScFwWbQEVAjeOvdGy+uUkdrfWLHsl9fHuCwgEjRhY1ZzTsyMBCiAL3gYTDIJRrpM5xiaYz2Vl6i1GpjviTHQQzRFVngPahvg0PbheLI4ECNQANjLa2lIcj+cmkT/I4ti759H2Dr3cyDcM3GZ4aDwYbgE3j+LmSgKzYzHkzGA81DJajgTmb40i3KrC5fVhZ2MVd0ev2vP+XH+CXCYNtbtPeoN7vfDWNSC989zW2XjyNwKNYcRvX8fWCp19e0W2jtVwMSBZ/Owu5LLY3niGu79fQ2PLW3j61z3ks2mprwtd1o/uXIfQ83B7/chl08hn9nGQ2bNsSv345G9G33QnYxxcUaC4PLYeNVh3/6XEy94EJTNeY4e+GbgQePFsvEaQaqaY0DUO6OPVlGoqY5jl0JVYTUGqGM8fiCvK+tK81tJ++gjAKl/aVYy8ukgfmb8Z+0Gm4hQXdCW//AH36mjlM2dMTCgkSWoLmcDxU9c8Av7ae0IfSXH9q5KP02J6xqda9jIEegTjKkP1Z3vx3PI25RgdSFItg11XYnMTP5W8Uv8FQ2PkiaAJAUMAAAAASUVORK5CYII=" />
        </Box>
        <Flex alignItems="center">
          {apps.length && (
            <select value={selectedValue} onChange={onChange}>
              {apps.map(({ name, id }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          )}
          <SelectBox as="select" onChange={onChange}>

          </SelectBox>
          {apps.length > 1 && <Arrow direction="down" />}
        </Flex>
      </Flex>
    </Box>
  </Flex>
)


interface MakerNavActionsProps {
  userId: string
  appName?: string
  apps?: {
    name: string
    value: number
  }[]
}

const MakerNavActions = ({ apps, userId, appName }: MakerNavActionsProps) => {
  const User = () => <Text fontSize={0}>{userId}</Text>
  return (
    <Flex alignItems="center">
      <Box textAlign="right" mr={3}>
        <User />
      </Box>
      <Box textAlign="right" mr={1}>
        <Text onClick={() => userSession.signUserOut('/')} as="a" fontSize={0} fontWeight="medium" color="blue.900">Sign out</Text>
      </Box>
    </Flex>
  )
}

interface MakerNavProps {
  apps: any[]
  userId: string
  onChange?(e: Event): void
}

export const MakerNav = ({ apps, userId, onChange }: MakerNavProps) => {
  return (
    <MakerNavContainer>

      <AppSelect apps={apps} onChange={onChange} selectedValue={28} />
      <MakerNavActions appName="klsdflksdf" userId={userId} />

    </MakerNavContainer>
  )
}
