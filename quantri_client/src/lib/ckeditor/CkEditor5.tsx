
import React, { Component, useRef, forwardRef, ComponentProps } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';

// NOTE: Use the editor from source (not a build)!
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { editorConfiguration } from './config';



export type MyCkEditorProps = Omit<ComponentProps<typeof CKEditor>, "editor">

export const MyCkEditor = forwardRef<ClassicEditor, MyCkEditorProps>((props, ref) => {
    const editorRef = useRef<ClassicEditor | null>(null);
    return (
        <div >
        <CKEditor
            editor={ ClassicEditor }
            config={ editorConfiguration }
            data={props.data}
            onReady={ editor => {
                // You can store the "editor" and use when it is needed.
                editorRef.current = editor;
                if (typeof ref === 'function') {
                    ref(editor);
                  } else if (ref) {
                    ref.current = editor;
                  }
            } }
            // onChange={ ( event, editor ) => {
            //     const data = editor.getData();
            //     console.log(data);
            // } }
            // onBlur={ ( event, editor ) => {
            //     console.log( 'Blur.', editor );
            // } }
            // onFocus={ ( event, editor ) => {
            //     console.log( 'Focus.', editor );
            // } }
        />
    </div>
    )
})