import React from 'react';
import { Flex, Box, Type } from 'blockstack-ui';
import { Hover, State } from 'react-powerplug';
import { Title, Wrapper, ObservedSection } from '@components/mining/shared';
import { ArrowIcon } from '@components/mining/svg';

import dayjs from 'dayjs';
import numeral from 'numeral';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';

const Pill = ({ display, ...rest }) => (
  <Box
    mr={2}
    py="6px"
    borderRadius={30}
    px="12px"
    bg="#E4ECF1"
    display={display}
  >
    <Type {...rest} fontSize="11px" opacity={0.75} />
  </Box>
);

const Row = ({
  name,
  index,
  imgixImageUrl,
  formattedUsdRewards,
  storageNetwork,
  authentication,
  lifetimeEarnings,
  ...rest
}) => (
  <Hover>
    {({ hovered, bind }) => (
      <Flex
        mb="1px"
        py={5}
        bg="white"
        borderLeft="3px solid"
        borderColor={hovered ? 'blue' : 'transparent'}
        is="a"
        transition="0.1s all ease-in-out"
        href={
          rest.Slugs && rest.Slugs.length
            ? `https://app.co/app/${rest.Slugs[0].value}`
            : undefined
        }
        target="_blank"
        style={{ textDecoration: 'none' }}
        {...bind}
      >
        <Flex width={[40, 60]} alignItems="center" justifyContent="center">
          <Type fontFamily="brand">{index + 1}</Type>
        </Flex>
        <Flex
          width={5 / 8}
          alignItems={['flex-start', 'flex-start', 'flex-start', 'center']}
          flexDirection={['column', 'column', 'column', 'row']}
        >
          <Flex alignItems="center">
            <Box
              size={[24]}
              backgroundImage={`url(${imgixImageUrl})`}
              backgroundSize="cover"
              boxShadow="card"
              borderRadius={4}
            />
            <Type ml={4} fontSize={2} fontWeight={400} color="blue.dark">
              {name}
            </Type>
          </Flex>
          <Flex
            display={
              authentication === 'Blockstack' || storageNetwork === 'Gaia'
                ? 'flex'
                : 'none'
            }
            alignItems="center"
            pt={[3, 3, 3, 0]}
            pl={[0, 0, 0, 3]}
          >
            {authentication === 'Blockstack' ? (
              <Pill display={['none', 'none', 'flex']}>Blockstack Auth</Pill>
            ) : null}
            {storageNetwork === 'Gaia' ? (
              <Pill display={['none', 'none', 'flex']}>Gaia</Pill>
            ) : null}
          </Flex>
        </Flex>
        <Flex width={[2 / 3, 2 / 3, 3 / 8]} ml="auto" alignItems="center">
          <Flex
            justifyContent={['flex-end', 'center']}
            textAlign="center"
            width={[1, 1 / 2]}
            pr={6}
          >
            <Type fontFamily="brand" color="blue">
              {formattedUsdRewards.split('.')[0]}
            </Type>
          </Flex>
          <Flex
            justifyContent="flex-end"
            textAlign="right"
            width={1 / 2}
            pr={5}
            display={['none', 'flex']}
          >
            <Type fontFamily="brand" color="blue">
              {lifetimeEarnings
                ? numeral(String(lifetimeEarnings).split('.')[0]).format('$0,0')
                : '--'}
            </Type>
          </Flex>
        </Flex>
      </Flex>
    )}
  </Hover>
);

const ArrowButton = ({ disabled, icon: Icon, ...rest }) => (
  <Hover>
    {({ hovered, bind }) => (
      <Box
        {...bind}
        cursor={hovered && !disabled ? 'pointer' : 'unset'}
        pt={1}
        px={2}
        opacity={disabled ? '0.25' : 1}
        color={hovered && !disabled ? 'blue' : undefined}
        display={['block', 'none']}
        {...rest}
      >
        <Icon size={16} />
      </Box>
    )}
  </Hover>
);

const Table = ({
  apps,
  state,
  limit = 7,
  months,
  decrementMonth,
  incrementMonth,
  ...rest
}) => (
  <Box width={1}>
    <Flex fontWeight="bold" mb="1px" py={5} bg="white">
      <Type width={[1 / 3, 5 / 8]} pl={5}>
        <Type display={['none', 'inline']}>App Mining</Type> Rank
      </Type>
      <Flex
        style={{ userSelect: 'none' }}
        width={[2 / 3, 2 / 3, 3 / 8]}
        ml="auto"
        alignItems="center"
      >
        <Flex
          alignItems="center"
          justifyContent={['flex-end', 'center']}
          textAlign="center"
          width={[1, 1 / 2]}
        >
          <ArrowButton
            icon={ChevronLeftIcon}
            onClick={decrementMonth}
            pt={1}
            px={2}
            disabled={state.month === 0}
          />
          <Type style={{ whiteSpace: 'nowrap' }}>Payout</Type>
          <ArrowButton
            icon={ChevronRightIcon}
            onClick={incrementMonth}
            disabled={state.month === months.length - 1}
          />
        </Flex>
        <Flex
          justifyContent="flex-end"
          textAlign="right"
          width={1 / 2}
          display={['none', 'flex']}
          pr={5}
        >
          <Type style={{ whiteSpace: 'nowrap' }}>Lifetime</Type>
        </Flex>
      </Flex>
    </Flex>
    <>
      {apps.map((app, i) =>
        state.all ? (
          <Row key={i} index={i} {...app} />
        ) : i < limit ? (
          <Row key={i} index={i} {...app} />
        ) : null
      )}
    </>
  </Box>
);

const HowMuchSection = ({ apps, months, ...rest }) => (
  <ObservedSection minHeight="unset" bg="blue.light" {...rest}>
    {({ inView }) => (
      <Wrapper inView={inView} observed>
        <Flex
          width={[1]}
          flexShrink={0}
          justifyContent="center"
          flexDirection="column"
        >
          <Title mx="auto" maxWidth="100%" textAlign="center">
            Past Earnings
          </Title>
          <Flex
            mt={6}
            width={1}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <State
              initial={{
                all: false,
                showMenu: false,
                month: months.length - 1,
              }}
            >
              {({ state, setState }) => {
                const decrementMonth = () => {
                  if (state.month !== 0) {
                    setState(s => ({
                      month: s.month - 1,
                    }));
                  }
                };
                const incrementMonth = () => {
                  if (state.month < months.length - 1) {
                    setState(s => ({
                      month: s.month + 1,
                    }));
                  }
                };

                const setMonth = index => setState({ month: index });

                return (
                  <Box width={1}>
                    <Box display={['none', 'block']} width={[1]}>
                      <Flex
                        flexWrap="wrap"
                        justifyContent="center"
                        flexDirection="row"
                        flexGrow={1}
                        pb={6}
                      >
                        {months.map((month, i) => (
                          <Hover>
                            {({ hovered, bind }) => (
                              <Box
                                mx={2}
                                mb={2}
                                textAlign={['center']}
                                bg={
                                  state.month === i
                                    ? 'blue.dark'
                                    : hovered
                                    ? 'blue'
                                    : 'blue.mid'
                                }
                                color={
                                  state.month === i
                                    ? 'white'
                                    : hovered
                                    ? 'white'
                                    : 'blue.dark'
                                }
                                borderColor={
                                  i === state.month
                                    ? 'blue'
                                    : hovered
                                    ? 'blue.mid'
                                    : 'transparent'
                                }
                                py={2}
                                px={4}
                                key={i}
                                borderRadius="20px"
                                cursor={hovered ? 'pointer' : 'unset'}
                                onClick={() => setMonth(i)}
                                transition="0.1s all ease-in-out"
                                {...bind}
                              >
                                <Type
                                  fontWeight={600}
                                  lineHeight={0.9}
                                  pb="4px"
                                  opacity={
                                    hovered || i === state.month ? 1 : 0.7
                                  }
                                  fontSize={1}
                                >
                                  {`${month.monthName.slice(
                                    0,
                                    3
                                  )} ${month.year.toString().slice(2)}`}
                                </Type>
                              </Box>
                            )}
                          </Hover>
                        ))}
                      </Flex>
                    </Box>

                    <Box order={[2, 1]} flexGrow={1}>
                      <Table
                        limit={8}
                        state={state}
                        months={months}
                        apps={months[state.month].apps}
                        decrementMonth={decrementMonth}
                        incrementMonth={incrementMonth}
                      />
                      <Box pt={6}>
                        <Hover>
                          {({ hovered, bind }) => (
                            <Flex
                              is="a"
                              target="_blank"
                              href={`/mining/${dayjs(
                                `${months[state.month].monthName} ${months[
                                  state.month
                                ].year.toString()}`
                              )
                                .format('MMMM-YYYY')
                                .toLowerCase()}`}
                              position="static"
                              hoverColor="blue"
                              textAlign="center"
                              width={1}
                              alignItems="center"
                              justifyContent="center"
                              fontFamily="brand"
                              style={{
                                textDecoration: 'none',
                              }}
                              {...bind}
                            >
                              <Type
                                color={hovered ? 'blue' : 'blue.dark'}
                                pr={2}
                              >
                                See Full Report
                              </Type>
                              <ArrowIcon
                                color={hovered ? 'blue' : 'blue.dark'}
                                width="25px"
                              />
                            </Flex>
                          )}
                        </Hover>
                      </Box>
                    </Box>
                  </Box>
                );
              }}
            </State>
          </Flex>
        </Flex>
      </Wrapper>
    )}
  </ObservedSection>
);

export { HowMuchSection };
