import fs from 'fs/promises';
import path from 'path';

type Redirect = {
    path: RegExp;
    url: string;
    status?: number;
}

type RedirectDB = { [domain: string]: Redirect[] };

async function listRedirects(path: string) {
    const fileContent = await fs.readFile(path);
    const lines = fileContent.toString().split(/(?:\r\n|\r|\n)/g);

    const siteRedirects: Redirect[] = [];
    for (const line of lines) {
        if (line.length === 0) continue;
        const parts = line.split(',');
        if (parts.length < 2) throw new Error(`Invalid entry in ${path}: "${line}"`);

        const redirect: Redirect = {
            path: new RegExp(`^${parts[0]}$`),
            url: parts[1],
            status: parseInt(parts[2])
        };
        siteRedirects.push(redirect);
    }
    return siteRedirects;
}

export default async function readRedirects() {
    const redirectDir = path.join(__dirname, '..', 'redirects');
    const files = await fs.readdir(redirectDir);

    const redirectDB: RedirectDB = {};
    for (const file of files) {
        if (!file.endsWith('.csv')) continue;

        // Remove the file extension
        const domain = file.substr(0, file.length - 4);

        redirectDB[domain] = await listRedirects(path.join(redirectDir, file));
    }
    return redirectDB;
}