import React from 'react';
import sortBy from 'lodash/sortBy';
import Link from 'next/link';
import { connect } from 'react-redux';
import { StyledFeatured } from '@components/featured';
import { colorHexFromString, appRoute } from '@utils';

import { selectApps } from '@stores/apps/selectors';

class FeaturedContainer extends React.Component {
  getFeaturedApps = (featured, apps) =>
    apps.length ? apps.filter(app => featured.includes(app.name)) : null;

  constructor(props) {
    super(props);

    const featuredApps = sortBy(
      this.getFeaturedApps(props.featured, props.apps),
      app => props.featured.indexOf(app.name)
    );

    this.state = {
      featuredApps,
    };
  }

  render() {
    const { right, ...rest } = this.props;
    const appImage = app => {
      if (app.imageUrl) {
        return <StyledFeatured.IconImage src={app.imageUrl} />;
      }
      const bgColor = colorHexFromString(app.name);
      return (
        <StyledFeatured.DefaultIcon bgColor={bgColor}>
          {app.name.substring(0, 1)}
        </StyledFeatured.DefaultIcon>
      );
    };

    return (
      <StyledFeatured {...rest}>
        <StyledFeatured.Wrapper>
          {!right && (
            <StyledFeatured.TitleSection>
              Hot Social Dapps <br />
              <p>
                Our curated list of notable Dapps changing the way we
                communicate.
              </p>
            </StyledFeatured.TitleSection>
          )}
          <StyledFeatured.Section>
            {this.state.featuredApps.map(app => (
              <Link href={appRoute(app)} key={app.id}>
                <StyledFeatured.Item key={app.id}>
                  <StyledFeatured.Icon>{appImage(app)}</StyledFeatured.Icon>
                  <div>
                    <StyledFeatured.Name>
                      <StyledFeatured.NameLink href={appRoute(app)}>
                        {app.name}
                      </StyledFeatured.NameLink>
                    </StyledFeatured.Name>

                    <StyledFeatured.Description>
                      {app.description}
                    </StyledFeatured.Description>
                  </div>
                </StyledFeatured.Item>
              </Link>
            ))}
          </StyledFeatured.Section>
          {right && (
            <StyledFeatured.TitleSection>
              Business Tools
              <br />
              <p>Decentralize your workplace.</p>
            </StyledFeatured.TitleSection>
          )}
        </StyledFeatured.Wrapper>
      </StyledFeatured>
    );
  }
}
const mapStateToProps = state => ({
  apps: selectApps(state),
});
const Featured = connect(mapStateToProps)(FeaturedContainer);

export { Featured };
