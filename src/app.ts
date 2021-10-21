import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { logPageview } from './analytics';
import readRedirects from './readRedirects';

(async () => {
    const app = express();
    app.enable('trust proxy');

    const redirects = await readRedirects();

    app.get('*', async (req, res, next) => {
        const host = req.headers.host;
        if (!host || !(host in redirects)) return res.sendStatus(404);

        for (const redirect of redirects[host]) {
            if (!redirect.path.test(req.path)) continue;

            res.redirect(redirect.status || 302, redirect.url);
            await logPageview(req, redirect.trackingName);
            console.log(`Redirect: ${req.ip} - ${req.path} - ${redirect.url}`);
            return;
        }

        return res.sendStatus(404);
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Redirector listening on port ${port}`);
    });
})();