export interface SrcSettings {
        src: string,
        root: string,
        linkClass: string,
        contentClass: string,
        template: (keyword: string, expLevel: number | string, dictionary: object) => string,
        dictionary: {
            [key: string]: string
        }
}

export interface ParserSettings {
    [key: string]: SrcSettings
}

export interface ClientSettings {
    srcArr: string[],
    keywords: string[],
    exp: number
}

export interface Vacancy {
    id: string,
    link: string,
    title: string,
    body: string
}

export type VacancyArr = Vacancy[]
