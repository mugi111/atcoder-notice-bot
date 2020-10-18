import * as core from '@actions/core'
import scraping from './scraping'

async function run(): Promise<void> {
  let contents = new Array<string | undefined>();
  try {
    contents = await scraping('https://atcoder.jp/contests/')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
