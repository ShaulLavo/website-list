import axios from 'axios';
import puppeteer from 'puppeteer';
import { UrlRegEx, whiteSpacesRegEx } from './constants';


export const getData = async (url: string, isRedirect: boolean) => {

    if (!url.includes('https://') && !url.includes('http://')) {
        url = 'http://' + url;
    }

    try {
        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        await page.goto(url);
        if (isRedirect) {
            await page.waitForNavigation();
            url = page.url();
        }
        const title = await page.title();
        await browser.close();

        return { title, url };
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const getFavicon = async (url: string) => {
    try {
        const res = await axios(`https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`);
        return res.request.res.responseUrl as string;
    } catch (error) {
        console.log(error)
        return null
    }

};

export const isUrl = (url: string) => {
    return UrlRegEx.test(url) && !whiteSpacesRegEx.test(url);
};

// export const urlify= (url :string)=> {
//     le
//     if (!isUrl(url)) {
//         url = url.replace(whiteSpacesRegEx, '+');
//         url = `https://duckduckgo.com/?q=!ducky+${url}`;
//         isRedirect = true;
//     } else if (!url.includes('https://') && !url.includes('http://')) {
//         url = 'http://' + url;
//     }
// }