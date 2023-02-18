import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import axios, { AxiosResponse } from 'axios';
import cors from 'cors';
import { getData, getFavicon, isUrl } from './service';
import { whiteSpacesRegEx } from './constants';

dotenv.config();


const app: Express = express();
app.use(cors());
const port = process.env.PORT || 3000;


console.log(isUrl('www.google.com'));

app.get('/website', async (req: Request, res: Response) => {
    let url = req.query.url as string;
    let isRedirect = false;
    
    if (!isUrl(url)) {
        url = url.replace(whiteSpacesRegEx, '+');
        url = `https://duckduckgo.com/?q=!ducky+${url}`;
        isRedirect = true;
    } 
    
    const data = await getData(url, isRedirect);
    if (!data) {
        res.status(404).send('encountered problem getting website');
        return;
    }
    const favicon = await getFavicon(data.url);

    res.status(200).send({ ...data, favicon });
});

app.get('/auto-complete', async (req: Request, res: Response) => {
    const term = req.query.search as string;
    try {
        const { data: [res1, res2] } = await axios(`https://www.google.com/complete/search?q=${term}&client=chrome&hl=en`);
        const searchResult = [...res1, ...res2];
        res.send(searchResult);
    } catch (e) {
        console.log(e);
        res.status(404).send('encountered problem with auto complete');
    }
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});