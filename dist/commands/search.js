import ora from 'ora';
import { getRegistry } from '../lib/registry.js';
import { formatServerTable, formatCategoryList, info } from '../utils/output.js';
export async function searchCommand(query, options) {
    const spinner = ora('Searching MCP servers...').start();
    try {
        const registry = getRegistry();
        const searchOptions = {
            query,
            category: options.category,
            verified: options.verified,
            limit: options.limit || 20,
            sort: options.sort || 'downloads',
        };
        const results = await registry.search(searchOptions);
        spinner.stop();
        if (options.json) {
            console.log(JSON.stringify(results, null, 2));
            return;
        }
        if (query) {
            info(`Found ${results.length} servers matching "${query}"`);
        }
        else if (options.category) {
            info(`Showing servers in category "${options.category}"`);
        }
        else {
            info(`Showing top ${results.length} MCP servers`);
        }
        console.log(formatServerTable(results));
        console.log(`  Run ${'\x1b[36m'}mcphub info <name>${'\x1b[0m'} for details`);
        console.log(`  Run ${'\x1b[36m'}mcphub install <name>${'\x1b[0m'} to install\n`);
    }
    catch (err) {
        spinner.fail('Search failed');
        throw err;
    }
}
export async function categoriesCommand(options) {
    const registry = getRegistry();
    const categories = await registry.getCategories();
    if (options.json) {
        console.log(JSON.stringify(categories, null, 2));
        return;
    }
    console.log(formatCategoryList());
    console.log(`  Run ${'\x1b[36m'}mcphub search --category <name>${'\x1b[0m'} to browse\n`);
}
//# sourceMappingURL=search.js.map