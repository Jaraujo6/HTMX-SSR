# HTMX-SSR Template

## Table of Contents

- [Background](#background)
- [Dependencies](#dependencies)
- [Setup](#setup)
- [Conclusion](#conclusion)

If you just want to use this template, skip directly to [setup](#setup). Otherwise, please enjoy some rambling from a bootcamp taught, uber-opinionated Fullstack Engineer.

## Background

Back in the old days, every website was a multi-page application (MPA), more or less conforming to the [serepresentational state transfer](https://codewords.recurse.com/issues/five/what-restful-actually-means) (REST) paradigm, and servers were designed to follow a [Model-View-Component](https://www.tutorialspoint.com/mvc_framework/mvc_framework_introduction.htm) (MVC) framework. What this meant in practice is that every page we visited was rendered on the web server first, then served (SSR) to our broswer to be painted on the screen.

Despite these acronyms coming up from time to time, I didn't learn web-dev using any of those concepts. I'm a client side bootcamp baby. To learn the difference between the two sides (and a third side I guess), here's a good [resource](https://www.toptal.com/front-end/client-side-vs-server-side-pre-rendering).

But from what I've read, while today's single page applications (SPA) excel at providing a flashier user experience, they fail at providing feature parity for things that SSR apps did well, namely smaller app client bundles and reduced business logic complexity. This makes sense to me as some of the latest swings back towards hybrid-SPA/MPA are emphasizing the distinction between server state and client state, as well as increasing time-to-paint metrics. See NextJS and Remix.

HTMX as I understand it, seeks to solve the same problem, but by embracing HTML more strongly rather than leaning in to JavaScript (JS) and building another framework (React, Vue). Instead, the library is designed to use JS to extend the functionality of HTML, such that JS developers such as myself really don't need JS create a good UX. They can still use it if they want to, but JS becomes a scripting language again as intended, so it's more like when we used to use JQuery. An intriguing idea to say the least, so I've built this template repo to jumpstart [hypermedia driven apps](https://htmx.org/essays/hypermedia-driven-applications/) (HDA) becuase nobody has time to do this all from scratch every time (regardless of the template).

## Dependencies

This HDA template is intentionally light weight because according to the research, we really don't need much and tend to over complicate everything anyway. But since there are multiple ways to make these kinds of apps and JS is my bread and butter, I figured why not minimize my surface area of learning by sticking to Node.js servers. To my surprise, there wasn't a lot of documentation around building Node.js-based HTMX apps as the freedom from having to use JS meant that people were more excited to build their servers using Python/Flask and Go. This meant I needed to stitch together the tools myself. Here's what we have.

### HTMX - Our Inspiration

I was inspired to make an HDA because I recently started watching ThePrimagen on YouTube and he always goes on and on about [HTMX](https://htmx.org/). It was a bit over the head, but the benefits he purported actually intrigued me, especially when I heard the creator speak to his motivations in this [interview](https://www.youtube.com/watch?v=LriHRa9t1fQ). My understanding is that HTMX is a JS library that lets you make AJAX requests through custom HTML attributes that can be added to any elements. Those same calls are designed to receive hypermedia (think the H in HTML), which it will use to swap out the current elements, or any other elements you would like. There are other niceties too, but at it's core, it takes some standard webapp stuff that you would normally do via JS or some JS framework, and hides it behind easy to use HTML so that the JS is saved for the really complex stuff. I can get jiggy with that. Now it requires actual HTML files and we'll use a template engine to create those, but more on that [below](#handlebars).

### TypeScript - Our language

People love to say JS is the wild wild west because they normally come from C++/JAVA backgrounds. To be fair, they're right. I took me using [TypeScript](https://www.typescriptlang.org/) (TS) to really understand what they meant. I'll still pick JS over JAVA any day of the week, but TS is a great middle ground as I really appreciate the intellisense. BUT, TS is a pain because the typings aren't always flexible, typing JS libraries is optional and Node doesn't support TS out the box, which makes setup really annoying at times. Case and point: our package manager of choice: Yarn.

### Yarn - Our Package Manager

[Yarn](https://yarnpkg.com/getting-started) for a template like this is overkill, but I like that you don't need to add "run" between all of the `package.json` scripts. In going through the documentation for setting up Yarn, I learned that the real value is setting up multiple workspaces within a monorepo (see NX), and for increasing the stablity of your packages as your app matures. The former is irrelevant to this template, but the latter is nice for any projects that scale from this template, so I ain't mad at all the hoops I had to jump through to get Yarn 4 to work with TS, but wow it was annoying considering how "simple" the docs made it seem. Instead the put all the important parts in it's own [page](https://yarnpkg.com/getting-started/editor-sdks) without linking to this page from the main docs, but that's ok. It's my fault for not reading the docs carefully or thoroughly enough _before_ entering commands. Nonetheless, it works now, and I'll never go through this pain again.

### Fastify - Our Server Library

I like to use up to date libraries. Community support is great and all, but if it's not in active development, it's not for me. Time's change, and so should the libraries we use, as long as those libraries are actually better. Express is most people's go to but for reasons above, I'm over it. [Fastify](https://fastify.dev/) checks all the functionality and UX boxes for me, and does so without embracing decorators and other things that NestJS, Adonis, and all these other Springboot wannabes do. If I want that, I'll use Springboot. Iha'm experienced enough to implement patterns that reflect good practices, and live with the consequences of patterns that I miss or don't get right. Plus it's just a template repo, it will all be fine...

### Handlebars - Our Templating Engine

This was one of the harder selections for me because as someone who didn't build MPAs, how the hell was I supposed to pick from 10 different html engines? I selected [Handlebars](https://handlebarsjs.com/) because it's tried and true. You might that I'm sounding like a hypocrite for not picking the most progressive lib a la Fastify, but the difference here is I'm _not_ experienced in templating. I am experienced Node.js servers, so it's better for me to pick the thing that's easier to learn and has the most support. Especially because I care more about building an HDA, I'm prioritizing learning HTMX over everything else. The secondary goal is building apps that have feature parity with my previous SPAs. Once I've pushed the limits here, I'll consider a newer templating engine. Or not. maybe I'll use Go and never look back.

## TSX - Our TS Script Runner

I don't feel like compiling my TS to JS, nor do I feel like using Deno or Bun (see above regarding limiting my surface area). [TSX](https://github.com/privatenumber/tsx) allows me to run my TS files as they are, which is fantastic!

## Setup

I referenced but didn't explain the various things that tripped me up when setting up this repo. Not going to explain them now, but hopefully if you follow this instructions, it will just work, like how people claim to me the benefit of being all in on the apple eco-system just works. Sarcasm aside follow the steps below exactly, and make sure you read all the instructions before entering any commands. It's a bad habit most of us share to just follow the steps without seeing the bigger picture.

1. Run `corepack enable` in your terminal. Yarn now installs itself as part of your Node.js binary, so if you don't do this first, you won't be able to use yarn. For more info go [here](https://yarnpkg.com/corepack).

2. Download [VSCode](https://code.visualstudio.com/download) and install extension [ZipFS](https://marketplace.visualstudio.com/items?itemName=arcanis.vscode-zipfs) extension. We need to do this to enable TS support for Yarn in VSCode. Absurd, but it is what it is. Don't skip this step! If you don't want to use VSCode, then go to the Yarn [docs](https://yarnpkg.com/getting-started/editor-sdks) and figure out on your own how to support your editor of choice.

3. Fork this repo and open in VSCode

4. Run `yarn start` in your terminal. It should just work. Why? You might be asking. We didn't even run `yarn install`. Apparently Yarn supports [Zero-installs](https://yarnpkg.com/features/caching) which allows you to version control your dependencies efficiently. Even if you switch branches where you have added deps, in most cases you still wouldn't need to run the install command, which is just fantastic. Totally worth caching your deps for improvements in developer experience, and later in continuous integration if you make it that far. Installing dependencies over and over is a pain, and if your app is efficient, the bundle size shouldn't be that big anyway. Thankfully, this tempalte is lean.

5. Navigate to `localhost:3000` and you should see a super basic page, with a button that changes it's inner text to some JSON that I've decided to serve. This doesn't make sense for a real application, but it proves that HTMX works, and that's good enough for me. Maybe in the future I'll serve something more realistic, but it's a template; what else you want for free?!

## Conclusion

Now that you're all templated up, feel free to make the HDA of your dreams. Build out your UI to do something fun. Update your controller routes to serve HTML partials in response to button clicks. The world is your oyster. But once youre done, compare the app to what it would have taken to do the same thing in React, and use this new found knowledge to inform future decisions and app implementations. Happy coding everyone!
