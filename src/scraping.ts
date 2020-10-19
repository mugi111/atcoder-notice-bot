import superagent from 'superagent'
import cheerio from 'cheerio'

const scraping = async (url: string): Promise<string[]> => {
  const result = await superagent.get(url)
  const contents: string[] = []
  const $ = cheerio.load(result.text)
  $('div#contest-table-upcoming')
    .find('tr > td > a')
    .each((i, elem) => {
      elem.children.forEach(e => {
        if (e.type === 'text') {
          if (e.data !== undefined) {
            contents.push(e.data)
          }
        } else {
          if (e.children[0].data !== undefined) {
            contents.push(e.children[0].data)
          }
        }
      })
    })
  return contents
}

export default scraping
