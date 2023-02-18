# Website-List

This website provides users with the ability to easily search for websites by entering a URL or keyword. \
The website fetches the title and favicon of the searched websites and adds them to a list, \
which is conveniently saved in local storage for future use.

## Disclaimer

This is a for-fun project that serves no practical purpose other than for the developer to experiment with Puppeteer and various APIs. \
Please do not expect any useful or meaningful results from using this website. \
## Installation

To clone and run this repository locally, please follow these steps:

```bash
git clone https://github.com/ShaulLavo/website-list.git
cd website-list
npm i
npm run dev
cd server
npm i
npm run dev
```

## Backend

The backend of this cutting-edge website is powered by Node.js and Express. It utilizes several advanced APIs, including:

- Google Autocomplete API to suggest possible search results
- Google Favicon API to retrieve the website's favicon
- DuckDuckGo Instant Answer API in the event that a keyword is entered instead of a URL. This API employs an advanced redirect feature in their search API to enhance search results.
- [Puppeteer](https://pptr.dev/) to redirect via DuckDuckGo and retrieve the website's title.

## Frontend

The frontend of this website is developed using [React](https://reactjs.org/), [Vite](https://vitejs.dev/) and [Material-UI](https://material-ui.com/). \
<sub>
    Please note that this project is licensed under the
    <a href='https://opensource.org/license/mit/'>MIT license</a>
    Feel free to use it or modify it to suit your needs.
</sub>

<sub>
    <p>
        README mostly Created by ChatGPT.
    </p>
</sub>
