import { prisma } from './prisma';

export async function getSettings() {
    try {
        const settings = await (prisma as any).setting.findMany();
        return settings.reduce((acc: Record<string, string>, curr: any) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, string>);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return {};
    }
}

export async function getSetting(key: string, defaultValue: string = ''): Promise<string> {
    try {
        const setting = await (prisma as any).setting.findUnique({
            where: { key }
        });
        return setting?.value || defaultValue;
    } catch (error) {
        return defaultValue;
    }
}
