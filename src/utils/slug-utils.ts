import { Video, News } from '../types';

export const generateSlug = (title: string, id: number, date: Date): string => {
    const formattedDate = date.toISOString().split('T')[0].replace(/-/g, '');
    const sanitizedTitle = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    return `${sanitizedTitle}-${formattedDate}${id}`;
};

interface ParsedSlug {
    title: string;
    date: Date;
    id: number;
}

export const parseSlug = (slug: string): ParsedSlug => {
    const matches = slug.match(/^(.+)-(\d{8})(\d+)$/);
    if (!matches) throw new Error('Invalid slug format');

    const [, title, dateStr, id] = matches;
    const date = new Date(
        `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`
    );

    return {
        title: title.replace(/-/g, ' '),
        date,
        id: parseInt(id, 10)
    };
}; 