import { IMovieRepository } from '../repositories/types';

export const parseMovieBlock = (block: string): IMovieRepository.Create.Params | null => {
    let title: string | null = null;
    let year: number | null = null;
    let format: string | null = null;
    let actors: string[] = [];

    const lines = block.split('\n');

    for (const line of lines) {
        const [key, ...valueParts] = line.split(':');
        if (!key || valueParts.length === 0) continue;

        const value = valueParts.join(':').trim();

        switch (key.trim().toLowerCase()) {
            case 'title':
                title = value;
                break;
            case 'release year':
                const parsedYear = parseInt(value, 10);
                if (!isNaN(parsedYear)) {
                    year = parsedYear;
                }
                break;
            case 'format':
                format = value;
                break;
            case 'stars':
                actors = value.split(',').map(actor => actor.trim());
                break;
        }
    }

    if (!title) throw new Error('Missing title');
    if (!year) throw new Error('Missing or invalid release year');
    if (!format) throw new Error('Missing format');
    if (actors.length === 0) throw new Error('Missing actors');

    return {
        title,
        year,
        format,
        actors
    };
}; 