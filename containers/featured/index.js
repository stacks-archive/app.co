import React from 'react';
import sortBy from 'lodash/sortBy';
import Link from 'next/link';

import { StyledFeatured } from '@components/featured';
import { StyledAppList } from '@components/app-list';
import { colorHexFromString, appRoute } from '@utils';

class Featured extends React.Component {
  constructor(props) {
    super(props);

    const featuredApps = sortBy(this.getFeaturedApps(props.featured, props.apps), (app) =>
      props.featured.indexOf(app.name),
    );

    this.state = {
      featuredApps,
    };
  }

  getFeaturedApps(featured, apps) {
    return apps.filter((app) => featured.includes(app.name));
  }

  render() {
    const appImage = (app) => {
      if (app.imageUrl) {
        return <StyledFeatured.IconImage src={app.imageUrl} />;
      }
      const bgColor = colorHexFromString(app.name);
      return <StyledFeatured.DefaultIcon bgColor={bgColor}>{app.name.substring(0, 1)}</StyledFeatured.DefaultIcon>;
    };

    return (
      <StyledFeatured>
        <StyledFeatured.Wrapper>
          {!this.props.right && (
            <StyledFeatured.TitleSection>
              Hot Social Dapps <br />
              <p>Our curated list of notable Dapps changing the way we communicate.</p>
            </StyledFeatured.TitleSection>
          )}
          <StyledFeatured.Section>
            {this.state.featuredApps.map((app) => (
              <Link href={appRoute(app)}>
                <StyledFeatured.Item key={app.id}>
                  <StyledFeatured.Icon>{appImage(app)}</StyledFeatured.Icon>
                  <div>
                    <StyledFeatured.Name>
                      <StyledFeatured.NameLink href={app.website} target="_blank">
                        {app.name}
                      </StyledFeatured.NameLink>
                    </StyledFeatured.Name>

                    <StyledFeatured.Description>{app.description}</StyledFeatured.Description>
                  </div>
                </StyledFeatured.Item>
              </Link>
            ))}
          </StyledFeatured.Section>
          {this.props.right && (
            <StyledFeatured.TitleSection>
              Business Tools<br />
              <p>Decentralize your workplace.</p>
            </StyledFeatured.TitleSection>
          )}
        </StyledFeatured.Wrapper>
      </StyledFeatured>
    );
  }
}

export { Featured };
