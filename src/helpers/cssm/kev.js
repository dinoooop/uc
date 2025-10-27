export class kev {

    static displayKey(key) {
        const formatted = key
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return formatted;
      }
}