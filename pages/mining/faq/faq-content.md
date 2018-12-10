import {Box} from 'blockstack-ui'

## What is App Mining?

App Mining is a system where the Blockstack community funds decentralized app teams simply for being pioneers in our ecosystem. Each month, qualifying apps compete to be ranked by expert App Reviewers—the better your app, the higher payout you earn. We believe App Mining represents a revolution in app funding, allowing small teams to bootstrap without advertising or venture capital.

We currently pay these rewards in bitcoin. The payouts are currently administered by Blockstack PBC and facilitated by App.co.

Lastly, App Mining is an experiment—we are tweaking this new mining model and we look forward to feedback from our community.

## What is Blockstack?

Blockstack is the easiest way to start building decentralized, blockchain-based apps. We provide a complete decentralized application stack, powered by the Stacks blockchain, and maintained by a community of 7000 developers. Blockstack is committed to building a new internet where users fundamental digital rights, such as security, privacy, anti-censorship, are always respected.

## App Mining vs. cryptocurrency mining?

Traditionally the term ‘mining’ in cryptocurrency refers to the process of contributing compute resources to the network and earning a distributed of new tokens as a reward. On the Stacks blockchain, developers can “mine” by contributing apps to the ecosystem and making applications the community wants.

## How much can I earn? How are payouts distributed?

Payouts for the Pilot Run beginning December 1st 2018 are planned to be $100k in total each month, paid in Bitcoin. The highest-ranked app receives 20% of the total, the next highest-ranked app receives 20% of the remaining 80%, and so on (this distribution is subject to change).
Payments are distributed by Blockstack PBC. In the future, we intend to decentralize this process further. This would likely mean app teams would be paid in tokens issued programmatically by the Stacks Blockchain.
In Oct 2018, we also ran an App Mining Alpha with 22 Blockstack apps with a total payout of $25K.

## How can I start earning App Mining payouts?

To start the registration for App Mining, go to [App.co/mining](http://app.co/mining)
You’ll need to add Blockstack Auth as a login option for your app. In the future, App Mining may reward apps that have taken steps to further decentralize, such as utilizing Gaia storage or the publishing your app to the Blockstack Naming System.

## Does my code repository need to be public?

In short, no. Your application code can be public or private. 

## Is Blockstack Auth difficult to integrate?

If you’re already building your app with JavaScript, adding Blockstack authentication is easy! We have [docs](https://docs.blockstack.org/), [tutorials](https://docs.blockstack.org/browser/hello-blockstack.html), and thorough [API references](https://blockstack.github.io/blockstack.js/) for you to learn from. In short, you can do everything with a few lines of code:

<Box maxWidth={['100%', '85%']}>

![Blockstack Auth](https://file-tgqfjagvbk.now.sh/)

</Box>

If you’re developing a traditional server-side application, you can still take advantage of Blockstack authentication. For an example, check out our [Ruby on Rails gem](https://github.com/blockstack/blockstack-ruby).

## What are App Reviewers?

Apps are ranked by App Reviewers. Typically these are entities that have proprietary methodology that helps them make objective judgements for why a certain app might be better than others.
Our intention is to engage a diverse coalition of App Reviewers, which will make app ranking objective and resilient to abuse. App Reviewers are currently selected by Blockstack PBC, however as App Mining grows, a more democratic process will need to be put in place, such as community election.

At the time of our App Mining Alpha, the App Reviewers were: Product Hunt and Democracy Earth (who uses software to collect votes by Stacks token holders).

## How are Apps Ranked?

Apps are ranked by App Reviewers. Typically these are entities that have some proprietary methodology that helps them make objective judgements for why one app might be better than another. For example, Product Hunt can tap into their community data to determine relative app popularity. Each App Reviewer determines the data, formula and personnel they wish to utilize. Reviewers are required to periodically publish their methodology to ensure transparency.

We've published a [detailed explanation of our ranking algorithm](https://blog.app.co/how-app-minings-ranking-algorithm-works/) on our blog, where you can learn more.

## How will App Mining evolve overtime?

All plans listed below are subject to change, legal approval, and applicable law.

**App Mining Alpha Test Run (Sept. 24-Oct. 16, 2018)**

Apps registered by 9/24 qualified<br />
App Reviewers results by end of day 10/11<br />
Winners announced on or after 10/17 to registered apps and general public<br />
$25,000 total in BTC payouts across registered apps<br />

**App Mining Pilot Run (Nov. 30, 2018-Feb. 29, 2019)**

Official program announcement 10/16<br />
Apps register by 11/30<br />
App review occurs on a monthly basis from December through February<br />
First month’s App review period occurs from 12/1-12/15, and follows for each month’s subsequent review period<br />
$100,000 total in BTC payouts paid out monthly across registered apps<br />

**App Mining Stage 1 (March 2019 - 2020)**

Subject to applicable regulation, payouts will be issued in Stacks and denominated in USD<br />
Amount of regular rewards to be determined and subject to applicable law<br />

**App Mining Stage 2 (2020)**

Begin shift to community elections of App Reviewers<br />
Anticipated to begin shifting to payouts via Stacks blockchain<br />
Begin shift to App Reviewer submissions to the Stacks blockchain<br />
Amount of monthly rewards to be determined and subject to applicable law<br />

## Is App Mining Decentralized?

Given the pioneering nature of the program, we are being careful and starting in a centralized fashion that allows for necessary diligence. We don’t want to bake in assumptions that have not been validated. The downside of this protection is some level of centralization, which we are taking steps to reduce over time. This is the just the first step in creating a fair system that can be relied upon by founders and contribute to the growth of the Blockstack ecosystem.

Blockstack plans to move along a [path to decentralization](https://blockstack.org/blog/a-path-to-decentralization/) and App Mining will too. It is important to highlight that initially App Mining will purposely have a few points of centralization highlighted below, which can become decentralized overtime (_all plans are subject to change, legal approval, and applicable law_).

**Electing app reviewers:**

Currently, Blockstack PBC elects app reviewers. In the future, we anticipate gradually transitioning to community elections of App Reviewers.

**Registering apps:**

Currently, registering apps is regulated by Blockstack PBC through [app.co/mining](http://app.co/mining). In the future, we anticipate transitioning to publishing on designated Blockstack namespaces via our public blockchain.

**Collecting votes:**

Currently, votes are aggregated by Blockstack PBC and administered via App.co.
In the future, we expect that votes will be collected through the protocol itself.

**Issuing money:**

Currently, payouts are issued by Blockstack PBC. In the future, we expect that payouts will over time be generated and deployed on an automated basis.

## How is App Mining protected against bribery, collusion, or gaming?

We are taking potential threats very seriously and hope to create a fair system that continuously reinforces trust within our community for the long term.

We are currently consulting with a team of 3 Ph.D. Game Theorist professors from Princeton University and New York University to determine thoughtful methods to protect App Mining from being attacked and/or abused. Our goal is to be as transparent as possible, but App Reviewers may reserve the right to keep some secrets in their formula to avoid bribes and gaming, and the algorithm that combines all of these score may be tuned in the future to account for new learnings.

The Game Theorists are working with us to create:

1. A technical paper
2. Broader documents like blogs explaining the overall mechanism

<div className="disclaimer">

_This FAQ contains forward-looking statements, including statements regarding Blockstack PBC’s plans for its App Mining program. Forward-looking statements are subject to risks and uncertainties that could cause actual results to differ materially, and reported results should not be considered as an indication of future performance. Potential risks and uncertainties that could change our actual results include, but are not limited to, risks associated with: the failure of App Mining Program to successfully incentivize the development of applications for the Blockstack network; risks associated with attacks designed to influence the App Reviewers or game their methodologies; technical difficulties in the transition from a centralized to a decentralized administration of the program. These forward-looking statements speak only as of the date hereof. Blockstack PBC disclaims any obligation to update these forward-looking statements._

_Any decisions that may be made through the App Mining Program regarding rewards provided to app developers are not recommendations as to the quality of any investments that individuals may make in a company that receives rewards. If you are considering an investment in any of these companies, you should make your own decision regarding that investment and not rely in any way on the results of the App Mining program._

</div>
