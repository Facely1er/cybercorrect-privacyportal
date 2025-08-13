const fs = require('fs');
const path = require('path');

// Banned patterns that indicate brand leaks
const banned = [
  /EduSoluce/i,
  /EDUSOLUCE/i,
  /#0E7C86/i, // Old teal color
  /edusoluce/i
];

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !['node_modules', 'dist', '.git', '.bolt'].includes(file)) {
      walk(filePath);
    } else if (stat.isFile() && /\.(tsx?|jsx?|css|html|json)$/.test(file)) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      for (const pattern of banned) {
        if (pattern.test(content)) {
          console.error(`Brand leak detected in ${filePath}: Found pattern ${pattern}`);
          process.exit(2);
        }
      }
    }
  }
}

console.log('Running CyberCorrect brand check...');
walk(process.cwd());
console.log('✅ CyberCorrect brand check passed.');