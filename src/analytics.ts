import { Request } from 'express';
import axios from 'axios';

export async function logPageview(req: Request) {
    const plausibleUrl = process.env.PLAUSIBLE_ENDPOINT;
    // Plausible URL is not defined, disable analytics
    if (typeof plausibleUrl === 'undefined') return;

    const data = {
        name: 'pageview',
        url: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
        domain: req.headers.host,
        referrer: req.get('Referer')
    }

    try {
        await axios.post(plausibleUrl, JSON.stringify(data), {
            headers: {
                'user-agent': req.get('user-agent') || '',
                'X-Forwarded-For': req.ip,
                'Content-Type': 'text/plain'
            }
        })
    } catch (e) {
        console.error(`An error occurred when connecting to Plausible: ${e}`);
    }
}