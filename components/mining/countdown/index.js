import * as React from 'react';
import { Flex, Type } from 'blockstack-ui';
import Counter from 'react-countdown-now';
import { DateTime } from 'luxon';
import dayjs from 'dayjs';

const TimeLabel = ({ ...rest }) => (
  <Type pl="1px" fontWeight={500} opacity={0.7} {...rest} />
);

const Renderer = ({ hours, minutes, days, seconds, ...rest }) => (
  <Flex flexShrink={0} style={{ whiteSpace: 'nowrap' }} {...rest}>
    <Type fontWeight="bolder">
      {days}
      <TimeLabel>D</TimeLabel>
    </Type>
    &nbsp;:&nbsp;
    <Type fontWeight="bolder">
      {hours}
      <TimeLabel>H</TimeLabel>
    </Type>
    &nbsp;:&nbsp;
    <Type fontWeight="bolder">
      {minutes}
      <TimeLabel>M</TimeLabel>
    </Type>
    &nbsp;:&nbsp;
    <Type fontWeight="bolder">
      {seconds}
      <TimeLabel>S</TimeLabel>
    </Type>
  </Flex>
);

class Countdown extends React.PureComponent {
  getDate = () => {
    // set initial date of jan 4 2019
    let nextDate = DateTime.local(2019, 1, 4, 23, 59, 59).setZone(
      'America/New_York'
    );

    const currentDate = DateTime.local().setZone('America/New_York');
    const { day, month } = currentDate;

    // aside from Jan, we want to have the deadline be the end of the first day of each month.
    if ((month === 1 && day > 4) || month > 1) {
      nextDate = DateTime.local(2019, month + 1, 1, 0, 1).setZone(
        'America/New_York'
      );
    }

    return { nextDate };
  };
  render() {
    const { nextDate } = this.getDate();

    return <>{dayjs(nextDate.ts).format('MMMM DD, YYYY')}</>;
  }
}

export default Countdown;
