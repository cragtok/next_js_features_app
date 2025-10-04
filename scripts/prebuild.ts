import * as fs from 'fs';
import * as path from 'path';

const apiRoutesDir = path.join(process.cwd(), 'app', 'api');
const tempApiRoutesDir = path.join(process.cwd(), 'temp_api_routes');

const routesToExclude = [
    'invalidate-db',
    'seed-db',
];

if (process.env.NODE_ENV === 'production') {
    console.log('Running prebuild script for production environment...');

    if (!fs.existsSync(tempApiRoutesDir)) {
        fs.mkdirSync(tempApiRoutesDir);
    }

    for (const route of routesToExclude) {
        const sourcePath = path.join(apiRoutesDir, route);
        const destPath = path.join(tempApiRoutesDir, route);

        if (fs.existsSync(sourcePath)) {
            fs.renameSync(sourcePath, destPath);
            console.log(`Moved ${route} from app/api to temp_api_routes`);
        } else {
            console.log(`${route} not found in app/api, skipping move.`);
        }
    }
} else {
    console.log('Not a production environment, skipping prebuild script.');
}
