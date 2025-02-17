
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Heading } from '@ckeditor/ckeditor5-heading';
import {
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload
} from '@ckeditor/ckeditor5-image';
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { ImportWord } from '@ckeditor/ckeditor5-import-word';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { Font } from '@ckeditor/ckeditor5-font';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';
import { GeneralHtmlSupport } from '@ckeditor/ckeditor5-html-support';
import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed';
import sanitizeHtml from 'sanitize-html';

export const editorConfiguration = {
    plugins: [HtmlEmbed,GeneralHtmlSupport, Essentials, Heading, Bold, Code, Strikethrough, Subscript, Superscript, Underline, Italic, Paragraph, Link, List,
        Table, TableToolbar,
        Autoformat, Image, ImageCaption, ImageStyle, ImageToolbar, Base64UploadAdapter,
        ImageUpload, BlockQuote, Indent, IndentBlock, PasteFromOffice, MediaEmbed, TextTransformation, Alignment,
        ImportWord, CloudServices, Font, SourceEditing],
    toolbar: {
        items: [
            'undo',
            'redo',
            '|',
            'heading',
            'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
            '|',
            'bold', 'italic', 'underline', 'strikethrough', 'code', 'subscript', 'superscript', 'htmlEmbed',
            "|",
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            'alignment',
            '|',
            'imageUpload',
            'importWord',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            "sourceEditing",
        ],
        shouldNotGroupWhenFull: true
    },
    image: {
        toolbar: [
            'imageTextAlternative',
            'toggleImageCaption',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side'
        ]
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
        ]
    },
    indentBlock: {
        offset: 1,
        unit: 'em'
    },
    htmlSupport: {
        allow: [
            {
                name:"iframe",
            },
            {
                name: "div"
            }
        ]
    },
    htmlEmbed: {
        showPreviews: true,
        sanitizeHtml: ( inputHtml: string ) => {
            // Strip unsafe elements and attributes, for example:
            // the `<script>` elements and `on*` attributes.
            const outputHtml = sanitizeHtml( inputHtml );

            return {
                html: outputHtml,
                // true or false depending on whether the sanitizer stripped anything.
                hasChanged: true
            };
        }
    }
};