/**
 * Linked Data Resource
 * Describes properties specified by JSON-LD Standard
 * https://json-ld.org/
 * https://en.wikipedia.org/wiki/JSON-LD
 */
export class LdResource {
  readonly '@context': string | null;
  readonly '@id': string | null;
  readonly '@type': string | null;

  constructor(obj?: any) {
    if (obj) {
      this['@context'] = obj['@context'] || null;
      this['@id'] = obj['@id'] || null;
      this['@type'] = obj['@type'] || null;
    }
  }
}
