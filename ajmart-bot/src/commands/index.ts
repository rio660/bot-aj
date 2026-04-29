import { pingCommand } from './utility/ping.command.js';
import { menuCommand } from './menu.command.js';
export const registry = [menuCommand, pingCommand];
export const getCommand = (name: string) => registry.find(c => [c.name, ...(c.aliases||[])].includes(name));
