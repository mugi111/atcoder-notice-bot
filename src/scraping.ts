import superagent from 'superagent'
import cheerio from 'cheerio'

const scraping = async (url: string): Promise<Array<string | undefined>> => {
  const result = await superagent.get(url)
  const contents = new Array<string | undefined>();
  const $ = cheerio.load(result.text)
  $('div#contest-table-upcoming').find('tr > td > a').each((i, e) => {
    e.children.forEach((e) => {
      if (e.type == 'text') {
        contents.push(e.data)
      } else {
        contents.push(e.children[0].data)
      }
    })
  })
  return contents
}

export default scraping
