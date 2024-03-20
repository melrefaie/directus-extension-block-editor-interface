import ChecklistTool from '@editorjs/checklist';
import CodeTool from '@editorjs/code';
import DelimiterTool from '@editorjs/delimiter';
import EmbedTool from '@editorjs/embed';
import HeaderTool from '@editorjs/header';
import InlineCodeTool from '@editorjs/inline-code';
import NestedListTool from '@editorjs/nested-list';
import ParagraphTool from '@editorjs/paragraph';
import QuoteTool from '@editorjs/quote';
import RawToolTool from '@editorjs/raw';
import TableTool from '@editorjs/table';
import UnderlineTool from '@editorjs/underline';
import { Alignment } from './alignment';
import {Section} from './custom_tools/section-tune';
import ToggleBlock from 'editorjs-toggle-block';
import { AttachesTool, ImageTool,GalleryTool } from './plugins';
import AudioPlayer from './custom_tools/audio-player.js';
import PageBreak from './custom_tools/page-break/index.js';
// import ColorPlugin from 'editorjs-text-color-plugin';


export type UploaderConfig = {
	addTokenToURL: (url: string, token: string) => string;
	baseURL: string | undefined;
	setFileHandler: (handler: any) => void;
	setCurrentPreview?: (url: string) => void;
	getUploadFieldElement: () => any;
};

export default function getTools(
	uploaderConfig: UploaderConfig,
	selection: Array<string>,
	haveFilesAccess: boolean,
): Record<string, object> {
	const tools: Record<string, any> = {};
	const fileRequiresTools = ['attaches', 'image'];

	const defaults: Record<string, any> = {
		header: {
			class: HeaderTool,
			inlineToolbar: true,
		},
		list: {
			class: NestedListTool,
			inlineToolbar: false,
		},
		nestedlist: {
			class: NestedListTool,
			inlineToolbar: true,
		},
		embed: {
			class: EmbedTool,
			inlineToolbar: true,
			tunes:['section']
		},
		paragraph: {
			class: ParagraphTool,
			inlineToolbar: true,
		},
		code: {
			class: CodeTool,
			tunes:['section']
		},
		underline: {
			class: UnderlineTool,
		},
		table: {
			class: TableTool,
			inlineToolbar: true,
			tunes:['section']
		},
		quote: {
			class: QuoteTool,
			inlineToolbar: true,
		},
		inlinecode: {
			class: InlineCodeTool,
			tunes:['section']
		},
		delimiter: {
			class: DelimiterTool,
			tunes:['section']
		},
		pagebreak: {
			class: PageBreak,
		},
		raw: {
			class: RawToolTool,
			tunes:['section']
		},
		checklist: {
			class: ChecklistTool,
			inlineToolbar: true,
		},
		image: {
			class: ImageTool,
			config: {
				uploader: uploaderConfig,
			},
			tunes:['section']
		},
		attaches: {
			class: AttachesTool,
			config: {
				uploader: uploaderConfig,
			},
			tunes:['section']
		},
		toggle: {
			class: ToggleBlock,
			inlineToolbar: true,
		},
		alignment: {
			class: Alignment,
			config:{
        default: "right",
			}
		},
		audio: {
			class: AudioPlayer,
			tunes:['section']
		},
		// color: {
		// 	class: ColorPlugin,
		// 	inlineToolbar:true,
		// 	config: {
		// 		colorCollections: ['#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
		// 		defaultColor: '#FF1300',
		// 		type: 'text', 
		// 		customPicker: true // add a button to allow selecting any colour  
		// 	}  , 
		// },
		// carousel: {
		// 	class: CarouselTool,
		// 	config: {
		// 		uploader: uploaderConfig,
		// 	},
		// },
		gallery: {
			class: GalleryTool,
			config: {
				uploader: uploaderConfig,
			},
			tunes:['section']
		},
		section: {
			class: Section,
		},
		
	};

	for (const toolName of selection) {
		if (!haveFilesAccess && fileRequiresTools.includes(toolName)) continue;

		if (toolName in defaults) {
			tools[toolName] = defaults[toolName];
		}
	}

	// Add alignment to all tools that support it if it's enabled.
	// editor.js tools means we need to already declare alignment in the tools object before we can assign it to other tools.
	if ('alignment' in tools) {
		if ('paragraph' in tools) {
			tools['paragraph'].tunes = ['alignment','section'];
		}

		if ('header' in tools) {
			tools['header'].tunes = ['alignment','section'];
		}

		if ('quote' in tools) {
			tools['quote'].tunes = ['alignment','section'];
		}

		if ('nestedlist' in tools) {
			tools['nestedlist'].tunes = ['alignment','section'];
		}

		if ('checklist' in tools) {
			tools['checklist'].tunes = ['alignment','section'];
		}
	}

	return tools;
}
