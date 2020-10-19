import * as core from '@actions/core'
import scraping from './scraping'
import fetch from 'node-fetch'

async function run(): Promise<void> {
  let contents = new Array<string>()
  const extract = new Array<string | undefined>()
  try {
    contents = await scraping('https://atcoder.jp/contests/')
    for (let i = 0; i < contents.length; i += 2) {
      if (new Date().getDate() === new Date(contents[i]).getDate()) {
        extract.push(contents[i])
        extract.push(contents[i + 1])
      }
    }
    if (1 <= extract.length) {
      const message = {
        username: 'AtCoder',
        content: '今日開催のAtCoder',
        embeds: [{fields: [{name: `${extract[0]}`, value: `${extract[1]}`}]}]
      }
      fetch(core.getInput('WebhookUrl'), {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {'Content-Type': 'application/json'}
      })
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
