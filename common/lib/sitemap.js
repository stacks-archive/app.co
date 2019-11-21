const { getApps } = require('./api');
const slugify = require('./slugify');

const getUrlsWrapper = () => {
  const getUrls = async () => {
    const appsData = await getApps();

    const urls = ['/all', '/platforms', '/categories', '/faq', '/submit'];
    appsData.categories.forEach(category => {
      urls.push(`/categories/${slugify(category)}`);
    });
    appsData.platforms.forEach(platform => {
      urls.push(`/${slugify(platform)}`);
    });
    appsData.apps.forEach(app => {
      urls.push(`/app/${app.Slugs[0].value}`);
    });
    return urls;
  };

  return getUrls;
};

module.exports = getUrlsWrapper;
