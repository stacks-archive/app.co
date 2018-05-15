import React from 'react';

import { StyledFeatured } from '@components/featured';
import { StyledAppList } from '@components/app-list';

class Featured extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      featuredApps: this.getFeaturedApps(props.featured, props.apps)
    };
  }

  getFeaturedApps(featured, apps) {
    return apps.filter(app => featured.includes(app.id))
  }

  goToApp(website) {
    window.open(website, "_blank")
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
          <StyledFeatured.TitleSection>
            Social Dapps People Are Talking About
          </StyledFeatured.TitleSection>
          <StyledFeatured.Section>
            {this.state.featuredApps.map(app => (
              <StyledFeatured.Item key={app.id} onClick={() => this.goToApp(app.website)}>
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
            ))}
          </StyledFeatured.Section>
        </StyledFeatured.Wrapper>
      </StyledFeatured>
    );
  }
}

export { Featured };
