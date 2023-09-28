const BASE_URL = "http://universities.hipolabs.com/search";

export default defineEventHandler(async (event) => {
  const { country = 'Canada', name } = getQuery(event);
  const url = name ? `${BASE_URL}?country=${country}&name=${name}` : `${BASE_URL}?country=${country}`;

  let startTime, endTime, status;

  const universities = await $fetch(url, {
    async onRequest() {
      startTime = new Date().getTime();
    },
    async onResponse({ response }) {
      status = response.status;
      endTime = new Date().getTime();

      response._data = response._data.map((university) => {
        return {
          name: university.name,
          state: university['state-province'],
          website: university.web_pages[0] // TODO: Pegar todas as web pages
        }
      })
    },
    async onResponseError({ response }) {
      status = response.status;
      endTime = new Date().getTime();
    },
    // key: 'universities', // TODO: Verificar se é necessário
  })

  return {universities, requestData: {code: status, executionTime: endTime && startTime ? endTime - startTime: undefined}}
});