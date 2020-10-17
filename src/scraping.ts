import superagent from 'superagent'

const scraping = async (url: string): Promise<void> => {
  const result = await superagent.get(url)
  console.log(result.text)
}

export default scraping
