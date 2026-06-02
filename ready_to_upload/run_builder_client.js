const path = require('path');
const { execSync } = require('child_process');

const blogPath = path.join(__dirname, '..', 'fanfanqiang.net博客');

try {
    console.log('Running temp_update_client_guide.js...');
    execSync('node temp_update_client_guide.js', { cwd: blogPath, stdio: 'inherit' });
    
    console.log('Running build_client_guide_article.js...');
    execSync('node build_client_guide_article.js', { cwd: blogPath, stdio: 'inherit' });
    
    console.log('All done!');
} catch (e) {
    console.error('Error executing script:', e);
}
