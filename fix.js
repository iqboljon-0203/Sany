const fs = require('fs');
let p = fs.readFileSync('src/data/products.ts', 'utf8');
p = p.replace(/\/images\/products\/(sy|st)[^.']+\.jpg/g, '/images/products/excavator.png');
p = p.replace(/\/images\/products\/sdg[^.']+\.jpg/g, '/images/products/excavator.png');
p = p.replace(/\/images\/products\/ssr[^.']+\.jpg/g, '/images/products/excavator.png');
p = p.replace(/\/images\/products\/sr2[^.']+\.jpg/g, '/images/products/excavator.png');
p = p.replace(/\/images\/products\/scc8000a([^.']*)?\.jpg/g, '/images/products/crane.png');
p = p.replace(/\/images\/products\/stc250([^.']*)?\.jpg/g, '/images/products/crane.png');
p = p.replace(/\/images\/products\/srt95c([^.']*)?\.jpg/g, '/images/products/mining_truck.png');
fs.writeFileSync('src/data/products.ts', p);

let pr = fs.readFileSync('src/data/projects.ts', 'utf8');
pr = pr.replace(/\/images\/projects\/[^.']+\.jpg/g, '/images/projects/project_site.png');
pr = pr.replace(/\/images\/partners\/[^.']+\.svg/g, 'https://placehold.co/200x80/2A2A2A/FFFFFF?text=PARTNER');
fs.writeFileSync('src/data/projects.ts', pr);
console.log('Fixed');
