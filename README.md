# website-list

this website allows you to search for a website or paste a URL
it then fetches the title and favicon and adds it to a list 
saved in local storage

```
git clone https://github.com/ShaulLavo/website-list.git
cd website-list > npm i > npm run dev
cd server > npm i > npm run dev
```

backend: 
*\*all API's  used are open to the public and require no login*
- queries google auto complete for search results
- queries google bot for favicon
- searches duck duck go in case a string was provide instead of a URL
	(duck duck go API has a better redirect in there search API )
- uses puppeteer for redirecting via duck duck go and to grab websites title


it uses react + vite in the front 
and node + express in the back