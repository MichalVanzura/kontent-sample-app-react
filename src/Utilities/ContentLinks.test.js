import { getAboutUsLink } from './ContentLinks'

jest.mock('./LanguageCodes', () => {
  return {
    englishCode: 'en-US',
    spanishCode: 'es-ES',
  }
})

test('test', () => {
  const enAboutUsLink = getAboutUsLink('en-US');
  const esAboutUsLink = getAboutUsLink('es-ES');

  expect(enAboutUsLink).toEqual('/about-us-2');
  expect(esAboutUsLink).toEqual('/acerca-de');
})
