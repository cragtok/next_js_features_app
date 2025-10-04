import * as fs from 'fs';
import * as path from 'path';

const apiRoutesDir = path.join(process.cwd(), 'app', 'api');
const tempApiRoutesDir = path.join(process.cwd(), 'temp_api_routes');

const routesToExclude = [
    'invalidate-db',
    'seed-db',
];

// This script runs after the build, regardless of NODE_ENV, to move files back
console.log('Running postbuild script...');

for (const route of routesToExclude) {
    const sourcePath = path.join(tempApiRoutesDir, route);
    const destPath = path.join(apiRoutesDir, route);

    if (fs.existsSync(sourcePath)) {
        fs.renameSync(sourcePath, destPath);
        console.log(`Moved ${route} from temp_api_routes back to app/api`);
    } else {
        console.log(`${route} not found in temp_api_routes, skipping move back.`);
    }
}

// Clean up the temporary directory if it's empty
if (fs.existsSync(tempApiRoutesDir) && fs.readdirSync(tempApiRoutesDir).length === 0) {
    fs.rmdirSync(tempApiRoutesDir);
    console.log(`Removed empty temporary directory: ${tempApiRoutesDir}`);
}
