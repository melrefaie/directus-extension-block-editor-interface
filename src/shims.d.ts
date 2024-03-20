declare module '*.vue' {
	import { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

declare module '@editorjs/image';
declare module '@editorjs/attaches';
declare module '@editorjs/paragraph';
declare module '@editorjs/quote';
declare module '@editorjs/checklist';
declare module '@editorjs/delimiter';
declare module '@editorjs/table';
declare module '@editorjs/code';
declare module '@editorjs/header';
declare module '@editorjs/underline';
declare module '@editorjs/embed';
declare module '@editorjs/raw';
declare module '@editorjs/inline-code';
declare module '@editorjs/nested-list';
declare module 'editorjs-text-alignment-blocktune';
declare module 'editorjs-toggle-block';
declare module 'editorjs-audio-player';
declare module 'editorjs-text-color-plugin';