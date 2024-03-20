import { API, BlockAPI, BlockToolConstructorOptions, BlockToolData, BlockTune, ToolConfig } from '@editorjs/editorjs';

type SectionData = {
	section: 'large' | 'default' | 'small';
};

export class Section implements BlockTune {
	private api: API;
	private block: BlockAPI | undefined;
	private config: ToolConfig | undefined;
	private data: BlockToolData<SectionData>;
	private sectionOptions = [
		{
			name: 'large',
			css_class: 'ce-section-large',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M22 4H2v16h20zM4 6h1v12H4zm16 12h-1V6h1z"/></svg>`,
		},
		{
			name: 'default',
			css_class: 'ce-section-default',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M4 6h2v12H4zm16 12h-2V6h2z"/></svg>`,
		},
		{
			name: 'small',
			css_class: 'ce-section-small',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M4 6h4v12H4zm16 12h-4V6h4z"/></svg>`,
		},
	];

	private wrapper: HTMLElement | undefined;

	constructor({ api, data, config, block }: BlockToolConstructorOptions) {
		this.api = api;
		this.block = block;
		this.config = config;

		if (data === undefined) {
			data = {
				section: this.getSection(),
			};
		} else if (data.section === undefined) {
			data.section = this.getSection();
		}

		this.data = data;
	}

	static get isTune() {
		return true;
	}

	getSection() {
		if (this.config?.blocks && this.block!.name in this.config.blocks) {
			return this.config.blocks[this.block!.name];
		}

		if (this.config?.default) {
			return this.config.default;
		}

		return 'default';
	}

	wrap(blockContent: HTMLElement) {
		this.wrapper = document.createElement('div');

		this.wrapper.classList.add(
			this.sectionOptions.find((align) => align.name === this.data.section)?.css_class as string,
		);

		this.wrapper.append(blockContent);
		return this.wrapper;
	}

	render() {
		const wrapper = document.createElement('div');
		wrapper.classList.add('ce-align-buttons');

		const buttons = this.sectionOptions.map((align) => {
			const button = document.createElement('button');
			button.classList.add(this.api.styles.settingsButton);
			button.innerHTML = align.icon;
			button.type = 'button';

			button.classList.toggle(this.api.styles.settingsButtonActive, align.name === this.data.section);
			wrapper.appendChild(button);
			return button;
		});

		for (const [index, element] of buttons.entries()) {
			element.addEventListener('click', () => {
				this.data.section = this.sectionOptions[index]?.name as 'large' | 'default' | 'small';

				this.block?.dispatchChange();

				for (const button of buttons ?? []) {
					button.classList.toggle(this.api.styles.settingsButtonActive, button === element);
				}

				for (const { name, css_class } of this.sectionOptions) {
					this.wrapper?.classList.toggle(css_class, this.data.section === name);
				}
			});
		}

		return wrapper;
	}

	save() {
		return this.data;
	}
}
