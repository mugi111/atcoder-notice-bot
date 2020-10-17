import * as core from '@actions/core'
import scraping from './scraping'

async function run(): Promise<void> {
  try {
    scraping('https://atcoder.jp/contests/')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
