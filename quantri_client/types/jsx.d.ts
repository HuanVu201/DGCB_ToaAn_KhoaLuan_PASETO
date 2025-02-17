import * as React from 'react'



declare global {
    namespace JSX {
      interface IntrinsicElements {
        "td-chatbot": React.DetailedHTMLProps<any, HTMLElement>;
      }
    }
  }