import React from 'react'
import { Page } from '@containers/page'
import { Header } from '@containers/header'
import { Hero } from '@containers/hero'
import Head from '@containers/head'

export default ({ data }) => (
  <div>
    <Head />
    <Header data={data} />
    <Hero />

    <Page.Section wrap={1}>
      <Page.Section.Content>
        <h1>Frequently Asked Questions</h1>

        <br />
        <br />

        <h2 id="whats-a-dapp">What's a Dapp?</h2>

        <p>
          A dapp is a decentralized app—an application that lets users own their data and runs without any single
          centralized operator.
        </p>

        <p>
          If you use traditional apps, your digital rights, privacy, and choices are severely limited. These app
          ecosystems serve to enrich a small number of powerful corporations by centralizing user identities and data
          storage.
        </p>

        <p>
          Decentralized apps offer a solution based on blockchain technology. Dapps link developers and users directly,
          without middlemen hosting software or managing user data. These customer-developer networks are more
          transparent, equitable, and resilient than traditional apps—with all parties incentivized to treat each other
          well as they rapidly innovate.
        </p>

        <p>
          Today there are thousands of dapps built on protocols like Ethereum, Blockstack, and many others. While
          definitions are rapidly evolving, here are some criteria aligned with the future:
        </p>

        <ul>
          <li>Do customers own their network identity? Can anyone else revoke that identity?</li>
          <li>Is customer data encrypted? Can anyone else decrypt that user data?</li>
          <li>Is customer data stored on decentralized networks with reconfigurable APIs?</li>
          <li>Is the app open source? Can community members contribute or fork the software?</li>
          <li>Is the app publishable and hostable by others or only a single company?</li>
          <li>Is the app running client-side or on a server?</li>
          <li>Does the app limit or clearly communicate the scope of data logging?</li>
        </ul>

        <br />
        <br />

        <h2 id="about">About app.co</h2>
        <p>
          App.co surfaces the best new dapps every day. It’s a place for blockchain-loving nerds, enthusiasts, and
          investors to geek out over the latest decentralized tech—from currency exchanges to
          mutant-feline-marketplaces.
        </p>

        <p>
          App.co is sponsored by{' '}
          <a href="https://blockstack.org" target="_blank">
            Blockstack
          </a>, a decentralized app protocol and community. All protocols are welcome on App.co as we’re committed to
          celebrating an open, decentralized internet for all.
        </p>

        <p>
          Blockstack is the easiest way to start building decentralized, blockchain-based dapps. Our APIs provide
          decentralized storage, password-less auth, and a scalable foundation for your dapps. And, Blockstack let’s you
          decouple the personal data you create, from the dapps you use, which makes you the sole owner of that data.
        </p>

        <br />
        <br />
        <h2 id="rankings">Rankings on app.co</h2>
        <p>
          If you've been browsing the dapps on app.co, you'll notice they are sorted by something we call 'Tweets/Week'.
          This measure will be evolving over time, but for now, we wanted to give you a little insight into exactly how
          it works.
        </p>

        <p>
          For right now, there are two pieces we add together that make up the Tweets/Week number you see in the
          right-hand column (which determines rank on the page):
        </p>

        <ul>
          <li>The number of tweets that contain the URL of the project</li>
          <li>The number of tweets that mention the handle of the project</li>
        </ul>

        <p>
          We run a query on Twitter for this information every day at 12am EST to collect information on the last 7
          days.
        </p>

        <p>
          Here's a quick example: A project's handle, such as @graphitedocs might have been mentioned in 100 tweets. On
          top of that, the URL to their site (https://www.graphitedocs.com/) was found in 900 tweets. Their number for
          Tweets/Week then, would be 1000.
        </p>

        <p>
          Note: If a tweet mentions the handle of the project and has the URL, it only counts once. We'll also be
          introducing logic shortly to eliminate self mentions i.e. the project's handle tweeting it's own URL will not
          count.
        </p>

        <p>
          Bigger picture, we'll be looking to add additional parameters to the rank or offering additional ranking
          options entirely. For example, the next push will likely be ranking based on traffic to the project's website
          (based on data from Similar Web). Another example may be sorting by upvotes or other forms of your input.
        </p>

        <p>
          We're also working on a program where the dapp creators can give us verified data on their Monthly and Daily
          Active User counts so you'll be able to sort by that information eventually as well (assuming our pilot with
          it goes well and is sustainable and accurate).
        </p>

        <p>
          We'll keep this post updated as ranking logic is tweaked or other sorting options are introduced. Let us know
          what you'd like to see or if you have any questions!
        </p>
      </Page.Section.Content>
    </Page.Section>
  </div>
)
