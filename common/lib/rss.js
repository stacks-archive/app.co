const RSS = require('rss')
const _ = require('lodash')

const makeFeed = (apps) => {
  const feed = new RSS({
    title: 'App.co Recent Apps',
    feed_url: 'https://app.co/rss',
    site_url: 'https://app.co'
  })

  const sorted = _.sortBy(apps, (app) => -new Date(app.createdAt).getTime())
  sorted.forEach((app) => {
    const slug = app.Slugs[0]
    feed.item({
      title: app.name,
      description: app.description,
      url: `https://app.co/app/${slug ? slug.value : app.id}`,
      guid: app.id,
      date: app.createdAt,
      custom_elements: [
        {
          'media:content': {
            _attr: {
              url: app.imageUrl,
              medium: 'image'
            }
          }
        }
      ]
    })
  })

  return feed
}

module.exports = {
  makeFeed
}
