import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import readRedirects from './readRedirects';

(async () => {
    const app = express();

    const redirects = await readRedirects();

    app.get('*', async (req, res, next) => {
        const host = req.headers.host;
        if (!host || !(host in redirects)) return res.sendStatus(404);

        const urls = redirects[host];
        if (!(req.path in urls)) return res.sendStatus(404);

        const redirect = urls[req.path];
        res.redirect(redirect.status || 302, redirect.url);
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Redirector listening on port ${port}`);
    });
})();