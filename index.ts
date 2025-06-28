import { createBot } from 'mineflayer';
import { Command } from 'commander';

await new Command()
    .description('棒立ちするだけのMinecraft Botを起動する. Kickされるとプロセスが終了する')
    .showHelpAfterError()
    .argument('<host>', 'ホスト名またはIPアドレス')
    .argument('<port>', 'ポート番号')
    .argument('<username>', 'ユーザー名')
    .argument('<version>', 'Minecraftのバージョン')
    .action((host, port, username, version) => new Promise<void>((resolve,reject) => {
        const bot = createBot({ host, port, username, version, });
        bot.once('spawn', () => {
            console.log('Spawned!');
        });
        bot.once("error", (err) => {
            console.error('Error:', err);
            reject(err);
        })
        bot.once("kicked", () => resolve())
    })).parseAsync()
