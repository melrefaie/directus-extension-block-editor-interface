export default class SimpleLink {

  static get toolbox() {
    return {
      title: 'Link',
      icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.567 13.629c.728.464 1.581.65 2.41.558l-.873.873A3.722 3.722 0 1 1 4.84 9.794L6.694 7.94a3.722 3.722 0 0 1 5.256-.008L10.484 9.4a5.209 5.209 0 0 1-.017.016 1.625 1.625 0 0 0-2.29.009l-1.854 1.854a1.626 1.626 0 0 0 2.244 2.35zm2.766-7.358a3.722 3.722 0 0 0-2.41-.558l.873-.873a3.722 3.722 0 1 1 5.264 5.266l-1.854 1.854a3.722 3.722 0 0 1-5.256.008L9.416 10.5a5.2 5.2 0 0 1 .017-.016 1.625 1.625 0 0 0 2.29-.009l1.854-1.854a1.626 1.626 0 0 0-2.244-2.35z" transform="translate(-3.667 -2.7)"/></svg>'
    };
  }

  static get isReadOnlySupported() {
      return true;
  }

  /**
 * Allow to press Enter inside the LinkTool input
 *
 * @returns {boolean}
 * @public
 */
  static get enableLineBreaks() {
      return true;
  }

  constructor({ data, api, config, readOnly, block }) {
      this.api = api;
  
      /**
       * Tool's initial config
       */
      this.config = {
        endpoint: config.endpoint || '',
        headers: config.headers || {},
      };
  
      this.wrapper = undefined;
  
      this.data = {
        url: data.url || '',
        text: data.text || '',
      };
    }

  render(){
      this.wrapper = this.make('div', 'link-wrapper');

      if (this.data && this.data.url){
          this._showLinkPreview(this.data);
          return this.wrapper;
      }

      const container = this.make('div', 'link-container');

      const linkLabel = this.make('div', 'link-label');
      linkLabel.textContent = 'Link';

      const linkInput = document.createElement('div');

      linkInput.setAttribute('class', 'link-field');
      linkInput.setAttribute('contentEditable', true);

      const regexLink = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/igm;

      const textLabel = this.make('div', 'text-label');
      textLabel.textContent = 'Text';

      const textInput = document.createElement('div');

      textInput.setAttribute('class', 'text-field');
      textInput.setAttribute('contentEditable', true);

      const regexText = /^[a-zA-Z0-9-_. ]*$/gm;

      const addBtn = document.createElement('button');

      addBtn.setAttribute('type', 'button');
      addBtn.setAttribute('class', 'add-link');
      addBtn.textContent = 'Add Link';
      
      addBtn.addEventListener('click', (event) => {
          if (linkInput.textContent && regexLink.test(linkInput.textContent)) {
              const linkData = {
                  url: linkInput.textContent,
                  text: textInput.textContent && regexText.test(textInput.textContent.trim()) ? textInput.textContent.trim() : ''
              };
              this._showLinkPreview(linkData);
          }
      });

      this.wrapper.appendChild(addBtn);
      container.appendChild(linkLabel);
      container.appendChild(linkInput);
      container.appendChild(textLabel);
      container.appendChild(textInput);
      this.wrapper.appendChild(container);
  
      return this.wrapper;
  }

  /**
 * Compose link preview from fetched data
 *
 * @param {metaData} meta - link meta data
 */
  _showLinkPreview(linkData) {

      if (linkData && linkData.url) {
          const anchor = document.createElement('a');
          anchor.setAttribute('class', 'link-inserted');
          anchor.setAttribute('href', linkData.url);
          anchor.setAttribute('target', '_blank');
          anchor.textContent = linkData.text ? linkData.text : linkData.url;
          this.wrapper.innerHTML = '';
          this.wrapper.appendChild(anchor);
      }
  }

  /**
 * Return Block data
 *
 * @public
 *
 * @returns {LinkToolData}
 */
  save(blockContent) {
      const link = blockContent.querySelector('.link-inserted');

      return Object.assign(this.data, {
          url: link?.href || '',
          text: link?.textContent || ''
      });
  }

  /**
 * Helper method for elements creation
 *
 * @param tagName
 * @param classNames
 * @param attributes
 * @returns {HTMLElement}
 */
  make(tagName, classNames = null, attributes = {}) {
      const el = document.createElement(tagName);

      if (Array.isArray(classNames)) {
          el.classList.add(...classNames);
      } else if (classNames) {
          el.classList.add(classNames);
      }

      for (const attrName in attributes) {
          el[attrName] = attributes[attrName];
      }

      return el;
  }
}