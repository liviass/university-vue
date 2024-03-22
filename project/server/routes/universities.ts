import type { APIBody } from '../../types'

// TODO: Find better place for this
const _slugify = (term: string): string => {
  return term
    .toString()
    .toLowerCase()
    .replace(/[àÀáÁâÂãäÄÅåª]+/g, "a") // Special Characters #1
    .replace(/[èÈéÉêÊëË]+/g, "e") // Special Characters #2
    .replace(/[ìÌíÍîÎïÏ]+/g, "i") // Special Characters #3
    .replace(/[òÒóÓôÔõÕöÖº]+/g, "o") // Special Characters #4
    .replace(/[ùÙúÚûÛüÜ]+/g, "u") // Special Characters #5
    .replace(/[ýÝÿŸ]+/g, "y") // Special Characters #6
    .replace(/[ñÑ]+/g, "n") // Special Characters #7
    .replace(/[çÇ]+/g, "c") // Special Characters #8
    .replace(/[ß]+/g, "ss") // Special Characters #9
    .replace(/[Ææ]+/g, "ae") // Special Characters #10
    .replace(/[Øøœ]+/g, "oe") // Special Characters #11
    .replace(/[%]+/g, "pct") // Special Characters #12
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

const BASE_URL = 'http://universities.hipolabs.com/search';

export default eventHandler<{ body: APIBody, query: {country?: string, name: string}}>(async (event) => {
  const query = getQuery(event);

  let startTime: number;

  return $fetch(BASE_URL, {
    query,
    async onRequest() {
      startTime = new Date().getTime();
    },
    async onResponse({ response }) {
      response._data = {
        apiPerformance: {
          status: response.status,
          executionTime: startTime ? new Date().getTime() - startTime : null
        },
        // TODO: How to define the response type for external APIs?
        items: response._data.map((university: any, i: number) => {
          const key = university['state-province'] ? `${university.name}-${university['state-province']}` : university.name;
          return {
            key: _slugify(key + '-' + i), // Add index to make sure key is unique
            name: university.name,
            state: university['state-province'] || '',
            website: university.web_pages || []
          }
        })
      }
    },
    async onResponseError({ response }) {
      response._data = {
        ...response._data,
        apiPerformance: {
          status: response.status,
          executionTime: startTime ? new Date().getTime() - startTime : null
        },
      }
    },
  })
});