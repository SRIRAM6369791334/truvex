import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'summernote/dist/summernote-lite.css';
import 'summernote/dist/summernote-lite.js';

interface SummernoteEditorProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  placeholder?: string;
}

export const SummernoteEditor: React.FC<SummernoteEditorProps> = ({ value, onChange, id, placeholder }) => {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const isInternalChange = useRef(false);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!editorRef.current) return;

    if (typeof window !== 'undefined') {
      (window as any).$ = $;
      (window as any).jQuery = $;
      if (!($ as any).now) {
        ($ as any).now = Date.now;
      }
    }

    const $editor = $(editorRef.current) as any;

    $editor.summernote({
      height: 300,
      dialogsInBody: true,
      placeholder: placeholder || '',
      toolbar: [
        ['style', ['style']],
        ['font', ['bold', 'underline', 'clear']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['table', ['table']],
        ['insert', ['link', 'picture', 'video']],
        ['view', ['fullscreen', 'codeview', 'help']]
      ],
      callbacks: {
        onChange: (contents: string) => {
          isInternalChange.current = true;
          onChangeRef.current(contents);
        }
      }
    });

    if (value) {
      $editor.summernote('code', value);
    }

    return () => {
      $editor.summernote('destroy');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isInternalChange.current && editorRef.current) {
      const $editor = $(editorRef.current) as any;
      if ($editor.summernote) {
        const currentCode = $editor.summernote('code');
        if (currentCode !== value) {
          $editor.summernote('code', value || '');
        }
      }
    }
    isInternalChange.current = false;
  }, [value]);

  return <textarea id={id} ref={editorRef} />;
};
