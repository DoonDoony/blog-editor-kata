export default class MD {
  static Media(caption: string, url: string) {
    return `![${caption}](${url})`;
  }
}
