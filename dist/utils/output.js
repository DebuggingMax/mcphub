import chalk from 'chalk';
import { table } from 'table';
import { CATEGORIES } from '../types/index.js';
export function formatServerTable(servers) {
    if (servers.length === 0) {
        return chalk.yellow('No servers found.');
    }
    const data = [
        [
            chalk.bold('Name'),
            chalk.bold('Version'),
            chalk.bold('Description'),
            chalk.bold('⬇️'),
            chalk.bold('⭐'),
        ],
    ];
    for (const server of servers) {
        const verified = server.verified ? chalk.green('✓ ') : '';
        data.push([
            verified + chalk.cyan(server.name),
            chalk.gray(server.version),
            truncate(server.description, 40),
            formatNumber(server.downloads),
            formatNumber(server.stars),
        ]);
    }
    return table(data, {
        border: {
            topBody: '─',
            topJoin: '┬',
            topLeft: '┌',
            topRight: '┐',
            bottomBody: '─',
            bottomJoin: '┴',
            bottomLeft: '└',
            bottomRight: '┘',
            bodyLeft: '│',
            bodyRight: '│',
            bodyJoin: '│',
            joinBody: '─',
            joinLeft: '├',
            joinRight: '┤',
            joinJoin: '┼',
        },
        columns: {
            0: { width: 25 },
            1: { width: 10 },
            2: { width: 42 },
            3: { width: 8, alignment: 'right' },
            4: { width: 8, alignment: 'right' },
        },
    });
}
export function formatInstalledTable(servers) {
    const entries = Object.entries(servers);
    if (entries.length === 0) {
        return chalk.yellow('No servers installed. Run `mcphub search` to find servers.');
    }
    const data = [
        [
            chalk.bold('Name'),
            chalk.bold('Version'),
            chalk.bold('Status'),
            chalk.bold('Installed'),
        ],
    ];
    for (const [name, server] of entries) {
        const status = server.enabled
            ? chalk.green('● Enabled')
            : chalk.gray('○ Disabled');
        const date = new Date(server.installedAt).toLocaleDateString();
        data.push([
            chalk.cyan(name),
            chalk.gray(server.version),
            status,
            chalk.gray(date),
        ]);
    }
    return table(data, {
        border: {
            topBody: '─',
            topJoin: '┬',
            topLeft: '┌',
            topRight: '┐',
            bottomBody: '─',
            bottomJoin: '┴',
            bottomLeft: '└',
            bottomRight: '┘',
            bodyLeft: '│',
            bodyRight: '│',
            bodyJoin: '│',
            joinBody: '─',
            joinLeft: '├',
            joinRight: '┤',
            joinJoin: '┼',
        },
    });
}
export function formatServerDetails(server) {
    const lines = [
        '',
        `  ${server.verified ? chalk.green('✓') : chalk.gray('○')} ${chalk.bold.cyan(server.name)} ${chalk.gray('v' + server.version)}`,
        '',
        `  ${chalk.white(server.description)}`,
        '',
        `  ${chalk.gray('Author:')}      ${server.author}`,
        `  ${chalk.gray('Categories:')}  ${server.categories.map(c => getCategoryEmoji(c) + ' ' + c).join(', ')}`,
        `  ${chalk.gray('Downloads:')}   ${formatNumber(server.downloads)}`,
        `  ${chalk.gray('Stars:')}       ${formatNumber(server.stars)}`,
        `  ${chalk.gray('Repository:')} ${chalk.blue.underline(server.repository)}`,
        '',
    ];
    return lines.join('\n');
}
export function formatCategoryList() {
    const lines = [
        '',
        chalk.bold('  Available Categories'),
        '',
    ];
    for (const [key, cat] of Object.entries(CATEGORIES)) {
        lines.push(`  ${cat.emoji} ${chalk.cyan(key.padEnd(15))} ${chalk.gray(cat.description)}`);
    }
    lines.push('');
    return lines.join('\n');
}
export function formatStats(stats) {
    return [
        '',
        chalk.bold('  📊 MCP Hub Statistics'),
        '',
        `  ${chalk.cyan('Servers:')}   ${stats.totalServers}`,
        `  ${chalk.cyan('Downloads:')} ${formatNumber(stats.totalDownloads)}`,
        `  ${chalk.cyan('Categories:')} ${stats.categories}`,
        '',
    ].join('\n');
}
export function success(message) {
    console.log(chalk.green('✓'), message);
}
export function error(message) {
    console.error(chalk.red('✗'), message);
}
export function warn(message) {
    console.log(chalk.yellow('⚠'), message);
}
export function info(message) {
    console.log(chalk.blue('ℹ'), message);
}
// Helpers
function truncate(str, length) {
    if (str.length <= length)
        return str;
    return str.slice(0, length - 3) + '...';
}
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}
function getCategoryEmoji(category) {
    return CATEGORIES[category]?.emoji || '📦';
}
//# sourceMappingURL=output.js.map