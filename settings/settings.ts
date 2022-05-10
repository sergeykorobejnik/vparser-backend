import {ParserSettings} from "../types/types";

const parserSettings: ParserSettings = {
    djinni: {
        src: 'djinni',
        root: `https://djinni.co`,
        linkClass: '.profile',
        contentClass: '.list-jobs__description p',
        template: (keyword, expLevel, dictionary): string => {
            keyword = keyword.replace(/ /g, '+')
            const localExp = dictionary[expLevel as keyof typeof dictionary]
            console.log(localExp)
            console.log(`https://djinni.co/jobs/?exp_level=${localExp}&keywords=${keyword}`)
            return `https://djinni.co/jobs/?exp_level=${localExp}&keywords=${keyword}`
        },
        dictionary: {
            0: 'no_exp',
            1: '1y',
            2: '2y'
        }
    },
    dou: {
        src: 'dou',
        root: ``,
        linkClass: '.vt',
        contentClass: '.sh-info',
        template: function (keyword, expLevel, dictionary)  {
            const localExp = dictionary[expLevel as keyof typeof dictionary]
            keyword = encodeURIComponent(keyword.replace(/ /g, '+'))
            return `https://jobs.dou.ua/vacancies/?category=Front+End&search=${keyword}&exp=${localExp}`
        },
        dictionary: {
            0: '0-1',
            1: '0-1',
            2: '1-3'
        }
    },
    workua: {
        src: 'workua',
        root: `https://www.work.ua`,
        linkClass: '.card h2 a',
        contentClass: '.card p',
        template: function (keywords, expLevel, dictionary)  {
            keywords = encodeURIComponent(keywords.replace(/ /g, '+'))
            return `https://www.work.ua/ru/jobs${keywords}/`
        },
        dictionary: {

        }
    }
}

export {parserSettings}