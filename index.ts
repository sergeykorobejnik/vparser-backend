import {ClientSettings, ParserSettings, SrcSettings, Vacancy, VacancyArr} from "./types/types";

const express = import("express")
const cors = import("cors")
import * as cheerio from "cheerio"
import {parserSettings} from "./settings/settings";
import axios from "axios";
import {v4 as uuidv4} from 'uuid';
const clientSettings: ClientSettings = {
    srcArr: ['djinni'],
    keywords: ['react junior', 'angular'],
    exp: 0
}


class VacancyParser {
    clientSettings: ClientSettings
    parserSettings: ParserSettings
    vacancyArr?: Array<Vacancy>
    constructor(ClientSettings: ClientSettings, parserSettings: ParserSettings) {
        this.clientSettings = clientSettings
        this.parserSettings = parserSettings
        this.vacancyArr
    }

    async loadCheerio (axiosUrl: string): Promise<any> {
        const res = await axios.get(axiosUrl)
        return cheerio.load(res.data)
    }

    async getLinks ($: Function, linkClass: string): Promise<string[]> {
        return $(linkClass).toArray()
    }

    async getContent ($: Function, contentClass: string): Promise<string[]> {
        return $(contentClass).toArray()
    }

    async getVacancies (settings: SrcSettings, keyword: string, exp: string | number): Promise<VacancyArr> {
        const {src, root, template, contentClass, dictionary, linkClass} = settings
        const $ = await this.loadCheerio(template(keyword, exp, dictionary))
        const linkArr = await this.getLinks($, linkClass)
        const contentArr = await this.getContent($, contentClass)
        if (linkArr.length !== contentArr.length) return

        return linkArr.map((element, index) => {
            return {
                id: uuidv4(),
                link: root + $(element).attr('href'),
                title: $(element).text(),
                body: $(contentArr[index]).text()
            }
        })

    }

    async getVacancyArr(): Promise<any> {
        const {srcArr, keywords, exp} = this.clientSettings
        let vacancyArr: VacancyArr = []
        for (const src of srcArr) {
            // console.log('*********************')
            // console.log('CURRENT SRC: ', src)
            // console.log('*********************')
            for (const keyword of keywords) {
                // console.log('*********************')
                // console.log('CURRENT KEYWORD: ', keyword)
                // console.log('*********************')
                // console.log(vacancyArr)
                vacancyArr.push(...await this.getVacancies(parserSettings[src], keyword, exp))
            }
        }
        return vacancyArr
    }
    
}

const parser = new VacancyParser(clientSettings, parserSettings)
parser.getVacancyArr()